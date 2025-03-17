"use client"

import React, { ReactNode, useState } from "react"
import styled from "styled-components"
import ClientFolderExplorer, { FolderItem } from "./FolderExplorer"
import { useDarkMode } from "@/hooks/useDarkMode"

interface MainLayoutProps {
  children: ReactNode
  folderStructure: FolderItem[]
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-background-paper);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 60px;
`

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
`

const ThemeToggleButton = styled.button`
  background-color: var(--color-background-paper);
  color: var(--color-text-primary);
  border: 1px solid var(--color-divider);
  border-radius: var(--border-radius-medium);
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-background-light);
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: 16rem;
  flex-shrink: 0;
  background-color: var(--color-background-paper);
  border-right: 1px solid var(--color-divider);
  overflow-y: auto;
  height: calc(100vh - 60px);
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 2000;
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: var(--shadow-md);
    width: ${(props) => (props.$isOpen ? "16rem" : "0")};
  }
`

const MobileToggleButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  left: ${(props) => (props.$isOpen ? "16rem" : "0")};
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--color-primary-main);
  color: white;
  border: none;
  border-top-right-radius: var(--border-radius-medium);
  border-bottom-right-radius: var(--border-radius-medium);
  padding: 0.75rem 0.5rem;
  cursor: pointer;
  z-index: 2100;
  box-shadow: var(--shadow-md);
  transition: left 0.3s ease-in-out;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  overflow-x: hidden;
  height: calc(100vh - 60px);
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

export default function MainLayout({
  children,
  folderStructure,
}: MainLayoutProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <LayoutContainer>
      <Header>
        <HeaderTitle>Viki Blog</HeaderTitle>
        <ThemeToggleButton onClick={toggleDarkMode}>
          {isDarkMode ? "🌞 라이트 모드" : "🌙 다크 모드"}
        </ThemeToggleButton>
      </Header>
      <ContentContainer>
        <SidebarContainer $isOpen={isSidebarOpen}>
          <ClientFolderExplorer folderStructure={folderStructure} />
        </SidebarContainer>
        <MobileToggleButton $isOpen={isSidebarOpen} onClick={toggleSidebar}>
          {isSidebarOpen ? "◀" : "▶"}
        </MobileToggleButton>
        <MainContent>{children}</MainContent>
      </ContentContainer>
    </LayoutContainer>
  )
}
