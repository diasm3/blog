"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import * as S from "./Preview.styles"
import styled from "styled-components"

interface TocItem {
  content: string
  level: number
  id: string
}

// TOC 컴포넌트 스타일
export const TocWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`

export const TocLink = styled.a<{
  $level: number
  $isActive?: boolean
}>`
  padding: 6px 8px;
  padding-left: ${(props) => props.$level * 16}px;
  font-size: ${(props) => 16 - (props.$level - 1)}px;
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.primary.main
      : props.theme.colors.text.primary};
  text-decoration: none;
  border-left: 2px solid
    ${(props) =>
      props.$isActive ? props.theme.colors.primary.main : "transparent"};
  transition: all 0.2s ease;
  opacity: ${(props) => 1 - (props.$level - 1) * 0.1};

  &:hover {
    background: ${(props) => props.theme.colors.background.default};
    color: ${(props) => props.theme.colors.primary.main};
  }
`

// 세로 스크롤 인디케이터
export const VerticalScrollIndicator = styled.div<{ $progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: ${(props) => props.$progress}%;
  background: ${(props) => props.theme.colors.primary.main};
  transition: height 0.1s ease;
`

// TOC 생성 및 스크롤 관리 로직
export const TableOfContents: React.FC<{ content: string }> = ({ content }) => {
  const [activeId, setActiveId] = useState<string>("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const headingRefs = useRef<{ [key: string]: HTMLElement }>({})

  // 헤딩 추출 및 TOC 아이템 생성
  const tocItems = useMemo(() => {
    const lines = content.split("\n")
    const items: TocItem[] = []
    const headingRegex = /^(#{1,6})\s+(.+)$/

    lines.forEach((line, index) => {
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

  // 스크롤 위치에 따른 활성 헤딩 감지
  useEffect(() => {
    const handleScroll = () => {
      // 전체 스크롤 진행률 계산
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / height) * 100
      setScrollProgress(progress)

      // 현재 뷰포트에서 가장 가까운 헤딩 찾기
      let closest = ""
      let closestDistance = Infinity

      Object.entries(headingRefs.current).forEach(([id, element]) => {
        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top)

        if (distance < closestDistance) {
          closest = id
          closestDistance = distance
        }
      })

      setActiveId(closest)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 헤딩으로 스크롤
  const scrollToHeading = (id: string) => {
    const element = headingRefs.current[id]
    if (element) {
      const offset = element.offsetTop - 80 // 헤더 높이 등을 고려한 오프셋
      window.scrollTo({
        top: offset,
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
        <S.EmptyToc>No headings found in the document</S.EmptyToc>
      )}
    </TocWrapper>
  )
}
