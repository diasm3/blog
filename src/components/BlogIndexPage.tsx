"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import styled from "styled-components"

interface BlogIndexPageProps {
  posts: Array<{
    slug: string
    frontMatter: {
      title: string
      date?: string
      excerpt?: string
      tags?: string[]
    }
    content: string
    source: {
      content: any
      frontmatter: any
    }
    toc: Array<{
      id: string
      text: string
      level: number
    }>
  }>
}

const Container = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const PostCard = styled.div`
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) => props.theme.colors.background.paper};
  box-shadow: ${(props) => props.theme.shadows.md};
  overflow: hidden;
  transition: ${(props) => props.theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`

const PostContent = styled.div`
  padding: 1.5rem;
`

const PostTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;

  a {
    color: ${(props) => props.theme.colors.text.primary};
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.colors.primary.main};
    }
  }
`

const PostDate = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 0.75rem;
`

const PostExcerpt = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.span`
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.full};
  background-color: ${(props) => props.theme.colors.background.light};
  color: ${(props) => props.theme.colors.text.secondary};
`

export default function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <Container>
      <Title>블로그 포스트</Title>

      <PostGrid>
        {posts.map((post) => (
          <PostCard key={post.slug}>
            <PostContent>
              <PostTitle>
                <Link href={`/blog/${post.slug}`}>
                  {post.frontMatter.title}
                </Link>
              </PostTitle>

              {post.frontMatter.date && (
                <PostDate>
                  {new Date(post.frontMatter.date).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </PostDate>
              )}

              {post.frontMatter.excerpt && (
                <PostExcerpt>{post.frontMatter.excerpt}</PostExcerpt>
              )}

              {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                <TagList>
                  {post.frontMatter.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              )}
            </PostContent>
          </PostCard>
        ))}
      </PostGrid>
    </Container>
  )
}
