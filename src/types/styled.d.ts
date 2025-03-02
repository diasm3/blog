import 'styled-components';
import { zIndex } from '../styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      background: {
        default: string;
        paper: string;
        contrast: string;
        light: string;
        dark: string;
        overlay: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        hint: string;
      };
      error: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      warning: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      info: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      success: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      grey: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      divider: string;
      border: string;
    };
    spacing: (factor: number) => string;
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      full: string;
      pill: string;
    };
    typography: {
      fontFamily: {
        sans: string;
        mono: string;
        display: string;
      };
      fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
        '6xl': string;
      };
      fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
        black: number;
      };
      lineHeight: {
        none: number;
        tight: number;
        snug: number;
        normal: number;
        relaxed: number;
        loose: number;
      };
    };
    shadows: {
      none: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      inner: string;
      outline: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
      bounce: string;
      spring: string;
    };
    zIndex: typeof zIndex;
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    layout: {
      headerHeight: string;
      sidebarWidth: string;
      rightPanelWidth: string;
      maxWidth: string;
      contentPadding: string;
    };
  }
}
