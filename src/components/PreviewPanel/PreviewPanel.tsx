// PreviewPanel.tsx
"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { DefaultMarkdownComponents } from "@/vikiEditor/features/MarkdownParser"
import * as S from "@/components/VikiEditor/layout/styles"
import { BlockState } from "@/utils/stores/useBlockStore"
import { Pin } from "lucide-react"
import React from "react"
import { useGlobalStore } from "@/utils/hooks/global/useGlobalStore"
import { TableOfContents } from "@/vikiEditor/features"

export const PreviewPanel: React.FC<{
  isVisible: boolean
  isPinned: boolean // 추가
  onTogglePin: () => void // 추가
  blockChildren: BlockState[]
}> = ({ isVisible, isPinned, onTogglePin, blockChildren }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "json" | "toc">(
    "preview"
  )
  const { isDarkMode } = useGlobalStore()
  const headingRefs = useRef<{ [key: string]: HTMLHeadingElement | null }>({})

  const customComponents = useMemo(() => {
    const baseComponents = DefaultMarkdownComponents(isDarkMode)

    const safeBaseComponents = {
      ...baseComponents,
      h1: baseComponents.h1 || {},
      h2: baseComponents.h2 || {},
      h3: baseComponents.h3 || {},
    }

    return {
      ...safeBaseComponents,
      h1: createHeadingComponent(
        1,
        safeBaseComponents.h1 as React.CSSProperties,
        headingRefs
      ),
      h2: createHeadingComponent(
        2,
        safeBaseComponents.h2 as React.CSSProperties,
        headingRefs
      ),
      h3: createHeadingComponent(
        3,
        safeBaseComponents.h3 as React.CSSProperties,
        headingRefs
      ),
    }
  }, [isDarkMode, headingRefs])

  const getCurrentContent = () => {
    // 모든 블록의 content를 하나로 합침
    return blockChildren.map((block) => block.content).join("\n\n") // 블록 사이에 빈 줄을 추가하여 마크다운 문단 구분
  }

  return (
    <S.RightPanel $isVisible={isVisible} $isPinned={isPinned}>
      <S.TabContainer>
        <S.Tab
          $active={activeTab === "preview"}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </S.Tab>
        <S.Tab
          $active={activeTab === "json"}
          onClick={() => setActiveTab("json")}
        >
          JSON
        </S.Tab>
        <S.Tab
          $active={activeTab === "toc"}
          onClick={() => setActiveTab("toc")}
        >
          TOC
        </S.Tab>
        <S.PinButton
          $isPinned={isPinned}
          onClick={onTogglePin}
          title={isPinned ? "Unpin panel" : "Pin panel"}
        >
          <Pin size={16} />
        </S.PinButton>
      </S.TabContainer>

      <S.TabContent>
        {activeTab === "preview" && (
          <S.PreviewContainer>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={customComponents}
            >
              {getCurrentContent()}
            </ReactMarkdown>
          </S.PreviewContainer>
        )}

        {activeTab === "json" && (
          <S.PreviewContainer as="pre">
            {JSON.stringify(blockChildren, null, 2)}
          </S.PreviewContainer>
        )}

        {activeTab === "toc" && (
          <TableOfContents content={getCurrentContent()} />
        )}
      </S.TabContent>
    </S.RightPanel>
  )
}

interface TocItem {
  content: string
  level: number
  id: string
}

export const generateToc = (markdownContent: string) => {
  // 각 줄을 분석하여 헤딩 찾기
  const lines = markdownContent.split("\n")
  const tocItems: TocItem[] = []

  // 헤딩을 찾는 정규표현식
  const headingRegex = /^(#{1,6})\s+(.+)$/

  lines.forEach((line, index) => {
    const match = line.match(headingRegex)
    if (match) {
      const level = match[1].length // #의 개수로 레벨 결정
      const content = match[2].trim()

      // 목차 ID 생성 (content를 소문자로 변환하고 공백을 하이픈으로 대체)
      const id = content
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // 특수문자 제거
        .replace(/\s+/g, "-") // 공백을 하이픈으로 변환

      tocItems.push({ content, level, id })
    }
  })

  return (
    <S.TocWrapper>
      {tocItems.length > 0 ? (
        tocItems.map((item, index) => (
          <S.TocLink
            key={index}
            $level={item.level}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              // scrollToHeading(item.id)
            }}
          >
            {item.content}
          </S.TocLink>
        ))
      ) : (
        <S.EmptyToc>No headings found in the document</S.EmptyToc>
      )}
    </S.TocWrapper>
  )
}

type HeadingElementType = HTMLHeadingElement
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type HeadingComponentProps = {
  node?: any
  children?: React.ReactNode
  [key: string]: any
}

const createHeadingComponent = (
  level: HeadingLevel,
  baseStyle: React.CSSProperties,
  refs: React.MutableRefObject<{ [key: string]: HeadingElementType | null }>
) => {
  // 명시적으로 React.createElement를 사용
  const HeadingComponent = ({
    node,
    children,
    ...props
  }: HeadingComponentProps) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")

    const setRef = (element: HeadingElementType | null) => {
      if (element && id) {
        refs.current[id] = element
      }
    }

    return React.createElement(
      `h${level}`,
      {
        ...props,
        id,
        ref: setRef,
        style: { ...baseStyle },
      },
      children
    )
  }

  return HeadingComponent
}
