// src/components/layout/FolderExplorer.tsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styled from "styled-components"

// 폴더 구조 타입 정의
export interface FolderItem {
  id: string
  name: string
  type: "folder" | "file"
  path: string
  children?: FolderItem[]
}

interface FolderExplorerProps {
  folderStructure: FolderItem[]
  isOpen?: boolean
  onClose?: () => void
}

// 스타일드 컴포넌트 정의
const ExplorerContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 16rem;
  background-color: var(--color-background-paper);
  border-right: 1px solid var(--color-divider);
  z-index: 2000; /* Fixed z-index value */
  transition: transform 0.3s ease-in-out;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});

  @media (min-width: 1024px) {
    position: static;
    transform: none;
  }
`

const ExplorerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-divider);
`

const ExplorerTitle = styled.h3`
  font-weight: 600; /* semibold */
  font-size: 1.125rem; /* lg */
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;

  &:hover {
    color: var(--color-text-primary);
  }

  @media (min-width: 1024px) {
    display: none;
  }
`

const ExplorerContent = styled.div`
  padding: 0.5rem;
  overflow-y: auto;
  height: calc(100% - 4rem);
`

const FolderItemContainer = styled.div<{ $depth: number }>`
  padding-left: ${(props) => `calc(${props.$depth * 1}rem + 0.5rem)`};
`

const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-small);

  &:hover {
    background-color: var(--color-background-light);
  }
`

const FolderChildren = styled.div`
  padding-left: 1rem;
`

const FileLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-small);
  color: ${(props) =>
    props.$isActive
      ? "var(--color-primary-main)"
      : "var(--color-text-primary)"};
  background-color: ${(props) =>
    props.$isActive
      ? "rgba(var(--color-primary-main-rgb), 0.1)"
      : "transparent"};
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      !props.$isActive && "var(--color-background-light)"};
    text-decoration: none;
  }
`

const IconSpan = styled.span`
  margin-right: 0.5rem;
`

const FolderName = styled.span<{ $isFolder?: boolean }>`
  font-weight: ${(props) => (props.$isFolder ? "500" : "400")};
`

const MobileMenuButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100; /* Fixed z-index value */
  background-color: var(--color-background-paper);
  color: var(--color-text-primary);
  padding: 0.5rem;
  border-radius: var(--border-radius-medium);
  border: 1px solid var(--color-divider);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  @media (min-width: 1024px) {
    display: none;
  }
`

const FolderExplorer: React.FC<FolderExplorerProps> = ({
  folderStructure,
  isOpen = true,
  onClose,
}) => {
  const pathname = usePathname()
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({})

  // 폴더 펼치기/접기 토글
  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  // 재귀적으로 폴더 아이템 렌더링
  const renderFolderItem = (item: FolderItem, depth = 0) => {
    const isExpanded = expandedFolders[item.id] || false
    const isActive = pathname === item.path

    if (item.type === "folder") {
      return (
        <FolderItemContainer key={item.id} $depth={depth}>
          <FolderHeader onClick={() => toggleFolder(item.id)}>
            <IconSpan>{isExpanded ? "📂" : "📁"}</IconSpan>
            <FolderName $isFolder>{item.name}</FolderName>
          </FolderHeader>

          {isExpanded && item.children && (
            <FolderChildren>
              {item.children.map((child) => renderFolderItem(child, depth + 1))}
            </FolderChildren>
          )}
        </FolderItemContainer>
      )
    } else {
      console.log(item)
      return (
        <FolderItemContainer key={item.id} $depth={depth}>
          <FileLink href={item.path} $isActive={isActive}>
            <IconSpan>📄</IconSpan>
            <FolderName>{item.name}</FolderName>
          </FileLink>
        </FolderItemContainer>
      )
    }
  }

  return (
    <ExplorerContainer $isOpen={isOpen}>
      <ExplorerHeader>
        <ExplorerTitle>파일 탐색기</ExplorerTitle>
        {onClose && <CloseButton onClick={onClose}>✕</CloseButton>}
      </ExplorerHeader>

      <ExplorerContent>
        {folderStructure.map((item) => renderFolderItem(item))}
      </ExplorerContent>
    </ExplorerContainer>
  )
}

// 클라이언트 래퍼 컴포넌트
const ClientFolderExplorer: React.FC<{ folderStructure: FolderItem[] }> = ({
  folderStructure,
}) => {
  // 데스크톱에서는 기본적으로 열려있고, 모바일에서는 닫혀있도록 설정
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <MobileMenuButton onClick={() => setIsOpen(true)}>
        📁 메뉴
      </MobileMenuButton>

      <FolderExplorer
        folderStructure={folderStructure}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export default ClientFolderExplorer
