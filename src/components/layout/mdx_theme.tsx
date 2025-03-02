"use client"
import styled from "styled-components"

// ✅ 코드 블록 스타일 (다크모드 지원)
export const CodeBlock = styled.pre`
  position: relative;
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};

  & > code {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  /* 언어 태그 스타일 */
  &::before {
    content: attr(data-language);
    position: absolute;
    top: 8px;
    right: 16px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

// ✅ 위키 스타일 링크 (외부 링크 & 내부 링크 구분)
export const WikiLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.main};
  border-bottom: 1px dotted ${({ theme }) => theme.colors.primary.light};
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light}20;
  }
`

// ✅ 헤딩 컴포넌트 (앵커 링크 지원)
export const CreateHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  return styled[`h${level}`]`
    position: relative;
    scroll-margin-top: 80px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};

    /* 앵커 링크 스타일 */
    &:hover::before {
      content: "#";
      position: absolute;
      left: -24px;
      color: ${({ theme }) => theme.colors.text.secondary};
      opacity: 0.5;
      transition: opacity 0.2s ease-in-out;
    }
  `
}

// ✅ 체크박스 리스트 아이템 (Task List)
export const TaskListItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};

  input[type="checkbox"] {
    accent-color: ${({ theme }) => theme.colors.primary.main};
    transform: scale(1.2);
  }
`

// ✅ 테이블 스타일 (반응형 지원)
export const TableWrapper = styled.div`
  overflow-x: auto;
  margin: ${({ theme }) => theme.spacing(6)} 0;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.background.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing(2)};
  border: 1px solid ${({ theme }) => theme.colors.border};
`
