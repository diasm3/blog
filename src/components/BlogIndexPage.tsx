"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import styled from "styled-components"
import { SortOption, SortDirection } from "@/lib/mdx"

interface Post {
  slug: string
  frontMatter: {
    title: string
    date?: string
    excerpt?: string
    tags?: string[]
  }
  content: string
  source: {
    content: string
    frontmatter: Record<string, unknown>
  }
  toc: Array<{
    id: string
    text: string
    level: number
  }>
}

interface BlogIndexPageProps {
  posts: Post[]
  folders: string[]
  tags: string[]
}

export default function BlogIndexPage({
  posts: initialPosts,
  folders,
  tags,
}: BlogIndexPageProps) {
  // 필터링 상태
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts)
  const [sortBy, setSortBy] = useState<SortOption>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedFolder, setSelectedFolder] = useState<string>("")
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // 클라이언트 사이드에서 필터링 적용
  useEffect(() => {
    let result = [...initialPosts]

    // 폴더 필터링
    if (selectedFolder) {
      result = result.filter((post) => {
        const postPath = post.slug.split("/")
        return postPath.length > 1 && postPath[0] === selectedFolder
      })
    }

    // 태그 필터링
    if (selectedTag) {
      result = result.filter((post) =>
        post.frontMatter.tags?.includes(selectedTag)
      )
    }

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.frontMatter.title.toLowerCase().includes(query) ||
          post.frontMatter.excerpt?.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      )
    }

    // 정렬 적용
    result.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "date":
          const dateA = a.frontMatter.date
            ? new Date(a.frontMatter.date)
            : new Date(0)
          const dateB = b.frontMatter.date
            ? new Date(b.frontMatter.date)
            : new Date(0)
          comparison = dateB.getTime() - dateA.getTime()
          break

        case "title":
          comparison = a.frontMatter.title.localeCompare(b.frontMatter.title)
          break

        case "folder":
          const folderA = a.slug.split("/")[0] || ""
          const folderB = b.slug.split("/")[0] || ""
          comparison = folderA.localeCompare(folderB)
          break
      }

      return sortDirection === "asc" ? comparison * -1 : comparison
    })

    setFilteredPosts(result)
  }, [
    initialPosts,
    selectedFolder,
    selectedTag,
    searchQuery,
    sortBy,
    sortDirection,
  ])

  // 필터 초기화
  const resetFilters = () => {
    setSelectedFolder("")
    setSelectedTag("")
    setSearchQuery("")
    setSortBy("date")
    setSortDirection("desc")
  }

  return (
    <Container>
      <Title>블로그 포스트</Title>

      <FilterContainer>
        <FilterSection>
          <FilterLabel>정렬:</FilterLabel>
          <SelectFilter
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="date">날짜순</option>
            <option value="title">제목순</option>
            <option value="folder">폴더순</option>
          </SelectFilter>

          <SortDirectionButton
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            $isAscending={sortDirection === "asc"}
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </SortDirectionButton>
        </FilterSection>

        <FilterSection>
          <FilterLabel>폴더:</FilterLabel>
          <SelectFilter
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
          >
            <option value="">전체</option>
            {folders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </SelectFilter>
        </FilterSection>

        <FilterSection>
          <FilterLabel>태그:</FilterLabel>
          <SelectFilter
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">전체</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </SelectFilter>
        </FilterSection>

        <FilterSection>
          <SearchInput
            type="text"
            placeholder="검색어 입력..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FilterSection>

        <ResetButton onClick={resetFilters}>필터 초기화</ResetButton>
      </FilterContainer>

      <ResultSummary>총 {filteredPosts.length}개의 포스트</ResultSummary>

      <PostGrid>
        {filteredPosts.map((post) => (
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

              {post.slug.includes("/") && (
                <FolderBadge>{post.slug.split("/")[0]}</FolderBadge>
              )}

              {post.frontMatter.excerpt && (
                <PostExcerpt>{post.frontMatter.excerpt}</PostExcerpt>
              )}

              {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                <TagList>
                  {post.frontMatter.tags.map((tag) => (
                    <Tag
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      $isSelected={selectedTag === tag}
                    >
                      {tag}
                    </Tag>
                  ))}
                </TagList>
              )}
            </PostContent>
          </PostCard>
        ))}
      </PostGrid>

      {filteredPosts.length === 0 && (
        <EmptyState>
          <p>검색 결과가 없습니다.</p>
          <ResetButton onClick={resetFilters}>필터 초기화</ResetButton>
        </EmptyState>
      )}
    </Container>
  )
}

const Container = styled.div`
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--color-background-paper);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-sm);
`

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FilterLabel = styled.label`
  font-weight: 500; /* medium */
  color: var(--color-text-secondary);
`

const SelectFilter = styled.select`
  padding: 0.5rem;
  border-radius: var(--border-radius-small);
  border: 1px solid var(--color-divider);
  background-color: var(--color-background-default);
  color: var(--color-text-primary);
  font-size: 0.9rem;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: var(--color-primary-main);
  }
`

const SortDirectionButton = styled.button<{ $isAscending: boolean }>`
  padding: 0.5rem;
  border-radius: var(--border-radius-small);
  border: 1px solid var(--color-divider);
  background-color: var(--color-background-default);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-background-light);
  }
`

const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: var(--border-radius-small);
  border: 1px solid var(--color-divider);
  background-color: var(--color-background-default);
  color: var(--color-text-primary);
  font-size: 0.9rem;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: var(--color-primary-main);
  }
`

const ResetButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-small);
  border: none;
  background-color: var(--color-primary-main);
  color: var(--color-primary-contrast-text);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`

const ResultSummary = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
`

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const PostCard = styled.div`
  border-radius: var(--border-radius-medium);
  background-color: var(--color-background-paper);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`

const PostContent = styled.div`
  padding: 1.5rem;
  position: relative;
`

const PostTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;

  a {
    color: var(--color-text-primary);
    text-decoration: none;

    &:hover {
      color: var(--color-primary-main);
    }
  }
`

const PostDate = styled.div`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
`

const FolderBadge = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.75rem;
  border-radius: var(--border-radius-small);
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  font-weight: 500; /* medium */
`

const PostExcerpt = styled.p`
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.span<{ $isSelected?: boolean }>`
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px; /* full */
  background-color: ${(props) =>
    props.$isSelected
      ? "var(--color-primary-light)"
      : "var(--color-background-light)"};
  color: ${(props) =>
    props.$isSelected
      ? "var(--color-primary-dark)"
      : "var(--color-text-secondary)"};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.$isSelected
        ? "var(--color-primary-light)"
        : "var(--color-background-light)"};
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--color-background-paper);
  border-radius: var(--border-radius-medium);

  p {
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }
`
