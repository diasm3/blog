import styled from "styled-components"

export const PreviewContainer = styled.div`
  flex: 1;
  overflow: auto;
  background: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.primary};
  min-height: auto;
  padding: ${(props) => props.theme.spacing(2)};
  padding-left: ${(props) => props.theme.spacing(4)};
  padding-right: ${(props) => props.theme.spacing(4)};
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-family: ${(props) => props.theme.typography.fontFamily.sans};
  cursor: text;

  &:empty {
    min-height: ${(props) => props.theme.spacing(10)};
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }

  &:hover {
    cursor: text;
  }

  /* Markdown 스타일링 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${(props) => props.theme.spacing(6)};
    margin-bottom: ${(props) => props.theme.spacing(2)};
    color: ${(props) => props.theme.colors.text.primary};
  }

  h1 {
    font-size: ${(props) => props.theme.typography.fontSize["4xl"]};
    border-bottom: 1px solid ${(props) => props.theme.colors.grey[300]};
  }
  h2 {
    font-size: ${(props) => props.theme.typography.fontSize["3xl"]};
    border-bottom: 1px solid ${(props) => props.theme.colors.grey[300]};
  }

  p {
    line-height: ${(props) => props.theme.typography.lineHeight.relaxed};
    margin: ${(props) => props.theme.spacing(4)} 0;
  }

  code {
    background: ${(props) => props.theme.colors.background.light};
    padding: ${(props) => props.theme.spacing(1)};
    /* ${(props) => props.theme.spacing(2)}; */
    border-radius: ${(props) => props.theme.borderRadius.small};
    font-family: ${(props) => props.theme.typography.fontFamily.mono};
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }

  pre {
    margin: ${(props) => props.theme.spacing(4)} 0;
    padding: ${(props) => props.theme.spacing(4)};
    border-radius: ${(props) => props.theme.borderRadius.medium};
    overflow: auto;
    background: ${(props) => props.theme.colors.grey[100]};
  }

  blockquote {
    margin: ${(props) => props.theme.spacing(4)} 0;
    padding-left: ${(props) => props.theme.spacing(4)};
    border-left: 4px solid ${(props) => props.theme.colors.grey[300]};
    color: ${(props) => props.theme.colors.text.hint};
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
    border: 1px solid ${(props) => props.theme.colors.grey[300]};
    padding: ${(props) => props.theme.spacing(2)};
  }

  th {
    background: ${(props) => props.theme.colors.grey[100]};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: ${(props) => props.theme.colors.info.main};
    text-decoration: none;
    padding: ${(props) => props.theme.spacing(0.5)}
      ${(props) => props.theme.spacing(1)};
    border-radius: ${(props) => props.theme.borderRadius.small};
    transition: ${(props) => props.theme.transitions.default};

    &:hover {
      background-color: ${(props) => props.theme.colors.info.main}11;
      text-decoration: underline;
    }

    /* 위키 링크 스타일 */
    &[data-wiki-link] {
      /* 문서가 있는 위키 링크 */
      &[data-exists="true"] {
        color: ${(props) => props.theme.colors.primary.main};
        border-bottom: 1px solid ${(props) => props.theme.colors.primary.main};

        &:hover {
          background-color: ${(props) => props.theme.colors.primary.main}11;
          text-decoration: none;
        }
      }

      /* 문서가 없는 위키 링크 */
      &[data-exists="false"] {
        color: ${(props) => props.theme.colors.error.main};
        border-bottom: 1px dashed ${(props) => props.theme.colors.error.main};
        opacity: 0.7;

        &:hover {
          background-color: ${(props) => props.theme.colors.error.main}11;
          opacity: 1;
          text-decoration: none;
        }
      }
    }
  }
`

export const AddBlockButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
  width: 30%;
  padding: ${(props) => props.theme.spacing(2)};
  border: 1px dashed ${(props) => props.theme.colors.grey[300]};
  background: transparent;
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  cursor: pointer;
  margin: ${(props) => `${props.theme.spacing(5)} ${props.theme.spacing(2)}`};

  &:hover {
    background: ${(props) => props.theme.colors.grey[100]};
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

export const BlocksContainer = styled.div`
  flex: 1;
  height: 100vh;
  padding: 20px;
`
export const EditorContainer = styled.div<{
  $sidebarVisible?: boolean
  $rightPanelPinned?: boolean
}>`
  position: relative;
  display: flex;
  height: calc(100vh - 60px);
  margin-top: 60px;
  width: 100%;
  /* background: ${(props) => props.theme.colors.background.paper}; */
  color: ${(props) => props.theme.colors.text.primary};
  padding-right: ${(props) =>
    props.$rightPanelPinned
      ? props.theme.spacing(100)
      : props.theme.spacing(0)};
  transition: ${(props) => props.theme.transitions.default};
  z-index: ${(props) => props.theme.zIndex.content};

  @media (max-width: 768px) {
    padding-right: 0;
  }
`

export const MainContentContainer = styled.div<{
  $sidebarVisible: boolean
  $rightPanelVisible: boolean
  $rightPanelPinned: boolean
}>`
  flex: 1;
  display: flex;
  /* margin-top: ${(props) => props.theme.spacing(10)}; */
  margin-left: ${(props) =>
    props.$sidebarVisible
      ? props.theme.spacing(62.5)
      : // "250px"
        "0"}; // 250px equivalent
  margin-right: ${(props) =>
    props.$rightPanelVisible && props.$rightPanelPinned
      ? props.theme.spacing(100)
      : "0"}; // 400px equivalent
  transition: ${(props) => props.theme.transitions.default};
  overflow-y: auto;
  overflow-x: hidden;
  z-index: ${(props) => props.theme.zIndex.content};
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(10)};

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: ${(props) => props.theme.spacing(5)};
    padding: ${(props) => props.theme.spacing(2)};
  }
`

export const SidebarContainer = styled.div<{
  $isDark?: boolean
  $isVisible: boolean
}>`
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  width: ${(props) => props.theme.spacing(57.5)}; // 230px equivalent
  background: ${(props) => props.theme.colors.background.paper};
  border-right: 1px solid ${(props) => props.theme.colors.divider};
  transition: ${(props) => props.theme.transitions.default};
  transform: translateX(${(props) => (props.$isVisible ? "0" : "-100%")});
  z-index: ${(props) => props.theme.zIndex.sidebar};

  @media (max-width: 768px) {
    width: 85%;
    max-width: ${(props) => props.theme.spacing(75)}; // 300px equivalent
  }
`

export const RightPanel = styled.div<{
  $isDark?: boolean
  $isVisible: boolean
  $isPinned: boolean
}>`
  position: ${(props) => (props.$isPinned ? "absolute" : "fixed")};
  top: ${(props) => (props.$isPinned ? "0" : "60px")};
  right: ${(props) => {
    if (props.$isPinned) return "0"
    return props.$isVisible ? "0" : `-${props.theme.spacing(100)}` // 400px equivalent
  }};
  height: calc(100vh - 60px);
  width: ${(props) => props.theme.spacing(100)}; // 400px equivalent
  background: ${(props) => props.theme.colors.background.paper};
  border-left: 1px solid ${(props) => props.theme.colors.divider};
  transition: ${(props) => props.theme.transitions.default};
  z-index: ${(props) =>
    props.$isPinned
      ? props.theme.zIndex.content
      : props.theme.zIndex.rightPanel};
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: fixed;
    width: 85%;
    max-width: ${(props) => props.theme.spacing(100)}; // 400px equivalent
    right: ${(props) => (props.$isVisible ? "0" : "-100%")};
  }
`

export const ToggleButton = styled.button<{ $isDark?: boolean }>`
  position: fixed;
  left: ${(props) => props.theme.spacing(2)};
  top: calc(50% + 30px);
  transform: translateY(-50%);
  width: ${(props) => props.theme.spacing(8)};
  height: ${(props) => props.theme.spacing(16)};
  background: ${(props) => props.theme.colors.background.paper};
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.theme.zIndex.fab};
  transition: ${(props) => props.theme.transitions.default};
  box-shadow: ${(props) => props.theme.shadows.sm};

  &:hover {
    background: ${(props) => props.theme.colors.background.contrast};
  }

  @media (max-width: 768px) {
    top: auto;
    bottom: ${(props) => props.theme.spacing(4)};
    left: ${(props) => props.theme.spacing(4)};
    width: ${(props) => props.theme.spacing(12)};
    height: ${(props) => props.theme.spacing(12)};
    border-radius: ${(props) => props.theme.borderRadius.full};
  }
`

export const RightToggleButton = styled(ToggleButton)`
  left: auto;
  right: ${(props) => props.theme.spacing(2)};

  @media (max-width: 768px) {
    bottom: ${(props) => props.theme.spacing(4)};
    right: ${(props) => props.theme.spacing(4)};
  }
`

export const TabContainer = styled.div<{ $isDark?: boolean }>`
  display: flex;
  gap: ${(props) => props.theme.spacing(0.25)};
  padding: ${(props) => props.theme.spacing(2)};
  z-index: ${(props) => props.theme.zIndex.drawer};
  background: ${(props) => props.theme.colors.background.paper};
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  flex-shrink: 0;
`

export const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  // padding: ${(props) => props.theme.spacing(4)};
  background: ${(props) => props.theme.colors.background.paper};
  z-index: ${(props) => props.theme.zIndex.content};

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

export const PinButton = styled.button<{
  $isDark?: boolean
  $isPinned: boolean
}>`
  background: none;
  border: none;
  padding: ${(props) => props.theme.spacing(2)};
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.primary};
  opacity: ${(props) => (props.$isPinned ? 1 : 0.5)};
  transition: ${(props) => props.theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.theme.zIndex.fab};

  &:hover {
    opacity: 1;
  }

  svg {
    transform: rotate(${(props) => (props.$isPinned ? "45deg" : "0deg")});
    transition: ${(props) => props.theme.transitions.default};
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const Backdrop = styled.div<{ $isVisible: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isVisible ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.theme.colors.background.contrast}80;
    z-index: ${(props) => props.theme.zIndex.overlay};
  }
`

export const Section = styled.div<{ $width?: string }>`
  // flex: ${(props) => props.$width || "1"};
  // display: flex;
  // flex-direction: column;
  // min-width: 0; // 자식 요소가 너무 커지는 것을 방지
  height: 100vh;
  overflow: auto;
  padding: 20px;
  border-left: 1px solid ${(props) => props.theme.colors.divider};

  @media (max-width: 768px) {
    display: none; // 모바일에서 숨김
  }
`

//blocktypemenu

export const BlockTypeMenu = styled.div`
  position: absolute;
  left: 32px;
  top: 0;
  background: ${(props) => props.theme.colors.background.paper};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.small};
  padding: ${(props) => props.theme.spacing(1)};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  z-index: ${(props) => props.theme.zIndex.dropdown};
  box-shadow: ${(props) => props.theme.shadows.sm};
  min-width: 150px;
`

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(2)};
  border: none;
  background: none;
  color: ${(props) => props.theme.colors.text.primary};
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  transition: ${(props) => props.theme.transitions.default};

  svg {
    flex-shrink: 0; // 아이콘 크기 유지
  }

  &:hover {
    background: ${(props) => props.theme.colors.background.light};
  }
`

// ----------

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
