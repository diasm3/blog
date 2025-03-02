import { createGlobalStyle, DefaultTheme } from "styled-components"

export const zIndex = {
  hide: -1,
  base: 0,
  content: 1,
  overlay: 100,
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 2000,
  sidebar: 2100,
  rightPanel: 2200,
  dropdown: 2300,
  modal: 3000,
  snackbar: 3100,
  toast: 3200,
  tooltip: 3300,
  popover: 4000,
  notification: 4100,
  loading: 4200,
  alert: 4300,
} as const

// 공통 속성들
const commonThemeProps = {
  spacing: (factor: number) => `${factor * 0.25}rem`,
  borderRadius: {
    small: "0.25rem",
    medium: "0.5rem",
    large: "1rem",
    full: "9999px",
    pill: "2rem",
  },
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      display: "Georgia, serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    outline: "0 0 0 3px rgba(59, 130, 246, 0.5)",
  },
  transitions: {
    default: "all 0.2s ease-in-out",
    fast: "all 0.1s ease-in-out",
    slow: "all 0.3s ease-in-out",
    bounce: "all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    spring: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  zIndex,
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  layout: {
    headerHeight: "60px",
    sidebarWidth: "250px",
    rightPanelWidth: "300px",
    maxWidth: "1200px",
    contentPadding: "2rem",
  },
}

export const lightTheme: DefaultTheme = {
  ...commonThemeProps,
  colors: {
    primary: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6B7280",
      light: "#9CA3AF",
      dark: "#4B5563",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F3F4F6",
      paper: "#FFFFFF",
      contrast: "#1F2937",
      light: "#FFFFFF",
      dark: "#E5E7EB",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
      disabled: "#9CA3AF",
      hint: "#D1D5DB",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    border: "#E5E7EB",
  },
}

export const darkTheme: DefaultTheme = {
  ...commonThemeProps,
  colors: {
    primary: {
      main: "#60A5FA",
      light: "#93C5FD",
      dark: "#2563EB",
      contrastText: "#000000",
    },
    secondary: {
      main: "#9CA3AF",
      light: "#D1D5DB",
      dark: "#6B7280",
      contrastText: "#000000",
    },
    background: {
      default: "#111827",
      paper: "#1F2937",
      contrast: "#F3F4F6",
      light: "#374151",
      dark: "#0F172A",
      overlay: "rgba(0, 0, 0, 0.75)",
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#E5E7EB",
      disabled: "#6B7280",
      hint: "#9CA3AF",
    },
    error: {
      main: "#F87171",
      light: "#FCA5A5",
      dark: "#DC2626",
      contrastText: "#000000",
    },
    warning: {
      main: "#FBBF24",
      light: "#FCD34D",
      dark: "#D97706",
      contrastText: "#000000",
    },
    info: {
      main: "#60A5FA",
      light: "#93C5FD",
      dark: "#2563EB",
      contrastText: "#000000",
    },
    success: {
      main: "#34D399",
      light: "#6EE7B7",
      dark: "#059669",
      contrastText: "#000000",
    },
    grey: {
      50: "#111827",
      100: "#1F2937",
      200: "#374151",
      300: "#4B5563",
      400: "#6B7280",
      500: "#9CA3AF",
      600: "#D1D5DB",
      700: "#E5E7EB",
      800: "#F3F4F6",
      900: "#F9FAFB",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    border: "#374151",
  },
}

export const GlobalStyle = createGlobalStyle<{ $isDarkMode: boolean }>`
  html, body {
    margin: 0;
    padding: 0;
    height: 100vh;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${lightTheme.typography.fontFamily.sans};
    line-height: ${lightTheme.typography.lineHeight.normal};
    color: ${(props) =>
      props.$isDarkMode
        ? darkTheme.colors.text.primary
        : lightTheme.colors.text.primary};
    background-color: ${(props) =>
      props.$isDarkMode
        ? darkTheme.colors.background.default
        : lightTheme.colors.background.default};
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  html.dark body {
    color: ${darkTheme.colors.text.primary};
    background-color: ${darkTheme.colors.background.default};
  }

  /* 스크롤바 스타일링 */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${(props) =>
      props.$isDarkMode
        ? `${props.theme.colors.grey[600]} ${props.theme.colors.background.dark}`
        : `${props.theme.colors.grey[300]} ${props.theme.colors.background.light}`};
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$isDarkMode
        ? props.theme.colors.background.dark
        : props.theme.colors.background.light};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.$isDarkMode
        ? props.theme.colors.grey[600]
        : props.theme.colors.grey[300]};
    border-radius: 4px;
    border: 2px solid transparent;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) =>
      props.$isDarkMode
        ? props.theme.colors.grey[500]
        : props.theme.colors.grey[400]};
  }

  a {
    color: ${(props) =>
      props.$isDarkMode
        ? darkTheme.colors.primary.main
        : lightTheme.colors.primary.main};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
  }

  ::selection {
    background-color: ${(props) =>
      props.$isDarkMode
        ? darkTheme.colors.primary.main
        : lightTheme.colors.primary.main};
    color: ${(props) =>
      props.$isDarkMode
        ? darkTheme.colors.primary.contrastText
        : lightTheme.colors.primary.contrastText};
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
  }
`
