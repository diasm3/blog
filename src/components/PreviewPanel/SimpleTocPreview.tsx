"use client"
import styled from "styled-components"

interface TocItem {
  content: string
  level: number
  id: string
}

export const SimpleTableOfContents: React.FC<{ content: string }> = ({
  content,
}) => {
  // 헤딩 추출 및 TOC 아이템 생성
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

  return (
    <TocWrapper>
      {items.length > 0 ? (
        items.map((item, index) => (
          <TocLink key={index} $level={item.level} href={`#${item.id}`}>
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
}>`
  padding: 6px 8px;
  padding-left: ${(props) => props.$level * 12}px;
  font-size: ${(props) => 15 - (props.$level - 1)}px;
  color: var(--color-text-primary);
  text-decoration: none;
  transition: all 0.2s ease;
  opacity: ${(props) => 1 - (props.$level - 1) * 0.1};
  overflow-wrap: break-word;
  word-break: break-word;

  &:hover {
    background: var(--color-background-default);
    color: var(--color-primary-main);
  }
`
