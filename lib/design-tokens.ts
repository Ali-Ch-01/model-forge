/**
 * Design Tokens System
 * Centralized design tokens for consistent styling across ModelForge
 */

export const tokens = {
    // Color System
    colors: {
        // Primary Brand Colors
        primary: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4', // Main cyan
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
        },

        // Background Colors
        background: {
            primary: '#000000',
            secondary: '#18181b',
            tertiary: '#27272a',
            elevated: '#3f3f46',
            subtle: 'rgba(255, 255, 255, 0.05)',
        },

        // Text Colors
        text: {
            primary: '#ffffff',
            secondary: '#a1a1aa',
            tertiary: '#71717a',
            disabled: '#52525b',
            inverse: '#000000',
        },

        // Border Colors
        border: {
            primary: '#27272a',
            secondary: '#3f3f46',
            focus: '#06b6d4',
            error: '#ef4444',
            success: '#22c55e',
        },

        // Status Colors
        status: {
            success: '#22c55e',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6',
        },

        // Semantic Colors
        semantic: {
            successBg: 'rgba(34, 197, 94, 0.1)',
            successBorder: 'rgba(34, 197, 94, 0.3)',
            warningBg: 'rgba(245, 158, 11, 0.1)',
            warningBorder: 'rgba(245, 158, 11, 0.3)',
            errorBg: 'rgba(239, 68, 68, 0.1)',
            errorBorder: 'rgba(239, 68, 68, 0.3)',
            infoBg: 'rgba(59, 130, 246, 0.1)',
            infoBorder: 'rgba(59, 130, 246, 0.3)',
        },
    },

    // Spacing System (based on 4px grid)
    spacing: {
        0: '0',
        px: '1px',
        0.5: '0.125rem',  // 2px
        1: '0.25rem',     // 4px
        1.5: '0.375rem',  // 6px
        2: '0.5rem',      // 8px
        2.5: '0.625rem',  // 10px
        3: '0.75rem',     // 12px
        3.5: '0.875rem',  // 14px
        4: '1rem',        // 16px
        5: '1.25rem',     // 20px
        6: '1.5rem',      // 24px
        7: '1.75rem',     // 28px
        8: '2rem',        // 32px
        9: '2.25rem',     // 36px
        10: '2.5rem',     // 40px
        12: '3rem',       // 48px
        16: '4rem',       // 64px
        20: '5rem',       // 80px
        24: '6rem',       // 96px
    },

    // Border Radius
    borderRadius: {
        none: '0',
        sm: '0.375rem',   // 6px
        md: '0.5rem',     // 8px
        lg: '0.75rem',    // 12px
        xl: '1rem',       // 16px
        '2xl': '1.5rem',  // 24px
        full: '9999px',
    },

    // Typography
    typography: {
        fontFamily: {
            sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
            sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
            base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
            lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
            xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
            '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
            '5xl': ['3rem', { lineHeight: '1' }],           // 48px
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },

    // Shadows
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        glow: '0 0 20px rgba(6, 182, 212, 0.3)',
        glowLg: '0 0 40px rgba(6, 182, 212, 0.4)',
    },

    // Transitions
    transitions: {
        fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },

    // Z-Index Layers
    zIndex: {
        base: 0,
        dropdown: 1000,
        sticky: 1100,
        modal: 1200,
        popover: 1300,
        tooltip: 1400,
        toast: 1500,
    },

    // Breakpoints
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
} as const;

// Type exports for TypeScript autocomplete
export type TokenColors = typeof tokens.colors;
export type TokenSpacing = typeof tokens.spacing;
export type TokenBorderRadius = typeof tokens.borderRadius;
export type TokenTypography = typeof tokens.typography;
export type TokenShadows = typeof tokens.shadows;
export type TokenTransitions = typeof tokens.transitions;
export type TokenZIndex = typeof tokens.zIndex;
export type TokenBreakpoints = typeof tokens.breakpoints;

export default tokens;
