import { getAllPosts, getFolderStructure } from "../../lib/mdx"
import BlogIndexPage from "../../components/BlogIndexPage"

// export const revalidate = 60

export default async function BlogPage() {
  const posts = await getAllPosts()
  const folderStructure = await getFolderStructure()

  return <BlogIndexPage posts={posts} folderStructure={folderStructure} />
}
