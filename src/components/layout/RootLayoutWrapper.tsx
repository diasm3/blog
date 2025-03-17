import { getFolderStructure } from "@/lib/mdx"
import MainLayout from "./MainLayout"

export default async function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const folderStructure = await getFolderStructure()

  return <MainLayout folderStructure={folderStructure}>{children}</MainLayout>
}
