import { notFound } from "next/navigation"

import Link from "next/link"
import { getPostBySlug } from "@/lib/mdx"
import MDXRemoteClient from "@/components/mdx/MDXRemoteClient"
import BlogPostLayout from "@/components/layout/BlogPostLayout"

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
  const { frontMatter, source, content } = await getPostBySlug(slug)

  return (
    <BlogPostLayout
      title={frontMatter.title}
      date={frontMatter.date || "Unknown date"}
      content={content}
    >
      <MDXRemoteClient source={source} />
      <div className="mt-8">
        <Link href="/blog">← 블로그 목록으로</Link>
      </div>
    </BlogPostLayout>
  )
}
