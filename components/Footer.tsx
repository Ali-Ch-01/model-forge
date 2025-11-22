'use client';

import Link from 'next/link';
import { } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black pt-20 pb-10 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 text-xl font-bold mb-6">

                            ModelForge
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed">
                            Accelerating machine learning development with AI-powered architecture design.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-zinc-900 dark:text-white">Product</h4>
                        <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-500">
                            <li><Link href="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link></li>
                            <li><Link href="/enterprise" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Enterprise</Link></li>
                            <li><Link href="/changelog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-zinc-900 dark:text-white">Resources</h4>
                        <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-500">
                            <li><Link href="/docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</Link></li>
                            <li><Link href="/api" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API Reference</Link></li>
                            <li><Link href="/community" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Community</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-zinc-900 dark:text-white">Company</h4>
                        <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-500">
                            <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link></li>
                            <li><Link href="/careers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
                            <li><Link href="/legal" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Legal</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-200 dark:border-zinc-900 text-sm text-zinc-500 dark:text-zinc-600">
                    <p>© 2025 ModelForge AI. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/legal" className="hover:text-zinc-900 dark:hover:text-zinc-400">Privacy Policy</Link>
                        <Link href="/legal" className="hover:text-zinc-900 dark:hover:text-zinc-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
