"use client"

import { ReactNode } from "react"
import styled from "styled-components"

// 스타일이 적용된 MDX 컨테이너
const MDXContainer = styled.div`
  /* 기본 스타일 */
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;

  /* 헤딩 스타일 */
  h1 {
    position: relative;
    scroll-margin-top: 5rem;
    font-weight: 700; /* bold */
    color: var(--color-text-primary);
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 2.25rem; /* 4xl */
  }

  h2 {
    position: relative;
    scroll-margin-top: 5rem;
    font-weight: 700; /* bold */
    color: var(--color-text-primary);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.875rem; /* 3xl */
  }

  h3 {
    position: relative;
    scroll-margin-top: 5rem;
    font-weight: 700; /* bold */
    color: var(--color-text-primary);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.5rem; /* 2xl */
  }

  h4,
  h5,
  h6 {
    position: relative;
    scroll-margin-top: 5rem;
    font-weight: 700; /* bold */
    color: var(--color-text-primary);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.25rem; /* xl */
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
    color: var(--color-text-secondary);
    opacity: 0.5;
  }

  /* 링크 스타일 */
  a {
    color: var(--color-primary-main);
    border-bottom: 1px dotted var(--color-primary-light);
    transition: background-color 0.2s ease-in-out;
    text-decoration: none;
  }

  a:hover {
    background-color: rgba(var(--color-primary-main-rgb), 0.1);
  }

  /* 코드 블록 스타일 */
  pre {
    position: relative;
    padding: 1rem;
    border-radius: var(--border-radius-medium);
    overflow-x: auto;
    background-color: var(--color-background-paper);
    color: var(--color-text-primary);
    font-family: var(--font-family-mono);
    margin: 1.5rem 0;
  }

  pre code {
    font-size: 0.875rem; /* sm */
  }

  /* 인라인 코드 스타일 */
  code {
    background-color: var(--color-background-light);
    padding: 0.125rem 0.375rem;
    border-radius: var(--border-radius-small);
    font-family: var(--font-family-mono);
    font-size: 0.875em;
  }

  /* 문단 스타일 */
  p {
    margin: 1rem 0;
    line-height: 1.625; /* relaxed */
    color: var(--color-text-primary);
  }

  /* 리스트 스타일 */
  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1rem 0;
    color: var(--color-text-primary);
  }

  ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 1rem 0;
    color: var(--color-text-primary);
  }

  li {
    margin: 0.25rem 0;
    color: var(--color-text-primary);
  }

  /* 인용문 스타일 */
  blockquote {
    border-left: 4px solid var(--color-primary-light);
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
    color: var(--color-text-secondary);
  }

  /* 테이블 스타일 */
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--color-divider);
    margin: 1.5rem 0;
  }

  /* 테이블 헤더 스타일 */
  thead {
    background-color: var(--color-background-light);
  }

  /* 테이블 행 스타일 */
  tr {
    border-bottom: 1px solid var(--color-divider);
  }

  tr:nth-child(even) {
    background-color: var(--color-background-subtle);
  }

  tr:hover {
    background-color: var(--color-background-hover);
  }

  /* 테이블 헤더 셀 스타일 */
  th {
    padding: 0.75rem 1rem;
    background-color: var(--color-background-light);
    font-weight: 600; /* semibold */
    color: var(--color-text-primary);
    border: 1px solid var(--color-divider);
    text-align: left;
  }

  /* 테이블 데이터 셀 스타일 */
  td {
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-divider);
    color: var(--color-text-primary);
  }

  /* 테이블 반응형 래퍼 */
  .table-wrapper {
    overflow-x: auto;
    max-width: 100%;
  }

  /* 이미지 스타일 */
  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius-medium);
    margin: 1.5rem 0;
  }
`

interface StyledMDXContentProps {
  children: ReactNode
}

export default function StyledMDXContent({ children }: StyledMDXContentProps) {
  // 이 컴포넌트는 클라이언트 컴포넌트이므로 안전하게 useTheme 훅을 사용할 수 있습니다
  // useTheme() // 테마 컨텍스트 활성화

  // MDX 콘텐츠에 스타일 적용
  return <MDXContainer>{children}</MDXContainer>
}
