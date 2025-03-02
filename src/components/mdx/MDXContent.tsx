"use client"

import { MDXComponents } from "mdx/types"
import { ReactNode, createContext, useContext } from "react"
import Image from "next/image"
import { useTheme } from "styled-components"
import * as MDXTheme from "@/components/layout/mdx_theme"

// MDX 컴포넌트를 위한 컨텍스트 생성
const MDXComponentsContext = createContext<MDXComponents>({})

// MDX 컴포넌트를 사용하기 위한 훅
export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  const contextComponents = useContext(MDXComponentsContext)
  return { ...contextComponents, ...components }
}

interface MDXContentProps {
  children: ReactNode
}

// 스타일이 적용된 MDX 컴포넌트 생성
const createStyledMDXComponents = (): MDXComponents => {
  // 헤딩 컴포넌트
  const H1 = MDXTheme.CreateHeading(1)
  const H2 = MDXTheme.CreateHeading(2)
  const H3 = MDXTheme.CreateHeading(3)
  const H4 = MDXTheme.CreateHeading(4)
  const H5 = MDXTheme.CreateHeading(5)
  const H6 = MDXTheme.CreateHeading(6)

  return {
    h1: (props) => <H1 {...props} />,
    h2: (props) => <H2 {...props} />,
    h3: (props) => <H3 {...props} />,
    h4: (props) => <H4 {...props} />,
    h5: (props) => <H5 {...props} />,
    h6: (props) => <H6 {...props} />,

    // 링크
    a: (props) => <MDXTheme.WikiLink {...props} />,

    // 코드 블록
    pre: (props) => <MDXTheme.CodeBlock {...props} />,

    // 테이블
    table: (props) => (
      <MDXTheme.TableWrapper>
        <MDXTheme.StyledTable {...props} />
      </MDXTheme.TableWrapper>
    ),
    th: (props) => <MDXTheme.TableHeader {...props} />,
    td: (props) => <MDXTheme.TableCell {...props} />,

    // 이미지
    img: (props) => (
      <Image
        alt={props.alt || ""}
        src={props.src || ""}
        width={700}
        height={400}
        style={{ width: "100%", height: "auto" }}
      />
    ),
  }
}

export default function MDXContent({ children }: MDXContentProps) {
  // 이 컴포넌트는 클라이언트 컴포넌트이므로 안전하게 useTheme 훅을 사용할 수 있습니다
  useTheme() // 테마 컨텍스트 활성화

  // 스타일이 적용된 MDX 컴포넌트 생성
  const styledComponents = createStyledMDXComponents()

  // MDX 콘텐츠에 스타일이 적용된 컴포넌트 제공
  return (
    <MDXComponentsContext.Provider value={styledComponents}>
      <div className="mdx-content" style={{ maxWidth: "100%" }}>
        {children}
      </div>
    </MDXComponentsContext.Provider>
  )
}
