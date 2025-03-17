import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

// Import languages
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python"
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash"
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown"
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json"
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx"
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx"
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css"
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss"
import html from "react-syntax-highlighter/dist/cjs/languages/prism/markup"
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java"
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c"
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp"
import csharp from "react-syntax-highlighter/dist/cjs/languages/prism/csharp"
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go"
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust"
import yaml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml"
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql"
import diff from "react-syntax-highlighter/dist/cjs/languages/prism/diff"
import shell from "react-syntax-highlighter/dist/cjs/languages/prism/shell-session"

// 모든 언어 등록
const registerLanguages = () => {
  // Basic languages
  SyntaxHighlighter.registerLanguage("javascript", javascript)
  SyntaxHighlighter.registerLanguage("js", javascript)
  SyntaxHighlighter.registerLanguage("typescript", typescript)
  SyntaxHighlighter.registerLanguage("ts", typescript)
  SyntaxHighlighter.registerLanguage("python", python)
  SyntaxHighlighter.registerLanguage("py", python)
  SyntaxHighlighter.registerLanguage("bash", bash)
  SyntaxHighlighter.registerLanguage("sh", bash)
  SyntaxHighlighter.registerLanguage("markdown", markdown)
  SyntaxHighlighter.registerLanguage("md", markdown)
  SyntaxHighlighter.registerLanguage("json", json)

  // Web development
  SyntaxHighlighter.registerLanguage("jsx", jsx)
  SyntaxHighlighter.registerLanguage("tsx", tsx)
  SyntaxHighlighter.registerLanguage("css", css)
  SyntaxHighlighter.registerLanguage("scss", scss)
  SyntaxHighlighter.registerLanguage("html", html)

  // Other programming languages
  SyntaxHighlighter.registerLanguage("java", java)
  SyntaxHighlighter.registerLanguage("c", c)
  SyntaxHighlighter.registerLanguage("cpp", cpp)
  SyntaxHighlighter.registerLanguage("csharp", csharp)
  SyntaxHighlighter.registerLanguage("cs", csharp)
  SyntaxHighlighter.registerLanguage("go", go)
  SyntaxHighlighter.registerLanguage("rust", rust)
  SyntaxHighlighter.registerLanguage("yaml", yaml)
  SyntaxHighlighter.registerLanguage("yml", yaml)
  SyntaxHighlighter.registerLanguage("sql", sql)

  // Special formats
  SyntaxHighlighter.registerLanguage("diff", diff)
  SyntaxHighlighter.registerLanguage("shell", shell)
}

// Export without auto-initialization to avoid SSR issues
export { SyntaxHighlighter, oneDark, registerLanguages }
