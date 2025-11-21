'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Settings, LogOut, Menu } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'History', href: '/dashboard/history', icon: History },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <span>ModelForge</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="h-6 w-px bg-zinc-800" />
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t border-zinc-800 bg-black"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 text-sm font-medium p-2 rounded-lg transition-colors ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-900'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-3 text-sm font-medium p-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-red-400 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
