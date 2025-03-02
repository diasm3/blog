import React from "react"
import {
  oneDark as oneDarkStyle,
  oneLight as oneLightStyle,
} from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Components } from "react-markdown"
import {
  SyntaxHighlighter,
  registerLanguages,
} from "../../lib/converter/syntaxHighlighter"
// import { useDocumentStore } from "@/utils/stores/useDocumentStore"

registerLanguages()

// 인터페이스 정의
interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

interface MarkdownComponentsProps {
  isDark?: boolean
  customStyles?: {
    code?: React.CSSProperties
    codeBlock?: React.CSSProperties
  }
}

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

interface MarkdownComponentsProps {
  isDark?: boolean
  customStyles?: {
    code?: React.CSSProperties
    codeBlock?: React.CSSProperties
  }
}

// 위키 링크 파싱 함수
const parseWikiLinks = (text: string) => {
  const linkRegex = /\[\[(.*?)\]\](?:\{(.*?)\})?/g
  const matches = []
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    matches.push({
      raw: match[0],
      target: match[1].trim(),
      display: match[2]?.trim() || match[1].trim(),
    })
  }

  return matches
}

// const WikiLink: React.FC<{ target: string; display: string }> = ({
//   target,
//   display,
// }) => {
//   // const { documentTreeNode, joinDocument } = useDocumentStore()

//   const handleClick = () => {
//     // target이 backend나 oauth 같은 단일 키워드로 들어올 때
//     // 전체 경로에서 매칭되는 문서 찾기
//     const targetDoc = documentTreeNode?.find((doc) => {
//       // 경로의 마지막 부분이 target과 일치하는지 확인
//       const pathSegments = doc.path.split("/")
//       const lastSegment = pathSegments[pathSegments.length - 1]
//       return lastSegment.toLowerCase() === target.toLowerCase()
//     })

//     if (targetDoc) {
//       joinDocument(targetDoc.id)
//     } else {
//       console.log(`Document not found for target: ${target}`)
//     }
//   }

//   // 링크의 표시 상태를 결정 (문서 존재 여부에 따라)
//   const docExists = documentTreeNode?.some((doc) => {
//     const pathSegments = doc.path.split("/")
//     const lastSegment = pathSegments[pathSegments.length - 1]
//     return lastSegment.toLowerCase() === target.toLowerCase()
//   })

//   return (
//     <a
//       onClick={handleClick}
//       data-wiki-link="true"
//       data-exists={docExists}
//       style={{ cursor: "pointer" }}
//     >
//       {display}
//     </a>
//   )
// }

export const createMarkdownComponents = ({
  isDark = false,
  customStyles = {},
}: MarkdownComponentsProps = {}): Components => {
  // 공통 링크 처리 로직
  const processLinks = (text: string) => {
    const links = parseWikiLinks(text)
    if (links.length === 0) {
      return text
    }

    let lastIndex = 0
    const elements: React.ReactNode[] = []

    links.forEach((link, i) => {
      const startIndex = text.indexOf(link.raw, lastIndex)
      if (startIndex > lastIndex) {
        elements.push(
          <span key={`text-${i}-${lastIndex}`}>
            {text.slice(lastIndex, startIndex)}
          </span>
        )
      }

      elements
        .push
        // <WikiLink
        //   key={`link-${i}`}
        //   target={link.target}
        //   display={link.display}
        // />
        ()

      lastIndex = startIndex + link.raw.length
    })

    if (lastIndex < text.length) {
      elements.push(
        <span key={`text-end-${lastIndex}`}>{text.slice(lastIndex)}</span>
      )
    }

    return elements
  }

  return {
    // 기존 컴포넌트들...

    // 헤딩 처리
    h1: ({ children, ...props }) => {
      const content =
        typeof children === "string" ? processLinks(children) : children
      return (
        <h1
          style={{
            color: isDark ? "#fff" : "#000",
            borderBottom: `1px solid ${isDark ? "#444" : "#eee"}`,
            paddingBottom: "0.3em",
            marginTop: "1.5em",
            marginBottom: "1em",
            fontSize: "2em",
            fontWeight: "600",
          }}
          {...props}
        >
          {content}
        </h1>
      )
    },

    h2: ({ children, ...props }) => {
      const content =
        typeof children === "string" ? processLinks(children) : children
      return (
        <h2
          style={{
            color: isDark ? "#fff" : "#000",
            borderBottom: `1px solid ${isDark ? "#444" : "#eee"}`,
            paddingBottom: "0.3em",
            marginTop: "1.5em",
            marginBottom: "1em",
            fontSize: "1.5em",
            fontWeight: "600",
          }}
          {...props}
        >
          {content}
        </h2>
      )
    },

    h3: ({ children, ...props }) => {
      const content =
        typeof children === "string" ? processLinks(children) : children
      return (
        <h3
          style={{
            color: isDark ? "#fff" : "#000",
            paddingBottom: "0.3em",
            marginTop: "1.5em",
            marginBottom: "1em",
            fontSize: "1.3em",
            fontWeight: "600",
          }}
          {...props}
        >
          {content}
        </h3>
      )
    },

    h4: ({ children, ...props }) => {
      const content =
        typeof children === "string" ? processLinks(children) : children
      return (
        <h4
          style={{
            color: isDark ? "#fff" : "#000",
            marginTop: "1.5em",
            marginBottom: "1em",
            fontSize: "1.2em",
            fontWeight: "600",
          }}
          {...props}
        >
          {content}
        </h4>
      )
    },

    // 다른 컴포넌트들도 공통 processLinks 함수 사용
    p: ({ children }) => {
      const content =
        typeof children === "string" ? processLinks(children) : children
      return <p className={isDark ? "dark" : ""}>{content}</p>
    },

    li: ({ children }) => {
      const content =
        typeof children === "string" ? processLinks(children) : children
      return <li>{content}</li>
    },

    strong: ({ children }) => {
      const content =
        typeof children === "string" ? processLinks(children) : children
      return <strong>{content}</strong>
    },

    // ... 나머지 컴포넌트들
  }
}

export const createMarkdownComponents2 = ({
  isDark = false,
  customStyles = {},
}: MarkdownComponentsProps = {}): Components => {
  return {
    code: ({ node, inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || "")
      const language = match ? match[1] : ""

      // 인라인 코드인 경우
      if (inline) {
        return (
          <code
            className={className}
            style={{
              padding: "0.2em 0.4em",
              borderRadius: "3px",
              fontSize: "0.9em",
              background: isDark ? "#2d2d2d" : "#f5f5f5",
              color: isDark ? "#e0e0e0" : "#333",
              fontFamily: "'JetBrains Mono', monospace",
              ...customStyles.code,
            }}
            {...props}
          >
            {children}
          </code>
        )
      }

      // 코드 블록의 경우
      return (
        <SyntaxHighlighter
          style={(isDark ? oneDarkStyle : oneLightStyle) as any}
          language={language}
          PreTag="div"
          showLineNumbers
          customStyle={{
            margin: "1em 0",
            padding: "1em",
            borderRadius: "4px",
            fontSize: "0.9em",
            fontFamily: "'JetBrains Mono', monospace",
            ...customStyles.codeBlock,
          }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      )
    },
    li: ({ children }) => {
      if (typeof children === "string") {
        const links = parseWikiLinks(children)
        if (links.length === 0) {
          return <li>{children}</li>
        }

        let lastIndex = 0
        const elements: React.ReactNode[] = []

        links.forEach((link, i) => {
          const startIndex = children.indexOf(link.raw, lastIndex)
          if (startIndex > lastIndex) {
            elements.push(
              <span key={`text-${i}-${lastIndex}`}>
                {children.slice(lastIndex, startIndex)}
              </span>
            )
          }

          elements
            .push
            // <WikiLink
            //   key={`link-${i}`}
            //   target={link.target}
            //   display={link.display}
            // />
            ()

          lastIndex = startIndex + link.raw.length
        })

        if (lastIndex < children.length) {
          elements.push(
            <span key={`text-end-${lastIndex}`}>
              {children.slice(lastIndex)}
            </span>
          )
        }

        return <li>{elements}</li>
      }
      return <li>{children}</li>
    },

    // 문단 처리
    p: ({ children }) => {
      if (typeof children === "string") {
        const links = parseWikiLinks(children)
        if (links.length === 0) {
          return <p className={isDark ? "dark" : ""}>{children}</p>
        }

        let lastIndex = 0
        const elements: React.ReactNode[] = []

        links.forEach((link, i) => {
          const startIndex = children.indexOf(link.raw, lastIndex)
          if (startIndex > lastIndex) {
            elements.push(
              <span key={`text-${i}-${lastIndex}`}>
                {children.slice(lastIndex, startIndex)}
              </span>
            )
          }

          elements
            .push
            // <WikiLink
            //   key={`link-${i}`}
            //   target={link.target}
            //   display={link.display}
            // />
            ()

          lastIndex = startIndex + link.raw.length
        })

        if (lastIndex < children.length) {
          elements.push(
            <span key={`text-end-${lastIndex}`}>
              {children.slice(lastIndex)}
            </span>
          )
        }

        return <p className={isDark ? "dark" : ""}>{elements}</p>
      }
      return <p className={isDark ? "dark" : ""}>{children}</p>
    },

    // strong 태그 (볼드 텍스트) 처리
    strong: ({ children }) => {
      if (typeof children === "string") {
        const links = parseWikiLinks(children)
        if (links.length === 0) {
          return <strong>{children}</strong>
        }

        let lastIndex = 0
        const elements: React.ReactNode[] = []

        links.forEach((link, i) => {
          const startIndex = children.indexOf(link.raw, lastIndex)
          if (startIndex > lastIndex) {
            elements.push(
              <span key={`text-${i}-${lastIndex}`}>
                {children.slice(lastIndex, startIndex)}
              </span>
            )
          }

          elements.push(
            <strong key={`link-${i}`}>
              {/* <WikiLink target={link.target} display={link.display} /> */}
            </strong>
          )

          lastIndex = startIndex + link.raw.length
        })

        if (lastIndex < children.length) {
          elements.push(
            <span key={`text-end-${lastIndex}`}>
              {children.slice(lastIndex)}
            </span>
          )
        }

        return <strong>{elements}</strong>
      }
      return <strong>{children}</strong>
    },

    // 다른 마크다운 요소들의 커스텀 렌더링도 추가 가능
    h1: ({ children, ...props }) => (
      <h1
        style={{
          color: isDark ? "#fff" : "#000",
          borderBottom: `1px solid ${isDark ? "#444" : "#eee"}`,
          paddingBottom: "0.3em",
        }}
        {...props}
      >
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => (
      <h2
        style={{
          color: isDark ? "#fff" : "#000",
          borderBottom: `1px solid ${isDark ? "#444" : "#eee"}`,
          paddingBottom: "0.3em",
        }}
        {...props}
      >
        {children}
      </h2>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote
        style={{
          borderLeft: `4px solid ${isDark ? "#555" : "#ddd"}`,
          paddingLeft: "1em",
          margin: "1em 0",
          color: isDark ? "#aaa" : "#666",
        }}
        {...props}
      >
        {children}
      </blockquote>
    ),
  }
}

// 사용 예시:
export const DefaultMarkdownComponents = (isDark: boolean) =>
  createMarkdownComponents({ isDark })
export const DarkMarkdownComponents = createMarkdownComponents({ isDark: true })

// 커스텀 스타일과 함께 사용
export const CustomMarkdownComponents = createMarkdownComponents({
  isDark: true,
  customStyles: {
    code: {
      background: "#1a1a1a",
      color: "#00ff00",
    },
    codeBlock: {
      background: "#1a1a1a",
      fontSize: "1.1em",
    },
  },
})
