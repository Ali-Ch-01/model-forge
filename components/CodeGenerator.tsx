'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, ChevronDown } from 'lucide-react';
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

    const activeCode = codeSnippets.find(s => s.framework === activeTab)?.code || '';

    const handleCopy = () => {
        navigator.clipboard.writeText(activeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div
                className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-zinc-800 cursor-pointer hover:bg-zinc-800/70 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{ rotate: isExpanded ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                    </motion.div>
                    <span className="text-sm font-medium text-zinc-300">
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
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/30 border-b border-zinc-800">
                            <div className="flex gap-2">
                                {codeSnippets.map((snippet) => (
                                    <button
                                        key={snippet.framework}
                                        onClick={() => setActiveTab(snippet.framework)}
                                        className={clsx(
                                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors uppercase",
                                            activeTab === snippet.framework
                                                ? "bg-cyan-600 text-white"
                                                : "text-zinc-400 hover:text-white hover:bg-zinc-700"
                                        )}
                                    >
                                        {snippet.framework}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleCopy}
                                className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-700"
                                title="Copy code"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="relative">
                            <SyntaxHighlighter
                                language="python"
                                style={vscDarkPlus}
                                customStyle={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    background: 'transparent',
                                    fontSize: '0.9rem',
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
