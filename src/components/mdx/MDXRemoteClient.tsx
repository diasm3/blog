"use client"

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import Link from "next/link"
import StyledMDXContent from "./StyledMDXContent"
import { getClientMDXComponents } from "./ClientMDXComponents"

interface MDXRemoteClientProps {
  source: MDXRemoteSerializeResult
}

export default function MDXRemoteClient({ source }: MDXRemoteClientProps) {
  // 클라이언트 MDX 컴포넌트 가져오기
  const clientComponents = getClientMDXComponents({ Link })

  return (
    <StyledMDXContent>
      <MDXRemote {...source} components={clientComponents} />
    </StyledMDXContent>
  )
}
