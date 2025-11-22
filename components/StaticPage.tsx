'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';
import UnifiedNavbar from './UnifiedNavbar';

interface StaticPageProps {
    title: string;
    children: React.ReactNode;
    lastUpdated?: string;
}

export default function StaticPage({ title, children, lastUpdated }: StaticPageProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
            {/* Header */}
            <UnifiedNavbar variant="public" />

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
