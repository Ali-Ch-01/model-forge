/**
 * Performance Utilities
 * Dynamic imports and code splitting helpers for better bundle size
 */

// Dynamic import for jsPDF (large dependency ~500KB)
export const loadJsPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    return jsPDF;
};

// Dynamic import for react-syntax-highlighter themes
export const loadSyntaxHighlighterTheme = async (themeName: string) => {
    switch (themeName) {
        case 'vscDarkPlus':
            return (await import('react-syntax-highlighter/dist/esm/styles/prism')).vscDarkPlus;
        case 'atomDark':
            return (await import('react-syntax-highlighter/dist/esm/styles/prism')).atomDark;
        case 'dracula':
            return (await import('react-syntax-highlighter/dist/esm/styles/prism')).dracula;
        case 'nightOwl':
            return (await import('react-syntax-highlighter/dist/esm/styles/prism')).nightOwl;
        default:
            return (await import('react-syntax-highlighter/dist/esm/styles/prism')).vscDarkPlus;
    }
};

// Lazy load heavy components
export const LazyComponents = {
    // Code syntax highlighter - only load when needed
    SyntaxHighlighter: () => import('react-syntax-highlighter').then(mod => mod.Prism),

    // PDF generation - only load when user clicks export
    PDFGenerator: () => import('jspdf'),

    // Chart libraries if needed
    MermaidChart: () => import('mermaid'),
};

// Preload critical resources
export const preloadCriticalResources = () => {
    // Preload fonts
    const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
};

// Image optimization helper
export const optimizeImage = (src: string, width?: number, quality?: number) => {
    // Next.js Image component configuration
    return {
        src,
        width,
        quality: quality || 75,
        loading: 'lazy' as const,
        placeholder: 'blur' as const,
    };
};

// Debounce helper for search/filter inputs
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    waitMs: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitMs);
    };
};

// Bundle size analyzer helper
export const logBundleImpact = (componentName: string, sizeKB: number) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`📦 ${componentName}: ~${sizeKB}KB`);
    }
};
