'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';

interface CodeGeneratorProps {
    codeSnippets: {
        framework: 'pytorch' | 'tensorflow' | 'sklearn';
        code: string;
    }[];
}

export default function CodeGenerator({ codeSnippets }: CodeGeneratorProps) {
    const [activeTab, setActiveTab] = useState(codeSnippets[0]?.framework || 'pytorch');
    const [copied, setCopied] = useState(false);

    const activeCode = codeSnippets.find(s => s.framework === activeTab)?.code || '';

    const handleCopy = () => {
        navigator.clipboard.writeText(activeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
                <div className="flex gap-2">
                    {codeSnippets.map((snippet) => (
                        <button
                            key={snippet.framework}
                            onClick={() => setActiveTab(snippet.framework)}
                            className={clsx(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors uppercase",
                                activeTab === snippet.framework
                                    ? "bg-indigo-600 text-white"
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
        </div>
    );
}
