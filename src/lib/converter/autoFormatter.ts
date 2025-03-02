import { languages } from "@codemirror/language-data"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { markdown } from "@codemirror/lang-markdown"
import { sql } from "@codemirror/lang-sql"
import { xml } from "@codemirror/lang-xml"
import { css } from "@codemirror/lang-css"
import { json } from "@codemirror/lang-json"
import { rust } from "@codemirror/lang-rust"
import { java } from "@codemirror/lang-java"
import { cpp } from "@codemirror/lang-cpp"
import { php } from "@codemirror/lang-php"
import { StreamLanguage } from "@codemirror/language"
import { Extension } from "@codemirror/state"

interface CodeBlock {
  language: string
  code: string
  start: number
  end: number
}

export class AutoCodeFormatter {
  private static readonly codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g
  private static readonly languageAliases: Record<string, string> = {
    js: "javascript",
    py: "python",
    rb: "ruby",
    ts: "typescript",
    jsx: "javascript",
    tsx: "typescript",
    yml: "yaml",
    sh: "shell",
    bash: "shell",
    html: "xml",
    htm: "xml",
    vue: "xml",
    md: "markdown",
  }

  private static readonly languageExtensions: Record<string, () => Extension> =
    {
      javascript: () => javascript(),
      typescript: () => javascript({ typescript: true }),
      jsx: () => javascript({ jsx: true }),
      tsx: () => javascript({ jsx: true, typescript: true }),
      python: () => python(),
      markdown: () => markdown(),
      sql: () => sql(),
      xml: () => xml(),
      css: () => css(),
      json: () => json(),
      rust: () => rust(),
      java: () => java(),
      cpp: () => cpp(),
      php: () => php(),
    }

  static detectCodeBlocks(content: string): CodeBlock[] {
    const blocks: CodeBlock[] = []
    let match

    // 코드 블록 찾기
    while ((match = this.codeBlockRegex.exec(content)) !== null) {
      const [fullMatch, lang, code] = match
      const language = this.normalizeLanguage(lang.toLowerCase())

      blocks.push({
        language,
        code: code.trim(),
        start: match.index,
        end: match.index + fullMatch.length,
      })
    }

    // 인라인 코드 감지
    const inlineCodeRegex = /`([^`]+)`/g
    while ((match = inlineCodeRegex.exec(content)) !== null) {
      const code = match[1]
      const language = this.detectLanguage(code)

      blocks.push({
        language,
        code: code.trim(),
        start: match.index,
        end: match.index + match[0].length,
      })
    }

    return blocks
  }

  static getLanguageExtension(language: string): Extension | null {
    const extensionCreator = this.languageExtensions[language]
    return extensionCreator ? extensionCreator() : null
  }

  private static normalizeLanguage(lang: string): string {
    return this.languageAliases[lang] || lang
  }

  //   private static detectLanguage(code: string): string {
  //     // 간단한 언어 감지 로직
  //     if (
  //       code.includes("function") ||
  //       code.includes("=>") ||
  //       code.includes("var") ||
  //       code.includes("let") ||
  //       code.includes("const")
  //     ) {
  //       return "javascript"
  //     }
  //     if (
  //       code.includes("def ") ||
  //       code.includes("import ") ||
  //       code.includes("print(")
  //     ) {
  //       return "python"
  //     }
  //     if (code.includes("<") && code.includes(">")) {
  //       return "xml"
  //     }
  //     if (code.includes("{") && code.includes("}") && code.includes(":")) {
  //       return "json"
  //     }
  //     return "text"
  //   }

  static formatDocument(content: string): string {
    const blocks = this.detectCodeBlocks(content)
    let formattedContent = content

    // 전체 내용이 코드 블록인지 확인
    const isEntireContentCodeBlock = blocks.some(
      (block) => block.code.trim() === content.trim()
    )

    // 이미 코드 블록이면 포맷팅하지 않음
    if (isEntireContentCodeBlock) {
      return content
    }

    // 새로운 코드 블록 감지
    const detectedLanguage = this.detectLanguage(content)
    if (detectedLanguage !== "text" && !content.startsWith("```")) {
      formattedContent = `\`\`\`${detectedLanguage}\n${content}\n\`\`\``
    }

    return formattedContent
  }
  static detectLanguage(code: string): string {
    // 기존 언어 감지 로직 강화
    code = code.trim()

    // JavaScript/TypeScript
    if (
      code.includes("import ") ||
      code.includes("export ") ||
      code.includes("function") ||
      code.includes("=>") ||
      code.includes("const ") ||
      code.includes("let ") ||
      code.includes("class ") ||
      code.includes("interface ")
    ) {
      if (
        code.includes(": ") ||
        code.includes("<T>") ||
        code.includes("interface ") ||
        code.includes("type ")
      ) {
        return "typescript"
      }
      return "javascript"
    }

    // Python
    if (
      code.includes("def ") ||
      code.includes("import ") ||
      code.includes("class ") ||
      code.includes("print(") ||
      code.includes("if __name__ == ")
    ) {
      return "python"
    }

    // HTML
    if (
      code.includes("<!DOCTYPE") ||
      code.includes("<html") ||
      (code.includes("<") && code.includes("</") && code.includes(">"))
    ) {
      return "html"
    }

    // CSS
    if (
      code.includes("{") &&
      code.includes("}") &&
      code.includes(":") &&
      code.includes(";")
    ) {
      return "css"
    }

    // JSON
    if (
      (code.startsWith("{") && code.endsWith("}")) ||
      (code.startsWith("[") && code.endsWith("]"))
    ) {
      try {
        JSON.parse(code)
        return "json"
      } catch (e) {
        // Not valid JSON
      }
    }

    // Markdown
    if (
      code.includes("#") ||
      code.includes("- ") ||
      code.includes("* ") ||
      code.includes("[") ||
      code.includes("](")
    ) {
      return "markdown"
    }

    return "text"
  }

  //   static formatDocument(content: string) {
  //     const blocks = this.detectCodeBlocks(content)
  //     let formattedContent = content

  //     // 뒤에서부터 처리하여 인덱스 변화 방지
  //     for (let i = blocks.length - 1; i >= 0; i--) {
  //       const block = blocks[i]
  //       const extension = this.getLanguageExtension(block.language)

  //       if (extension) {
  //         // 코드 블록 포맷팅
  //         formattedContent =
  //           formattedContent.substring(0, block.start) +
  //           `\`\`\`${block.language}\n${block.code}\n\`\`\`` +
  //           formattedContent.substring(block.end)
  //       }
  //     }

  //     return formattedContent
  //   }
}
