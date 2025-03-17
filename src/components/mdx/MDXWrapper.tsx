"use client"

import { MDXRemote } from "next-mdx-remote"
import Link from "next/link"
import { getClientMDXComponents } from "./ClientMDXComponents"

import { MDXRemoteSerializeResult } from "next-mdx-remote"

export default function MDXWrapper({
  source,
}: {
  source: MDXRemoteSerializeResult
}) {
  const components = getClientMDXComponents({ Link })
  return <MDXRemote {...source} components={components} />
}
