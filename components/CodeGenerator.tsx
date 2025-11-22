'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, atomDark, dracula, nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, ChevronDown, Download, Palette } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeGeneratorProps {
    codeSnippets: {
        framework: 'pytorch' | 'tensorflow' | 'sklearn';
        code: string;
    }[];
}

export default function CodeGenerator({ codeSnippets }: CodeGeneratorProps) {
    const [activeTab, setActiveTab] = useState(codeSnippets[0]?.framework || 'pytorch');
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [theme, setTheme] = useState<'vscDarkPlus' | 'atomDark' | 'dracula' | 'nightOwl'>('vscDarkPlus');
    const [showThemeMenu, setShowThemeMenu] = useState(false);

    const themes = {
        vscDarkPlus,
        atomDark,
        dracula,
        nightOwl
    };

    const themeNames = {
        vscDarkPlus: 'VS Dark+',
        atomDark: 'Atom Dark',
        dracula: 'Dracula',
        nightOwl: 'Night Owl'
    };

    const activeCode = codeSnippets.find(s => s.framework === activeTab)?.code || '';

    const handleCopy = () => {
        navigator.clipboard.writeText(activeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const extensions: Record<string, string> = { pytorch: 'py', tensorflow: 'py', sklearn: 'py' };
        const extension = extensions[activeTab] || 'py';
        const blob = new Blob([activeCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `model_training_${activeTab || 'model'}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div
                className="flex items-center justify-between px-4 py-3 bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{ rotate: isExpanded ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    </motion.div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
                        {isExpanded ? 'Hide' : 'Show'} Code Examples
                    </span>
                    <span className="text-xs text-zinc-500">
                        ({codeSnippets.length} framework{codeSnippets.length !== 1 ? 's' : ''})
                    </span>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-50/30 dark:bg-zinc-800/30 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="flex gap-2">
                                {codeSnippets.map((snippet) => (
                                    <button
                                        key={snippet.framework}
                                        onClick={() => setActiveTab(snippet.framework)}
                                        className={clsx(
                                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors uppercase",
                                            activeTab === snippet.framework
                                                ? "bg-cyan-600 text-white"
                                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                        )}
                                    >
                                        {snippet.framework}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                    title="Copy code"
                                    aria-label="Copy code to clipboard"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                    title="Download code"
                                    aria-label="Download code file"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowThemeMenu(!showThemeMenu)}
                                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                        title="Change theme"
                                        aria-label="Select syntax highlighting theme"
                                    >
                                        <Palette className="w-4 h-4" />
                                    </button>
                                    <AnimatePresence>
                                        {showThemeMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl z-10"
                                            >
                                                {(Object.keys(themeNames) as Array<keyof typeof themeNames>).map((themeName) => (
                                                    <button
                                                        key={themeName}
                                                        onClick={() => {
                                                            setTheme(themeName);
                                                            setShowThemeMenu(false);
                                                        }}
                                                        className={clsx(
                                                            "w-full text-left px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg",
                                                            theme === themeName
                                                                ? "bg-cyan-600 text-white"
                                                                : "text-zinc-900 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                                        )}
                                                    >
                                                        {themeNames[themeName]}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <SyntaxHighlighter
                                language="python"
                                style={themes[theme]}
                                showLineNumbers={true}
                                customStyle={{
                                    margin: 0,
                                    borderRadius: 0,
                                    background: 'transparent',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5'
                                }}
                                lineNumberStyle={{
                                    color: '#52525b',
                                    paddingRight: '1rem',
                                    minWidth: '2.5rem',
                                    textAlign: 'right'
                                }}
                            >
                                {activeCode}
                            </SyntaxHighlighter>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
