import { getAllPosts, getAllBlogFolders, getAllBlogTags } from "../../lib/mdx"
import BlogIndexPage from "../../components/BlogIndexPage"

// export const revalidate = 60

export default async function BlogPage() {
  // 기본 정렬: 최신순
  const posts = await getAllPosts()
  const folders = await getAllBlogFolders()
  const tags = await getAllBlogTags()

  return <BlogIndexPage posts={posts} folders={folders} tags={tags} />
}
