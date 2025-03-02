"use client"

import React, { ReactNode } from "react"
import styled from "styled-components"
import { TableOfContents } from "@/components/PreviewPanel/TocPreview"

interface BlogPostLayoutProps {
  children: ReactNode
  title: string
  date: string
  content: string
}

// 블로그 포스트 레이아웃 스타일
const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MainContent = styled.article`
  width: 100%;
`

const Sidebar = styled.aside`
  position: sticky;
  top: 2rem;
  height: calc(100vh - 4rem);
  overflow-y: auto;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: 768px) {
    display: none;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`

const Date = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
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
