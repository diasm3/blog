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
  background-color: ${(props) => props.theme.colors.background.paper};
  border-right: 1px solid ${(props) => props.theme.colors.divider};
  z-index: ${(props) => props.theme.zIndex.drawer};
  transition: transform 0.3s ease-in-out;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    position: static;
    transform: none;
  }
`

const ExplorerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
`

const ExplorerTitle = styled.h3`
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
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
  border-radius: ${(props) => props.theme.borderRadius.small};

  &:hover {
    background-color: ${(props) => `${props.theme.colors.background.light}`};
  }
`

const FolderChildren = styled.div`
  padding-left: 1rem;
`

const FileLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.small};
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.primary.main
      : props.theme.colors.text.primary};
  background-color: ${(props) =>
    props.$isActive ? `${props.theme.colors.primary.main}10` : "transparent"};
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      !props.$isActive && `${props.theme.colors.background.light}`};
    text-decoration: none;
  }
`

const IconSpan = styled.span`
  margin-right: 0.5rem;
`

const FolderName = styled.span<{ $isFolder?: boolean }>`
  font-weight: ${(props) =>
    props.$isFolder
      ? props.theme.typography.fontWeight.medium
      : props.theme.typography.fontWeight.normal};
`

const MobileMenuButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: ${(props) => props.theme.zIndex.fab};
  background-color: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.primary};
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 1px solid ${(props) => props.theme.colors.divider};
  box-shadow: ${(props) => props.theme.shadows.md};
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
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
  const [isOpen, setIsOpen] = useState(false)

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
