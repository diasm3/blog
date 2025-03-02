import { getAllPosts } from "../../lib/mdx"
import BlogIndexPage from "../../components/BlogIndexPage"

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getAllPosts()

  return <BlogIndexPage posts={posts} />
}
