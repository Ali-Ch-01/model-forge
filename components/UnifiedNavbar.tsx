'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Heart, User, Menu, X } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

interface UnifiedNavbarProps {
    variant?: 'public' | 'dashboard';
}

export default function UnifiedNavbar({ variant = 'public' }: UnifiedNavbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [userName, setUserName] = useState('User');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        if (variant === 'dashboard') {
            const fetchUser = async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const fullName = user.user_metadata?.full_name;
                    setUserName(fullName || user.email?.split('@')[0] || 'User');
                }
            };
            fetchUser();
        }
    }, [variant, supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    const isActive = (path: string) => pathname === path;

    // Public navbar (for landing, login, signup, footer pages)
    if (variant === 'public') {
        return (
            <header className="container mx-auto px-4 py-6 flex items-center justify-between border-b border-zinc-200 dark:border-white/5 backdrop-blur-sm sticky top-0 z-50 bg-white/80 dark:bg-black/50 transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-xl font-bold tracking-tight"
                >
                    <Link href="/" className="text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        ModelForge
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

    // Dashboard navbar (for authenticated pages)
    const navLinks = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/history', label: 'History', icon: History },
        { href: '/dashboard/saved', label: 'Saved', icon: Heart },
        { href: '/dashboard/settings', label: 'Settings', icon: User },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        ModelForge
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                                        active
                                            ? 'bg-cyan-600 text-white'
                                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop Right Section */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {showMobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            <div className="flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{userName}</p>
                                    <p className="text-xs text-zinc-500">Signed in</p>
                                </div>
                            </div>
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setShowMobileMenu(false)}
                                        className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${
                                            active
                                                ? 'bg-cyan-600 text-white'
                                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                <ThemeToggle />
                                <button
                                    onClick={handleSignOut}
                                    className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
