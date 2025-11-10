// Adx402 Brand Configuration - Centralized theme system with light/dark mode support

export interface ColorPalette {
  // Primary colors
  primary: string;
  secondary: string;

  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Neutral colors
  background: string;
  surface: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
}

export interface TypographyConfig {
  fontFamily: {
    sans: string[];
    mono: string[];
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
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface SpacingConfig {
  spacing: {
    px: string;
    0: string;
    0.5: string;
    1: string;
    1.5: string;
    2: string;
    2.5: string;
    3: string;
    3.5: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
    40: string;
    48: string;
    56: string;
    64: string;
  };
}

export interface BorderRadiusConfig {
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
  };
}

export interface BrandConfig {
  name: string;
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  typography: TypographyConfig;
  spacing: SpacingConfig;
  borderRadius: BorderRadiusConfig;
}

export const brandConfig: BrandConfig = {
  name: "Adx402",
  colors: {
    light: {
      primary: "#2563eb",      // Blue-600
      secondary: "#059669",    // Emerald-600
      success: "#10b981",      // Emerald-500
      warning: "#f59e0b",      // Amber-500
      error: "#ef4444",        // Red-500
      info: "#3b82f6",         // Blue-500
      background: "#ffffff",
      surface: "#f8f9fa",
      border: "#e5e7eb",
      text: "#111827",
      textSecondary: "#6b7280",
      textMuted: "#9ca3af",
    },
    dark: {
      primary: "#3b82f6",      // Blue-500 (lighter for dark)
      secondary: "#10b981",    // Emerald-500
      success: "#34d399",      // Emerald-400
      warning: "#fbbf24",      // Amber-400
      error: "#f87171",        // Red-400
      info: "#60a5fa",         // Blue-400
      background: "#0f172a",   // Slate-900
      surface: "#1e293b",      // Slate-800
      border: "#334155",       // Slate-700
      text: "#f1f5f9",         // Slate-100
      textSecondary: "#cbd5e1", // Slate-300
      textMuted: "#94a3b8",    // Slate-400
    },
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
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
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.625",
    },
  },
  spacing: {
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem",
      40: "10rem",
      48: "12rem",
      56: "14rem",
      64: "16rem",
    },
  },
  borderRadius: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      full: "9999px",
    },
  },
};

// Utility function to generate CSS custom properties
export function generateThemeCSS(mode: 'light' | 'dark'): string {
  const colors = brandConfig.colors[mode];
  const typography = brandConfig.typography;
  const spacing = brandConfig.spacing;
  const borderRadius = brandConfig.borderRadius;

  return `
    :root {
      /* Colors */
      --color-primary: ${colors.primary};
      --color-secondary: ${colors.secondary};
      --color-success: ${colors.success};
      --color-warning: ${colors.warning};
      --color-error: ${colors.error};
      --color-info: ${colors.info};
      --color-background: ${colors.background};
      --color-surface: ${colors.surface};
      --color-border: ${colors.border};
      --color-text: ${colors.text};
      --color-text-secondary: ${colors.textSecondary};
      --color-text-muted: ${colors.textMuted};

      /* Typography */
      --font-family-sans: ${typography.fontFamily.sans.join(', ')};
      --font-family-mono: ${typography.fontFamily.mono.join(', ')};
      --font-size-xs: ${typography.fontSize.xs};
      --font-size-sm: ${typography.fontSize.sm};
      --font-size-base: ${typography.fontSize.base};
      --font-size-lg: ${typography.fontSize.lg};
      --font-size-xl: ${typography.fontSize.xl};
      --font-size-2xl: ${typography.fontSize['2xl']};
      --font-size-3xl: ${typography.fontSize['3xl']};
      --font-size-4xl: ${typography.fontSize['4xl']};
      --font-weight-normal: ${typography.fontWeight.normal};
      --font-weight-medium: ${typography.fontWeight.medium};
      --font-weight-semibold: ${typography.fontWeight.semibold};
      --font-weight-bold: ${typography.fontWeight.bold};
      --line-height-tight: ${typography.lineHeight.tight};
      --line-height-normal: ${typography.lineHeight.normal};
      --line-height-relaxed: ${typography.lineHeight.relaxed};

      /* Spacing */
      --spacing-px: ${spacing.spacing.px};
      --spacing-0: ${spacing.spacing[0]};
      --spacing-0-5: ${spacing.spacing[0.5]};
      --spacing-1: ${spacing.spacing[1]};
      --spacing-1-5: ${spacing.spacing[1.5]};
      --spacing-2: ${spacing.spacing[2]};
      --spacing-2-5: ${spacing.spacing[2.5]};
      --spacing-3: ${spacing.spacing[3]};
      --spacing-3-5: ${spacing.spacing[3.5]};
      --spacing-4: ${spacing.spacing[4]};
      --spacing-5: ${spacing.spacing[5]};
      --spacing-6: ${spacing.spacing[6]};
      --spacing-7: ${spacing.spacing[7]};
      --spacing-8: ${spacing.spacing[8]};
      --spacing-9: ${spacing.spacing[9]};
      --spacing-10: ${spacing.spacing[10]};
      --spacing-12: ${spacing.spacing[12]};
      --spacing-16: ${spacing.spacing[16]};
      --spacing-20: ${spacing.spacing[20]};
      --spacing-24: ${spacing.spacing[24]};
      --spacing-32: ${spacing.spacing[32]};
      --spacing-40: ${spacing.spacing[40]};
      --spacing-48: ${spacing.spacing[48]};
      --spacing-56: ${spacing.spacing[56]};
      --spacing-64: ${spacing.spacing[64]};

      /* Border Radius */
      --border-radius-none: ${borderRadius.borderRadius.none};
      --border-radius-sm: ${borderRadius.borderRadius.sm};
      --border-radius-md: ${borderRadius.borderRadius.md};
      --border-radius-lg: ${borderRadius.borderRadius.lg};
      --border-radius-xl: ${borderRadius.borderRadius.xl};
      --border-radius-2xl: ${borderRadius.borderRadius['2xl']};
      --border-radius-full: ${borderRadius.borderRadius.full};
    }
  `;
}

// Legacy export for backward compatibility with existing components
export const currentBrand = {
  name: "Adx402",
  tagline: [
    "Web2.5 Advertising Protocol",
    "Protocolo de Publicidad Web2.5"
  ],
  palette: {
    base: "#1a1a1a",
    accent: "#2563eb",
    contrast: "#059669",
    secondary: "#d97706",
    neutral: "#f8f9fa",
    background: "#ffffff",
  },
  typography: {
    logo: "Inter",
    primary: "Inter",
    secondary: "JetBrains Mono",
    headers: "Inter",
  },
};