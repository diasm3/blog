import { NextResponse } from "next/server"
import { getFolderStructure } from "@/lib/mdx"

export async function GET() {
  try {
    const folderStructure = await getFolderStructure()
    return NextResponse.json(folderStructure)
  } catch (error) {
    console.error("Error fetching folder structure:", error)
    return NextResponse.json(
      { error: "Failed to fetch folder structure" },
      { status: 500 }
    )
  }
}
