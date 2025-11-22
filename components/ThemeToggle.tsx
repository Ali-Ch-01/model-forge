'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800/50" />
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="relative w-10 h-10 rounded-lg bg-white dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-700 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-sm"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 0 : 180,
                    scale: theme === 'dark' ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
            >
                <Moon className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? -180 : 0,
                    scale: theme === 'dark' ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
            >
                <Sun className="w-5 h-5 text-yellow-500" />
            </motion.div>
        </motion.button>
    );
}
