import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"
import type { Plugin } from "unified"

const CONTENT_PATH = path.join(process.cwd(), "content")
const BLOG_PATH = path.join(CONTENT_PATH, "blog")
const WIKI_PATH = path.join(CONTENT_PATH, "wiki")

interface FrontMatter {
  title: string
  date?: string
  tags?: string[]
  excerpt?: string
  author?: string
  [key: string]: any
}

interface TOCItem {
  id: string
  text: string
  level: number
}

interface FolderItem {
  id: string
  name: string
  type: "folder" | "file"
  path: string
  children?: FolderItem[]
}

interface MDXPage {
  slug: string
  frontMatter: FrontMatter
  content: string
  source: any
  toc: TOCItem[]
  backlinks?: Array<{
    slug: string
    title: string
  }>
}

// 모든 폴더 및 파일 경로를 포함한 폴더 구조 가져오기
export const getFolderStructure = (
  dir = CONTENT_PATH,
  basePath = ""
): FolderItem[] => {
  const items = fs.readdirSync(dir, { withFileTypes: true })

  return items
    .filter((item) => !item.name.startsWith(".")) // 숨김 파일 제외
    .sort((a, b) => {
      // 폴더를 파일보다 먼저 정렬
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      // 같은 타입끼리는 알파벳 순 정렬
      return a.name.localeCompare(b.name)
    })
    .map((item) => {
      const itemPath = path.join(dir, item.name)
      const relativePath = path.join(basePath, item.name)

      if (item.isDirectory()) {
        return {
          id: relativePath,
          name: item.name,
          type: "folder" as const,
          path: `/${relativePath}`,
          children: getFolderStructure(itemPath, relativePath),
        }
      }

      // MDX 또는 MD 파일만 포함
      if (item.name.endsWith(".mdx") || item.name.endsWith(".md")) {
        const filePath = relativePath.replace(/\.(mdx|md)$/, "")
        // 위키 파일인지 블로그 파일인지 확인하여 적절한 경로 반환
        const linkPath = relativePath.startsWith("blog")
          ? `/blog/${path.basename(filePath)}`
          : `/wiki/${filePath.replace(/^wiki\//, "")}`

        return {
          id: relativePath,
          name: item.name.replace(/\.(mdx|md)$/, ""),
          type: "file" as const,
          path: linkPath,
        }
      }

      return null
    })
    .filter(Boolean as any) as FolderItem[]
}

// Markdown 콘텐츠에서 헤딩 추출하여 TOC 생성
export const extractTOC = (content: string): TOCItem[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: TOCItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()

    // 헤딩 텍스트에서 ID 생성
    const id = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9가-힣\s]/g, "")
      .replace(/\s+/g, "-")

    toc.push({ id, text, level })
  }

  return toc
}

// 모든 블로그 포스트 가져오기
export const getAllPosts = async (): Promise<MDXPage[]> => {
  if (!fs.existsSync(BLOG_PATH)) {
    return []
  }

  const files = fs.readdirSync(BLOG_PATH)

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.(mdx|md)$/, "")
        return await getPostBySlug(slug)
      })
  )

  // 날짜 기준 내림차순 정렬
  return posts.sort((a, b) => {
    const dateA = a.frontMatter.date
      ? new Date(a.frontMatter.date)
      : new Date(0)
    const dateB = b.frontMatter.date
      ? new Date(b.frontMatter.date)
      : new Date(0)
    return dateB.getTime() - dateA.getTime()
  })
}

// 슬러그로 특정 포스트 가져오기
export const getPostBySlug = async (slug: string): Promise<MDXPage> => {
  // MDX 또는 MD 파일 찾기
  let filePath
  if (fs.existsSync(path.join(BLOG_PATH, `${slug}.mdx`))) {
    filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  } else if (fs.existsSync(path.join(BLOG_PATH, `${slug}.md`))) {
    filePath = path.join(BLOG_PATH, `${slug}.md`)
  } else {
    throw new Error(`Blog post with slug "${slug}" not found`)
  }

  const fileContent = fs.readFileSync(filePath, "utf8")

  const { data, content } = matter(fileContent)

  // TOC 추출
  const toc = extractTOC(content)

  // 모든 위키 페이지 슬러그 가져오기 (위키 링크 처리에 사용)
  const wikiSlugs = await getAllWikiSlugs()

  // MDX 처리
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        // [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeAutolinkHeadings,
      ],
    },
    scope: data,
  })

  return {
    slug,
    frontMatter: data as FrontMatter,
    content,
    source: mdxSource,
    toc,
  }
}

// 모든 위키 페이지 슬러그 가져오기
export const getAllWikiSlugs = async (): Promise<string[]> => {
  if (!fs.existsSync(WIKI_PATH)) {
    return []
  }

  const getAllFiles = (dir: string, slugs: string[] = []): string[] => {
    const items = fs.readdirSync(dir, { withFileTypes: true })

    items.forEach((item) => {
      const fullPath = path.join(dir, item.name)

      if (item.isDirectory()) {
        getAllFiles(fullPath, slugs)
      } else if (item.name.endsWith(".mdx") || item.name.endsWith(".md")) {
        // 상대 경로 계산
        const relativePath = path.relative(WIKI_PATH, fullPath)
        // 확장자 제거 및 슬러그 변환
        const slug = relativePath.replace(/\.(mdx|md)$/, "").replace(/\\/g, "/")
        slugs.push(slug)
      }
    })

    return slugs
  }

  return getAllFiles(WIKI_PATH)
}

// 특정 위키 페이지 가져오기
export const getWikiPage = async (slug: string): Promise<MDXPage> => {
  // 슬러그를 파일 경로로 변환
  let filePath
  const possiblePaths = [
    path.join(WIKI_PATH, `${slug}.mdx`),
    path.join(WIKI_PATH, `${slug}.md`),
    path.join(WIKI_PATH, slug, "index.mdx"),
    path.join(WIKI_PATH, slug, "index.md"),
  ]

  // 존재하는 파일 경로 찾기
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p
      break
    }
  }

  if (!filePath) {
    throw new Error(`Wiki page with slug "${slug}" not found`)
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  // TOC 추출
  const toc = extractTOC(content)

  // 모든 위키 페이지 슬러그 가져오기 (위키 링크 처리에 사용)
  const wikiSlugs = await getAllWikiSlugs()

  // MDX 처리
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkVimwikiLinks],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
    scope: data,
  })

  // 역링크 찾기 (이 페이지를 링크하는 다른 위키 페이지들)
  // const backlinks = await findBacklinks(slug);

  return {
    slug,
    frontMatter: data as FrontMatter,
    content,
    source: mdxSource,
    toc,
    // backlinks
  }
}

export const remarkVimwikiLinks: Plugin = () => {
  return (tree) => {
    visit(tree, "text", (node) => {
      if (typeof node.value === "string") {
        node.value = node.value.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
          const slug = p1.toLowerCase().replace(/\s+/g, "-") // URL-friendly 변환
          return `<Link href="/wiki/${slug}">${p1}</Link>`
        })
      }
    })
  }
}

// 특정 위키 페이지의 역링크(해당 페이지를 참조하는 다른 페이지들) 찾기
// async const findBacklinks = async (slug: string): Promise<Array<{ slug: string; title: string; }>> => {
//   // 모든 위키 페이지 슬러그 가져오기
//   const allSlugs = await getAllWikiSlugs();
//   const backlinks = [];

//   // 간단한 링크 패턴 - 실제 구현에서는 더 정교한 방법 필요
//   const linkPattern = new RegExp(`\\[\\[([^|\\]]+)(\\|[^\\]]+)?\\]\\]`, 'g');

//   // 각 페이지마다 slug를 링크하는지 확인
//   for (const pageSlug of allSlugs) {
//     if (pageSlug === slug) continue; // 자기 자신은 제외

//     try {
//       const filePath = getWikiFilePath(pageSlug);
//       const content = fs.readFileSync(filePath, 'utf8');
//       const { data } = matter(content);

//       let match;
//       let found = false;

//       // 페이지 내용에서 링크 찾기
//       while ((match = linkPattern.exec(content)) !== null) {
//         const linkTarget = match[1].trim();
//         const normalizedLinkTarget = linkTarget.toLowerCase().replace(/\s+/g, '-');

//         // 링크 대상이 현재 slug인지 확인
//         if (normalizedLinkTarget === slug || normalizedLinkTarget === slug.split('/').pop()) {===== vimwiki 스타일 MDX 블로그 설정 스크립트 (App Router) =====${NC}"
