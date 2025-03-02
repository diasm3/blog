import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python"
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash"
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown"
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json"

// 모든 언어 등록
const registerLanguages = () => {
  SyntaxHighlighter.registerLanguage("javascript", javascript)
  SyntaxHighlighter.registerLanguage("typescript", typescript)
  SyntaxHighlighter.registerLanguage("python", python)
  SyntaxHighlighter.registerLanguage("bash", bash)
  SyntaxHighlighter.registerLanguage("markdown", markdown)
  SyntaxHighlighter.registerLanguage("json", json)
}

export { SyntaxHighlighter, registerLanguages }
