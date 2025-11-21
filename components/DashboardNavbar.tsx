'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Heart, User, ChevronDown } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function DashboardNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserName = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Try to get name from profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name')
                    .eq('id', user.id)
                    .single();

                if (profile?.full_name) {
                    setUserName(profile.full_name);
                } else if (user.user_metadata?.full_name) {
                    setUserName(user.user_metadata.full_name);
                } else {
                    // Fallback to email first part
                    setUserName(user.email?.split('@')[0] || 'User');
                }
            }
        };

        fetchUserName();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'History', href: '/dashboard/history', icon: History },
        { name: 'Saved', href: '/dashboard/saved', icon: Heart },
    ];

    return (
        <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <span>ModelForge</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <nav className="flex items-center gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname === item.href
                                            ? 'bg-cyan-600 text-white'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4 inline-block mr-2" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Theme Toggle */}
                        <ThemeToggle />
                        <div className="h-6 w-px bg-zinc-800" />

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-semibold text-xs">
                                    {userName?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <span className="hidden lg:inline">{userName}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden"
                                    >
                                        <div className="p-3 border-b border-zinc-800">
                                            <p className="text-sm font-medium text-white">{userName}</p>
                                            <p className="text-xs text-zinc-500 truncate">View profile</p>
                                        </div>
                                        <Link
                                            href="/dashboard/settings"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                handleSignOut();
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <User className="w-6 h-6" />
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
                            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-semibold">
                                    {userName?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{userName}</p>
                                    <p className="text-xs text-zinc-500">Signed in</p>
                                </div>
                            </div>

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

                            <Link
                                href="/dashboard/settings"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 text-sm font-medium p-2 rounded-lg text-zinc-400 hover:bg-zinc-900 transition-colors"
                            >
                                <User className="w-4 h-4" />
                                Settings
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-3 text-sm font-medium p-2 rounded-lg text-red-400 hover:bg-zinc-900 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
