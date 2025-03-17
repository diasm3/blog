import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote"

export default async function SimpleBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  if (!(await params)) {
    console.error(`[Error] No slug provided in await (params`)
    return notFound()
  }

  const slug = (await params).slug
  const { frontMatter, source } = await getPostBySlug(slug)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-800 text-white rounded-lg shadow-lg my-8">
      <h1 className="text-3xl font-bold mb-2">{frontMatter.title}</h1>
      <p className="text-gray-400 mb-8">{frontMatter.date || "Unknown date"}</p>

      <div className="prose prose-invert max-w-none">
        <MDXRemote {...source} />
      </div>

      <div className="mt-8">
        <Link href="/blog" className="text-blue-400 hover:underline">
          ← 블로그 목록으로
        </Link>
      </div>
    </div>
  )
}
