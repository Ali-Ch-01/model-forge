'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';

interface StaticPageProps {
    title: string;
    children: React.ReactNode;
    lastUpdated?: string;
}

export default function StaticPage({ title, children, lastUpdated }: StaticPageProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/50 backdrop-blur-xl transition-colors duration-300">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">
                            ModelForge
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link
                            href="/"
                            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link 
                        href="/"
                        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{title}</h1>
                    
                    {lastUpdated && (
                        <p className="text-zinc-500 dark:text-zinc-400 mb-12">
                            Last updated: {lastUpdated}
                        </p>
                    )}

                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        {children}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
