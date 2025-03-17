"use client"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"

interface TocItem {
  content: string
  level: number
  id: string
}

export const TableOfContents: React.FC<{ content: string }> = ({ content }) => {
  const [activeId, setActiveId] = useState<string>("")
  const [scrollProgress, setScrollProgress] = useState(0)

  // 헤딩 추출 및 TOC 아이템 생성
  const tocItems = useMemo(() => {
    const lines = content.split("\n")
    const items: TocItem[] = []
    const headingRegex = /^(#{1,6})\s+(.+)$/

    lines.forEach((line) => {
      const match = line.match(headingRegex)
      if (match) {
        const level = match[1].length
        const content = match[2].trim()
        const id = content
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
        items.push({ content, level, id })
      }
    })

    return items
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치 계산
      const mainContent = document.querySelector("main")
      if (!mainContent) return

      // 메인 컨텐츠 내의 스크롤 위치 계산
      const scrolled = mainContent.scrollTop
      const height = mainContent.scrollHeight - mainContent.clientHeight
      const progress = (scrolled / height) * 100
      setScrollProgress(progress)

      // 현재 화면에 보이는 헤딩 찾기
      const headings = Array.from(
        mainContent.querySelectorAll("h1, h2, h3, h4, h5, h6")
      )

      let closest = ""
      let closestDistance = Infinity

      headings.forEach((heading) => {
        const id = heading.id
        if (!id) return

        const rect = heading.getBoundingClientRect()
        const distance = Math.abs(rect.top - 80) // 헤더 높이 고려

        if (distance < closestDistance) {
          closest = id
          closestDistance = distance
        }
      })

      setActiveId(closest)
    }

    // 메인 컨텐츠 요소에 스크롤 이벤트 리스너 추가
    const mainContent = document.querySelector("main")
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll)
      handleScroll() // 초기 로드 시 실행

      return () => {
        mainContent.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    const mainContent = document.querySelector("main")

    if (element && mainContent) {
      // 메인 컨텐츠 내에서의 요소 위치 계산
      const offsetTop = element.offsetTop - 80 // 헤더 높이 고려

      mainContent.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <TocWrapper>
      <VerticalScrollIndicator $progress={scrollProgress} />
      {tocItems.length > 0 ? (
        tocItems.map((item, index) => (
          <TocLink
            key={index}
            $level={item.level}
            $isActive={activeId === item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToHeading(item.id)
            }}
          >
            {item.content}
          </TocLink>
        ))
      ) : (
        <EmptyToc>No headings found in the document</EmptyToc>
      )}
    </TocWrapper>
  )
}

export const EmptyToc = styled.div`
  color: var(--color-text-secondary);
  font-style: italic;
  padding: 1rem;
  text-align: center;
`

// TOC 컴포넌트 스타일
export const TocWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 16px;
  gap: 8px;
  background-color: var(--color-background-paper);
  border-radius: var(--border-radius-medium);
`

export const TocLink = styled.a<{
  $level: number
  $isActive?: boolean
}>`
  padding: 6px 8px;
  padding-left: ${(props) => props.$level * 12}px;
  font-size: ${(props) => 15 - (props.$level - 1)}px;
  color: ${(props) =>
    props.$isActive
      ? "var(--color-primary-main)"
      : "var(--color-text-primary)"};
  text-decoration: none;
  border-left: 2px solid
    ${(props) =>
      props.$isActive ? "var(--color-primary-main)" : "transparent"};
  transition: all 0.2s ease;
  opacity: ${(props) => 1 - (props.$level - 1) * 0.1};
  overflow-wrap: break-word;
  word-break: break-word;

  &:hover {
    background: var(--color-background-default);
    color: var(--color-primary-main);
  }
`

// 세로 스크롤 인디케이터
export const VerticalScrollIndicator = styled.div<{ $progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: ${(props) => props.$progress}%;
  background: var(--color-primary-main);
  transition: height 0.1s ease;
`
