'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function PublicNavbar() {
    return (
        <header className="container mx-auto px-4 py-6 flex items-center justify-between border-b border-zinc-200 dark:border-white/5 backdrop-blur-sm sticky top-0 z-50 bg-white/80 dark:bg-black/50 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-xl font-bold tracking-tight"
            >
                <Link href="/" className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    <span>ModelForge</span>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
            >
                <ThemeToggle />
                <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                    Sign In
                </Link>
                <Link href="/signup">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors text-sm font-bold"
                    >
                        Get Started
                    </motion.button>
                </Link>
            </motion.div>
        </header>
    );
}
