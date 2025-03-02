import { notFound } from "next/navigation"

import Link from "next/link"
import { getPostBySlug } from "@/lib/mdx"
import { PreviewPanel } from "../../../components/PreviewPanel"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  if (!(await params)) {
    console.error(`[Error] No slug provided in await (params`)
    return notFound()
  }

  const slug = (await params).slug
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`)
  const { content, frontMatter } = await getPostBySlug(slug)

  return (
    <article className="prose mx-auto">
      <h1>{frontMatter.title}</h1>
      <p className="text-gray-500">{frontMatter.date}</p>

      {/* ✅ MDXRemote에서 올바른 `source` 전달 */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PreviewPanel
        isVisible={false}
        isPinned={false}
        onTogglePin={function (): void {
          throw new Error("Function not implemented.")
        }}
        // blockChildren={[]}
      />
      {/* <Post /> */}

      {/* <MDXRemote {...post.source} components={{ Link }} /> */}

      <Link href="/blog">← 블로그 목록으로</Link>
    </article>
  )
}
