import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"
import type { Plugin } from "unified"
import rehypePrettyCode from "rehype-pretty-code"

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
export const getFolderStructure = async (
  dir = CONTENT_PATH,
  basePath = ""
): Promise<FolderItem[]> => {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  const processedItems = await Promise.all(
    items
      .filter((item) => !item.name.startsWith(".")) // 숨김 파일 제외
      .sort((a, b) => {
        // 폴더를 파일보다 먼저 정렬
        if (a.isDirectory() && !b.isDirectory()) return -1
        if (!a.isDirectory() && b.isDirectory()) return 1
        // 같은 타입끼리는 알파벳 순 정렬
        return a.name.localeCompare(b.name)
      })
      .map(async (item) => {
        const itemPath = path.join(dir, item.name)
        const relativePath = path.join(basePath, item.name)

        if (item.isDirectory()) {
          // 여기가 문제의 부분입니다. 정확한 경로를 유지하도록 수정
          return {
            id: relativePath,
            name: item.name,
            type: "folder" as const,
            path: `/${relativePath}`, // 이 path는 UI 표시용이므로 변경 없음
            children: await getFolderStructure(itemPath, relativePath), // 여기서 올바른 relativePath 전달
          }
        }

        // MDX 또는 MD 파일만 포함
        if (item.name.endsWith(".mdx") || item.name.endsWith(".md")) {
          const filePath = relativePath.replace(/\.(mdx|md)$/, "")

          // 위키 파일인지 블로그 파일인지 확인하여 적절한 경로 반환
          // 경로 처리 로직 개선
          let linkPath
          if (relativePath.startsWith("blog")) {
            // 블로그 파일의 경우
            const blogPath = relativePath.split(path.sep)
            // 'blog' 다음 부분부터 경로 구성 (카테고리 포함)
            const categoryPath = blogPath.slice(1, -1).join("/")
            const fileName = path.basename(filePath)
            linkPath = categoryPath
              ? `/blog/${categoryPath}/${fileName}`
              : `/blog/${fileName}`
          } else {
            // 위키 파일의 경우
            linkPath = `/wiki/${filePath.replace(/^wiki\//, "")}`
          }

          return {
            id: relativePath,
            name: item.name.replace(/\.(mdx|md)$/, ""),
            type: "file" as const,
            path: linkPath,
          }
        }
        return null
      })
  )
  return processedItems.filter(Boolean as any) as FolderItem[]
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

// 정렬 및 필터링 옵션 타입 정의
export type SortOption = "date" | "title" | "folder"
export type SortDirection = "asc" | "desc"

export interface PostFilterOptions {
  sortBy?: SortOption
  sortDirection?: SortDirection
  folder?: string
  tag?: string
  search?: string
}

// 모든 블로그 포스트 가져오기 (재귀적으로 모든 하위 폴더 포함)
export const getAllPosts = async (
  options?: PostFilterOptions
): Promise<MDXPage[]> => {
  if (!fs.existsSync(BLOG_PATH)) {
    return []
  }

  // 재귀적으로 모든 MDX/MD 파일 찾기
  const findAllMdxFiles = (
    dir: string,
    basePath = ""
  ): { filePath: string; slug: string; folder: string }[] => {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    let results: { filePath: string; slug: string; folder: string }[] = []

    items.forEach((item) => {
      const itemPath = path.join(dir, item.name)
      const relativePath = path.join(basePath, item.name)

      if (item.isDirectory()) {
        // 하위 폴더 재귀적으로 탐색
        results = results.concat(findAllMdxFiles(itemPath, relativePath))
      } else if (item.name.endsWith(".mdx") || item.name.endsWith(".md")) {
        // 파일 경로와 슬러그 정보 저장
        const fileName = item.name.replace(/\.(mdx|md)$/, "")
        const folder = basePath || "/" // 루트 폴더는 '/'로 표시

        // 슬러그 생성 (폴더 경로 포함)
        let slug
        if (basePath) {
          slug = `${basePath}/${fileName}`
        } else {
          slug = fileName
        }

        results.push({
          filePath: itemPath,
          slug,
          folder,
        })
      }
    })

    return results
  }

  // 모든 MDX 파일 찾기
  const mdxFiles = findAllMdxFiles(BLOG_PATH)

  // 모든 포스트 로드
  const posts = await Promise.all(
    mdxFiles.map(async ({ slug }) => {
      return await getPostBySlug(slug)
    })
  )

  // 필터링 적용
  let filteredPosts = [...posts]

  // 폴더별 필터링
  if (options?.folder) {
    filteredPosts = filteredPosts.filter((post) => {
      const postPath = post.slug.split("/")
      return postPath.length > 1 && postPath[0] === options.folder
    })
  }

  // 태그별 필터링
  if (options?.tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.frontMatter.tags?.includes(options.tag as string)
    )
  }

  // 검색어 필터링
  if (options?.search) {
    const searchLower = options.search.toLowerCase()
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.frontMatter.title.toLowerCase().includes(searchLower) ||
        post.frontMatter.excerpt?.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
    )
  }

  // 정렬 적용
  const sortBy = options?.sortBy || "date"
  const sortDirection = options?.sortDirection || "desc"

  filteredPosts.sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "date":
        const dateA = a.frontMatter.date
          ? new Date(a.frontMatter.date)
          : new Date(0)
        const dateB = b.frontMatter.date
          ? new Date(b.frontMatter.date)
          : new Date(0)
        comparison = dateB.getTime() - dateA.getTime()
        break

      case "title":
        comparison = a.frontMatter.title.localeCompare(b.frontMatter.title)
        break

      case "folder":
        const folderA = a.slug.split("/")[0] || ""
        const folderB = b.slug.split("/")[0] || ""
        comparison = folderA.localeCompare(folderB)
        break
    }

    // 정렬 방향 적용
    return sortDirection === "asc" ? comparison * -1 : comparison
  })

  return filteredPosts
}

// 모든 블로그 폴더 가져오기
export const getAllBlogFolders = async (): Promise<string[]> => {
  if (!fs.existsSync(BLOG_PATH)) {
    return []
  }

  const items = fs.readdirSync(BLOG_PATH, { withFileTypes: true })
  const folders = items
    .filter((item) => item.isDirectory())
    .map((item) => item.name)

  return folders
}

// 모든 블로그 태그 가져오기
export const getAllBlogTags = async (): Promise<string[]> => {
  const posts = await getAllPosts()
  const tagSet = new Set<string>()

  posts.forEach((post) => {
    post.frontMatter.tags?.forEach((tag) => {
      tagSet.add(tag)
    })
  })

  return Array.from(tagSet).sort()
}

// 슬러그로 특정 포스트 가져오기
export const getPostBySlug = async (
  slugPath: string | string[]
): Promise<MDXPage> => {
  // URL 디코딩 처리
  const decodedSlugPath = Array.isArray(slugPath)
    ? slugPath.map((segment) => decodeURIComponent(segment))
    : decodeURIComponent(slugPath)

  // 단일 문자열 또는 배열을 처리할 수 있도록 함
  const slugArray = Array.isArray(decodedSlugPath)
    ? decodedSlugPath
    : decodedSlugPath.split("/")

  // slugArray를 폴더 구조로 변환
  const folderPath = slugArray.slice(0, -1).join("/")
  const fileSlug = slugArray[slugArray.length - 1]

  // 검색할 기본 디렉토리
  const baseDir = folderPath ? path.join(BLOG_PATH, folderPath) : BLOG_PATH

  // MDX 또는 MD 파일 찾기
  let filePath
  if (fs.existsSync(path.join(baseDir, `${fileSlug}.mdx`))) {
    filePath = path.join(baseDir, `${fileSlug}.mdx`)
  } else if (fs.existsSync(path.join(baseDir, `${fileSlug}.md`))) {
    filePath = path.join(baseDir, `${fileSlug}.md`)
  } else {
    // 디버깅을 위한 정보 추가
    console.error({
      attemptedPath1: path.join(baseDir, `${fileSlug}.mdx`),
      attemptedPath2: path.join(baseDir, `${fileSlug}.md`),
      baseDir,
      fileSlug,
      folderPath,
      originalSlugPath: slugPath,
    })
    throw new Error(`Blog post with slug "${slugArray.join("/")}" not found`)
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  // 최종 slug 생성 (경로 전체를 포함)
  const fullSlug = slugArray.join("/")

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
        rehypeAutolinkHeadings,
        [
          rehypePrettyCode,
          {
            theme: "one-dark-pro",
            keepBackground: true,
            // 들여쓰기 및 포맷팅 설정
            tabWidth: 2,
            indentWidth: 2,
            defaultLang: "plaintext",
            // 코드 블록 내부에 줄 번호 표시
            onVisitLine(node: any) {
              // 줄 번호를 표시하기 위한 데이터 속성 추가
              if (node.children.length > 0) {
                node.properties.className = ["line"]
              }
            },
            // 코드 블록 내부에 강조 표시
            onVisitHighlightedLine(node: any) {
              // 강조 표시된 줄에 클래스 추가
              node.properties.className = ["line", "highlighted"]
            },
            // 코드 블록 내부에 강조 표시된 단어
            onVisitHighlightedWord(node: any) {
              // 강조 표시된 단어에 클래스 추가
              node.properties.className = ["word", "highlighted"]
            },
            // 코드 블록 스타일링 개선
            filterMetaString: (meta: string) => meta,
            // 줄 번호 표시 설정
            showLineNumbers: true,
          },
        ],
      ],
    },
    scope: data,
  })

  return {
    slug: fullSlug,
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
        [
          rehypePrettyCode,
          {
            theme: "one-dark-pro",
            keepBackground: true,
            // 코드 블록 내부에 줄 번호 표시
            onVisitLine(node: any) {
              // 줄 번호를 표시하기 위한 데이터 속성 추가
              if (node.children.length > 0) {
                node.properties.className = ["line"]
              }
            },
            // 코드 블록 내부에 강조 표시
            onVisitHighlightedLine(node: any) {
              // 강조 표시된 줄에 클래스 추가
              node.properties.className = ["line", "highlighted"]
            },
            // 코드 블록 내부에 강조 표시된 단어
            onVisitHighlightedWord(node: any) {
              // 강조 표시된 단어에 클래스 추가
              node.properties.className = ["word", "highlighted"]
            },
          },
        ],
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
    visit(tree, "text", (node: any) => {
      if (typeof node.value === "string") {
        node.value = node.value.replace(
          /\[\[([^\]]+)\]\]/g,
          (match: string, p1: string) => {
            const slug = p1.toLowerCase().replace(/\s+/g, "-") // URL-friendly 변환
            return `<Link href="/wiki/${slug}">${p1}</Link>`
          }
        )
      }
    })
  }
}
