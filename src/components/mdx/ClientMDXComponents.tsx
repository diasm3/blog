"use client"

import type { MDXComponents } from "mdx/types"
import Image, { ImageProps } from "next/image"
import Link from "next/link"
import { JSX, ReactNode } from "react"
import { useTheme } from "styled-components"

// MDX 컴포넌트 타입 정의
type HeadingProps = {
  children: ReactNode
  id?: string
}

type WikiLinkProps = {
  href: string
  children: ReactNode
}

type TaskListItemProps = {
  checked?: boolean
  children: ReactNode
}

type TableWrapperProps = {
  children: ReactNode
}

// ✅ 코드 블록 스타일
const CodeBlock = ({
  className,
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) => {
  const theme = useTheme()
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""

  return (
    <div
      style={{
        position: "relative",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      {language && (
        <div
          style={{
            position: "absolute",
            right: "1rem",
            top: "0.5rem",
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
          }}
        >
          {language}
        </div>
      )}
      <pre
        className={className}
        style={{
          borderRadius: theme.borderRadius.medium,
          padding: "1rem",
          overflow: "auto",
          backgroundColor: theme.colors.background.dark,
          color: theme.colors.text.primary,
          fontFamily: theme.typography.fontFamily.mono,
          boxShadow: theme.shadows.sm,
        }}
        {...props}
      >
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

// ✅ 위키 스타일 링크 (외부 링크 & 내부 링크 구분)
const WikiLink = ({ href, children }: WikiLinkProps) => {
  const theme = useTheme()
  const isWikiLink = href?.startsWith("/wiki/")
  const isExternalLink = href?.startsWith("http")

  if (isWikiLink) {
    return (
      <Link
        href={href}
        style={{
          color: theme.colors.primary.main,
          borderBottom: `1px dotted ${theme.colors.primary.main}`,
          transition: theme.transitions.default,
        }}
      >
        {children}
      </Link>
    )
  }

  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: theme.colors.primary.main,
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} style={{ color: theme.colors.primary.main }}>
      {children}
    </Link>
  )
}

// ✅ 헤딩 컴포넌트 (앵커 링크 지원)
const Heading = ({
  level,
  children,
  id,
  ...props
}: HeadingProps & { level: 1 | 2 | 3 | 4 | 5 | 6 }) => {
  const theme = useTheme()
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  // 폰트 크기 결정
  let fontSize
  switch (level) {
    case 1:
      fontSize = theme.typography.fontSize["4xl"]
      break
    case 2:
      fontSize = theme.typography.fontSize["3xl"]
      break
    case 3:
      fontSize = theme.typography.fontSize["2xl"]
      break
    default:
      fontSize = theme.typography.fontSize.xl
  }

  return (
    <Tag
      id={id}
      style={{
        position: "relative",
        scrollMarginTop: "5rem",
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text.primary,
        marginTop: level === 1 ? "2rem" : "1.5rem",
        marginBottom: level === 1 ? "1rem" : "0.75rem",
        fontSize,
      }}
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          style={{
            position: "absolute",
            left: "-1rem",
            // 정적 스타일에서는 호버 상태를 직접 지정할 수 없으므로 기본값으로 설정
            opacity: 0,
            color: theme.colors.primary.main,
            textDecoration: "none",
          }}
          className="heading-anchor"
          aria-label={`${children} permalink`}
        >
          #
        </a>
      )}
      {children}
    </Tag>
  )
}

// ✅ 체크박스 리스트 아이템 (Task List)
const TaskListItem = ({ checked, children, ...props }: TaskListItemProps) => {
  const theme = useTheme()
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        readOnly
        style={{
          marginTop: "0.25rem",
          marginRight: "0.5rem",
          accentColor: theme.colors.primary.main,
        }}
      />
      <span {...props}>{children}</span>
    </li>
  )
}

// ✅ 테이블 스타일 (반응형 지원)
const TableWrapper = ({ children }: TableWrapperProps) => {
  return (
    <div
      style={{ overflowX: "auto", marginTop: "1.5rem", marginBottom: "1.5rem" }}
    >
      {children}
    </div>
  )
}

// 각 MDX 컴포넌트를 위한 래퍼 컴포넌트
const H1 = (props: HeadingProps) => <Heading level={1} {...props} />
const H2 = (props: HeadingProps) => <Heading level={2} {...props} />
const H3 = (props: HeadingProps) => <Heading level={3} {...props} />
const H4 = (props: HeadingProps) => <Heading level={4} {...props} />
const H5 = (props: HeadingProps) => <Heading level={5} {...props} />
const H6 = (props: HeadingProps) => <Heading level={6} {...props} />

const Paragraph = (props: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <p
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
        lineHeight: theme.typography.lineHeight.relaxed,
        color: theme.colors.text.primary,
      }}
      {...props}
    />
  )
}

const UnorderedList = (props: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <ul
      style={{
        listStyleType: "disc",
        paddingLeft: "1.5rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        color: theme.colors.text.primary,
      }}
      {...props}
    />
  )
}

const OrderedList = (props: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <ol
      style={{
        listStyleType: "decimal",
        paddingLeft: "1.5rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        color: theme.colors.text.primary,
      }}
      {...props}
    />
  )
}

const ListItem = (props: { className?: string; children: ReactNode }) => {
  const theme = useTheme()
  if (props.className?.includes("task-list-item")) {
    return <TaskListItem {...props} />
  }
  return (
    <li
      style={{
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
        color: theme.colors.text.primary,
      }}
      {...props}
    />
  )
}

const Blockquote = (props: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <blockquote
      style={{
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        borderLeftColor: theme.colors.primary.light,
        paddingLeft: "1rem",
        fontStyle: "italic",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        color: theme.colors.text.secondary,
      }}
      {...props}
    />
  )
}

const Table = (props: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <TableWrapper>
      <table
        style={{
          minWidth: "100%",
          borderCollapse: "collapse",
          border: `1px solid ${theme.colors.divider}`,
        }}
        {...props}
      />
    </TableWrapper>
  )
}

const TableHead = (props: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <th
      style={{
        border: `1px solid ${theme.colors.divider}`,
        padding: "0.5rem 1rem",
        backgroundColor: theme.colors.background.light,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text.primary,
      }}
      {...props}
    />
  )
}

const TableCell = (props: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <td
      style={{
        border: `1px solid ${theme.colors.divider}`,
        padding: "0.5rem 1rem",
        color: theme.colors.text.primary,
      }}
      {...props}
    />
  )
}

const MDXImage = (props: ImageProps) => {
  const theme = useTheme()
  return (
    <Image
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: theme.borderRadius.medium,
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        boxShadow: theme.shadows.md,
      }}
      {...props}
    />
  )
}

const InlineCode = (props: { className?: string; children: ReactNode }) => {
  const theme = useTheme()
  const { className } = props
  if (className?.includes("language-")) {
    return <CodeBlock {...props} />
  }
  return (
    <code
      style={{
        backgroundColor: `rgba(229, 231, 235, 0.5)`,
        padding: "0.125rem 0.375rem",
        borderRadius: theme.borderRadius.small,
        fontFamily: theme.typography.fontFamily.mono,
        fontSize: "0.875em",
      }}
      {...props}
    />
  )
}

export function getClientMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    // 헤딩 스타일 적용 (앵커 링크 포함)
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,

    // 링크 스타일 적용
    a: WikiLink,

    // 이미지 최적화 스타일 적용
    img: MDXImage,

    // 코드 블록 스타일 적용
    pre: (props) => <div {...props} />,
    code: InlineCode,

    // 체크박스 리스트 아이템 스타일 적용
    li: ListItem,

    // 문단 스타일 적용
    p: Paragraph,
    ul: UnorderedList,
    ol: OrderedList,

    // 인용문 스타일 적용
    blockquote: Blockquote,

    // 테이블 스타일 적용
    table: Table,
    th: TableHead,
    td: TableCell,

    // 기존 MDX 컴포넌트 확장
    ...components,
  }
}
