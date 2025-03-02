"use client"

import React from "react"

interface MDXClientWrapperProps {
  children: React.ReactNode
}

export default function MDXClientWrapper({ children }: MDXClientWrapperProps) {
  return <>{children}</>
}
