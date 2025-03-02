import type { Metadata } from 'next'
import StyledComponentsRegistry from '../lib/registry'
import { ThemeProviderWrapper } from '../components/ThemeProviderWrapper'

export const metadata: Metadata = {
  title: 'vimwiki 스타일 MDX 블로그',
  description: 'vimwiki 스타일 링크와 MDX를 결합한 개인 지식 관리 시스템',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
