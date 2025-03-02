import type { NextConfig } from "next"
import createMDX from "@next/mdx"

// ✅ `require()`를 사용하여 플러그인 불러오기
// const remarkGfm = require("remark-gfm")
// const remarkMdxFrontmatter = require("remark-mdx-frontmatter")
// const remarkMath = require("remark-math")
// const remarkBreaks = require("remark-breaks")
// const remarkToc = require("remark-toc")
// const remarkFootnotes = require("remark-footnotes")

// const rehypeSlug = require("rehype-slug")
// const rehypeAutolinkHeadings = require("rehype-autolink-headings")
// const rehypeHighlight = require("rehype-highlight")
// const rehypeKatex = require("rehype-katex")

// ✅ Next.js 기본 설정
const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
}

// ✅ MDX 설정 적용 (문자열로 플러그인 입력)
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      [
        // @ts-ignore 타입 경고 무시
        "remarkGfm",
        "remarkMdxFrontmatter",
        "remarkMath",
        "remarkBreaks",
        "remarkToc",
        "remarkFootnotes",
      ],
    ],
    rehypePlugins: [
      [
        // @ts-ignore 타입 경고 무시
        "rehype-slug",
        "rehype-autolink-headings",
        "rehype-highlight",
        "rehype-katex",
        { strict: true, throwOnError: true },
      ],
    ],
  },
})

// ✅ Next.js 설정과 MDX 설정 병합 후 내보내기
export default withMDX(nextConfig)
