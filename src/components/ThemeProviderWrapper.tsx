"use client"

import React from "react"
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, GlobalStyle } from "../styles/theme"
import { useDarkMode } from "../hooks/useDarkMode"

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { isDarkMode, mounted } = useDarkMode()

  // 클라이언트 사이드 하이드레이션을 위한 기본 렌더링 처리
  // if (!mounted) {
  //   return <div style={{ visibility: 'hidden' }}>{children}</div>
  // }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle $isDarkMode={isDarkMode} />
      {children}
    </ThemeProvider>
  )
}
