"use client"

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import Link from "next/link"
import StyledMDXContent from "./StyledMDXContent"

interface MDXRemoteClientProps {
  source: MDXRemoteSerializeResult
}

export default function MDXRemoteClient({ source }: MDXRemoteClientProps) {
  return (
    <StyledMDXContent>
      <MDXRemote {...source} components={{ Link }} />
    </StyledMDXContent>
  )
}
