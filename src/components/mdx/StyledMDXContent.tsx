"use client"

import { ReactNode } from "react"
import { useTheme } from "styled-components"
import styled from "styled-components"

// 스타일이 적용된 MDX 컨테이너
const MDXContainer = styled.div`
  /* 기본 스타일 */
  max-width: 100%;

  /* 헤딩 스타일 */
  h1 {
    position: relative;
    scroll-margin-top: 5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  }

  h2 {
    position: relative;
    scroll-margin-top: 5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }

  h3 {
    position: relative;
    scroll-margin-top: 5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }

  h4,
  h5,
  h6 {
    position: relative;
    scroll-margin-top: 5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  /* 앵커 링크 스타일 */
  h1:hover::before,
  h2:hover::before,
  h3:hover::before,
  h4:hover::before,
  h5:hover::before,
  h6:hover::before {
    content: "#";
    position: absolute;
    left: -1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.5;
  }

  /* 링크 스타일 */
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    border-bottom: 1px dotted ${({ theme }) => theme.colors.primary.light};
    transition: background-color ${({ theme }) => theme.transitions.default};
    text-decoration: none;
  }

  a:hover {
    background-color: ${({ theme }) => theme.colors.primary.light}20;
  }

  /* 코드 블록 스타일 */
  pre {
    position: relative;
    padding: ${({ theme }) => theme.spacing(4)};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    overflow-x: auto;
    background-color: ${({ theme }) => theme.colors.background.paper};
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    margin: 1.5rem 0;
  }

  pre code {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  /* 인라인 코드 스타일 */
  code {
    background-color: rgba(229, 231, 235, 0.5);
    padding: 0.125rem 0.375rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: 0.875em;
  }

  /* 문단 스타일 */
  p {
    margin: 1rem 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* 리스트 스타일 */
  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 1rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  li {
    margin: 0.25rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* 인용문 스타일 */
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary.light};
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  /* 테이블 스타일 */
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    margin: 1.5rem 0;
    overflow-x: auto;
    display: block;
  }

  th {
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.colors.background.light};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.divider};
  }

  td {
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* 이미지 스타일 */
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    margin: 1.5rem 0;
  }
`

interface StyledMDXContentProps {
  children: ReactNode
}

export default function StyledMDXContent({ children }: StyledMDXContentProps) {
  // 이 컴포넌트는 클라이언트 컴포넌트이므로 안전하게 useTheme 훅을 사용할 수 있습니다
  useTheme() // 테마 컨텍스트 활성화

  // MDX 콘텐츠에 스타일 적용
  return <MDXContainer>{children}</MDXContainer>
}
