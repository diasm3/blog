'use client'

import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 로컬 스토리지에서 설정 확인
    const storedMode = localStorage.getItem('darkMode');
    
    // 설정이 없으면 시스템 환경설정 사용
    if (storedMode !== null) {
      setIsDarkMode(storedMode === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // HTML 태그에 dark 클래스 추가/제거
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 설정 저장
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return { isDarkMode, toggleDarkMode, mounted };
};
