import type { MDXComponents } from "mdx/types"
import Image, { ImageProps } from "next/image"
import Link from "next/link"
import { JSX } from "react"

// ✅ 코드 블록 스타일 (다크모드 지원)
const CodeBlock = ({ className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""

  return (
    <div className="relative my-6">
      {language && (
        <div className="absolute right-4 top-2 text-xs text-gray-500 dark:text-gray-400 right-4 top-2">
          {language}
        </div>
      )}
      <pre
        className={`rounded-lg p-4 overflow-x-auto bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${className}`}
        {...props}
      >
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

// ✅ 위키 스타일 링크 (외부 링크 & 내부 링크 구분)
const WikiLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const isWikiLink = href?.startsWith("/wiki/")

  return isWikiLink ? (
    <Link
      href={href}
      className="text-blue-600 border-b border-dotted border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-200"
    >
      {children}
    </Link>
  ) : (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-blue-600 hover:underline"
    >
      {children}
    </a>
  )
}

// ✅ 헤딩 컴포넌트 (앵커 링크 지원)
const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  return ({ children, id, ...props }: any) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return (
      <Tag
        id={id}
        {...props}
        className={`relative scroll-mt-20 font-bold text-gray-900 dark:text-gray-100 group`}
      >
        <a
          href={`#${id}`}
          className="absolute -left-4 opacity-0 group-hover:opacity-100 text-gray-500 dark:text-gray-400 transition-opacity"
          aria-label={`${children} permalink`}
        >
          #
        </a>
        {children}
      </Tag>
    )
  }
}

// ✅ 체크박스 리스트 아이템 (Task List)
const TaskListItem = ({ checked, children, ...props }: any) => {
  return (
    <li className="flex items-start my-1">
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="mt-1 mr-2 accent-blue-600"
      />
      <span {...props}>{children}</span>
    </li>
  )
}

// ✅ 테이블 스타일 (반응형 지원)
const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="overflow-x-auto my-6">{children}</div>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 헤딩 스타일 적용 (앵커 링크 포함)
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),

    // 링크 스타일 적용
    a: (props) => <WikiLink {...props} />,

    // 이미지 최적화 스타일 적용
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
        className="rounded-lg my-6 shadow-md"
      />
    ),

    // 코드 블록 스타일 적용
    pre: (props) => <CodeBlock {...props} />,
    code: (props) => (
      <code
        className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm text-gray-900 dark:text-gray-100"
        {...props}
      />
    ),

    // 체크박스 리스트 아이템 스타일 적용
    li: (props: any) => {
      if (props.className?.includes("task-list-item")) {
        return <TaskListItem {...props} />
      }
      return <li className="my-1 text-gray-900 dark:text-gray-100" {...props} />
    },

    // 문단 스타일 적용
    p: (props) => (
      <p
        className="my-4 leading-relaxed text-gray-800 dark:text-gray-200"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="list-disc pl-6 my-4 text-gray-900 dark:text-gray-100"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal pl-6 my-4 text-gray-900 dark:text-gray-100"
        {...props}
      />
    ),

    // 인용문 스타일 적용
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-blue-400 pl-4 italic my-6 text-gray-700 dark:text-gray-300"
        {...props}
      />
    ),

    // 테이블 스타일 적용
    table: (props) => (
      <TableWrapper>
        <table
          className="min-w-full border-collapse border border-gray-300 dark:border-gray-600"
          {...props}
        />
      </TableWrapper>
    ),
    th: (props) => (
      <th
        className="border px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-200"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border px-4 py-2 text-gray-900 dark:text-gray-100"
        {...props}
      />
    ),
    // title: (props) => <title className="" {...props} />,

    // 기존 MDX 컴포넌트 확장
    ...components,
  }
}
