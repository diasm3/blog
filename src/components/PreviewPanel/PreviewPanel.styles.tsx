// src/components/VikiEditor/PreviewPanel/styles.ts
import styled from "styled-components"

export const PreviewContainer = styled.div<{ $isDark?: boolean }>`
  flex: 1;
  overflow: auto;
  background: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.primary};
  min-height: auto;
  padding: ${(props) => props.theme.spacing(2)};
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-family: ${(props) => props.theme.typography.fontFamily.sans};
  cursor: text;

  &:empty {
    min-height: ${(props) => props.theme.spacing(10)}; // 40px equivalent
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }

  // Markdown 스타일링
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${(props) => props.theme.spacing(6)};
    margin-bottom: ${(props) => props.theme.spacing(2)};
    color: ${(props) => props.theme.colors.text.primary};
    font-family: ${(props) => props.theme.typography.fontFamily.sans};
    font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  }

  h1 {
    font-size: ${(props) => props.theme.typography.fontSize["4xl"]};
    border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  }

  h2 {
    font-size: ${(props) => props.theme.typography.fontSize["3xl"]};
    border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  }

  h3 {
    font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
  }

  p {
    line-height: ${(props) => props.theme.typography.lineHeight.relaxed};
    margin: ${(props) => props.theme.spacing(4)} 0;
  }

  code {
    background: ${(props) => props.theme.colors.background.contrast}11;
    padding: ${(props) =>
      `${props.theme.spacing(0.5)} ${props.theme.spacing(1)}`};
    border-radius: ${(props) => props.theme.borderRadius.small};
    font-family: ${(props) => props.theme.typography.fontFamily.mono};
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }

  pre {
    margin: ${(props) => props.theme.spacing(4)} 0;
    padding: ${(props) => props.theme.spacing(4)};
    border-radius: ${(props) => props.theme.borderRadius.medium};
    overflow: auto;
  }

  blockquote {
    margin: ${(props) => props.theme.spacing(4)} 0;
    padding-left: ${(props) => props.theme.spacing(4)};
    border-left: 4px solid ${(props) => props.theme.colors.divider};
    color: ${(props) => props.theme.colors.text.secondary};
  }

  ul,
  ol {
    padding-left: ${(props) => props.theme.spacing(8)};
    margin: ${(props) => props.theme.spacing(4)} 0;
  }

  li {
    margin: ${(props) => props.theme.spacing(2)} 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: ${(props) => props.theme.spacing(4)} 0;
  }

  th,
  td {
    border: 1px solid ${(props) => props.theme.colors.divider};
    padding: ${(props) => props.theme.spacing(2)};
  }

  th {
    background: ${(props) => props.theme.colors.background.contrast}11;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${(props) => props.theme.borderRadius.medium};
  }

  a {
    color: ${(props) => props.theme.colors.primary.main};
    text-decoration: none;
    transition: ${(props) => props.theme.transitions.default};

    &:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.colors.primary.dark};
    }
  }
`

export const TocWrapper = styled.div`
  padding: ${(props) => props.theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
`

export const TocLink = styled.a<{ $level: number }>`
  padding: ${(props) => props.theme.spacing(1.5)};
  padding-left: ${(props) => props.theme.spacing(props.$level * 4)};
  color: ${(props) => props.theme.colors.text.primary};
  text-decoration: none;
  font-size: ${(props) => props.theme.typography.fontSize.base};
  line-height: ${(props) => props.theme.typography.lineHeight.normal};
  border-radius: ${(props) => props.theme.borderRadius.small};
  transition: ${(props) => props.theme.transitions.default};

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
    background: ${(props) => props.theme.colors.primary.main}0a;
  }
`

export const EmptyToc = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  font-style: italic;
  padding: ${(props) => props.theme.spacing(4)};
  text-align: center;
`

// Tab related styles
export const TabContainer = styled.div<{ $isDark?: boolean }>`
  display: flex;
  gap: ${(props) => props.theme.spacing(0.25)};
  padding: ${(props) => props.theme.spacing(2)};
  background: ${(props) => props.theme.colors.background.paper};
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  z-index: ${(props) => props.theme.zIndex.drawer};
`

export const Tab = styled.button<{ $active?: boolean; $isDark?: boolean }>`
  padding: ${(props) => `${props.theme.spacing(2)} ${props.theme.spacing(4)}`};
  background: ${(props) =>
    props.$active ? props.theme.colors.primary.main + "11" : "transparent"};
  color: ${(props) => props.theme.colors.text.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  cursor: pointer;
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) =>
    props.$active
      ? props.theme.typography.fontWeight.medium
      : props.theme.typography.fontWeight.normal};
  transition: ${(props) => props.theme.transitions.default};

  &:hover {
    background: ${(props) => props.theme.colors.primary.main}11;
  }
`

export const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing(4)};
  background: ${(props) => props.theme.colors.background.paper};

  &::-webkit-scrollbar {
    width: ${(props) => props.theme.spacing(2)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey[300]};
    border-radius: ${(props) => props.theme.borderRadius.small};
    border: 2px solid transparent;
  }
`
