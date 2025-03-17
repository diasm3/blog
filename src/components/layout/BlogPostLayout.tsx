"use client"

import React, { ReactNode } from "react"
import styled from "styled-components"
import { TableOfContents } from "../PreviewPanel/TocPreview"

interface BlogPostLayoutProps {
  children: ReactNode
  title: string
  date: string
  content: string
}

// 블로그 포스트 레이아웃 스타일
const LayoutContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  gap: 2.5rem;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 0.5rem;
  }
`

const MainContent = styled.article`
  flex: 1;
  min-width: 0; /* 중요: flex item이 내용에 따라 확장되는 것을 방지 */
  background-color: var(--color-background-paper);
  color: var(--color-text-primary);
  padding: 2rem;
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  position: relative;
  z-index: 1;
  overflow-wrap: break-word;
  word-break: break-word;
  margin: 1rem 0;
`

const Sidebar = styled.aside`
  position: sticky;
  top: 1rem;
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--color-background-paper);
  color: var(--color-text-primary);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  z-index: 10;
  width: 230px;
  flex-shrink: 0;
  margin: 1rem 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
`

const Date = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
`

export default function BlogPostLayout({
  children,
  title,
  date,
  content,
}: BlogPostLayoutProps) {
  return (
    <LayoutContainer>
      <MainContent>
        <Title>{title}</Title>
        <Date>{date}</Date>
        {children}
      </MainContent>
      <Sidebar>
        <h3>목차</h3>
        <TableOfContents content={content} />
      </Sidebar>
    </LayoutContainer>
  )
}
