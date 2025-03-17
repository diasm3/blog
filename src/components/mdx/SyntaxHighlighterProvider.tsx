"use client"

import { ReactNode, useEffect } from "react"
import { registerLanguages } from "@/lib/converter/syntaxHighlighter"

interface SyntaxHighlighterProviderProps {
  children: ReactNode
}

export default function SyntaxHighlighterProvider({
  children,
}: SyntaxHighlighterProviderProps) {
  // Register languages on client-side only
  useEffect(() => {
    registerLanguages()
  }, [])

  return <>{children}</>
}
