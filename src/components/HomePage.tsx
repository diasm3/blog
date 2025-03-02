"use client"

import React from "react"
import Link from "next/link"
import styled from "styled-components"

export default function HomePage() {
  return (
    <Container>
      <Title>vimwiki 스타일 MDX 블로그</Title>
      <Description>
        Markdown, React 컴포넌트, vimwiki 스타일 링크를 결합한 개인 지식 관리
        시스템입니다.
      </Description>

      <ButtonGroup>
        <Link href="/blog" passHref legacyBehavior>
          <Button>블로그 보기</Button>
        </Link>
        <Link href="/wiki" passHref legacyBehavior>
          <SecondaryButton>위키 보기</SecondaryButton>
        </Link>
      </ButtonGroup>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
`

const Button = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background-color: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.primary.contrastText};
  text-decoration: none;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  transition: ${(props) => props.theme.transitions.default};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
    text-decoration: none;
  }
`

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.primary.main};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.main}20;
  }
`
