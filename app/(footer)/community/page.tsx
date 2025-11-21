'use client';

import PageLayout from '@/components/PageLayout';
import { MessageSquare, Github, Twitter, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommunityPage() {
    return (
        <PageLayout title="Community" subtitle="Join thousands of ML engineers building with ModelForge.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 not-prose">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/20 transition-colors group"
                >
                    <MessageSquare className="w-10 h-10 text-[#5865F2] mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">Discord Server</h3>
                    <p className="text-zinc-400 mb-6">Chat with the team, get help with your architectures, and show off your projects.</p>
                    <span className="text-[#5865F2] font-medium group-hover:underline">Join 5,000+ members →</span>
                </motion.a>

                <motion.a
                    href="#"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors group"
                >
                    <Github className="w-10 h-10 text-white mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">GitHub Discussions</h3>
                    <p className="text-zinc-400 mb-6">Report bugs, request features, and contribute to our open-source templates.</p>
                    <span className="text-white font-medium group-hover:underline">View Repository →</span>
                </motion.a>

                <motion.a
                    href="#"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/20 transition-colors group"
                >
                    <Twitter className="w-10 h-10 text-[#1DA1F2] mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">Twitter / X</h3>
                    <p className="text-zinc-400 mb-6">Follow us for the latest updates, AI news, and engineering tips.</p>
                    <span className="text-[#1DA1F2] font-medium group-hover:underline">Follow @ModelForgeAI →</span>
                </motion.a>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-emerald-900/10 border border-emerald-500/20"
                >
                    <Users className="w-10 h-10 text-emerald-500 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">Community Showcase</h3>
                    <p className="text-zinc-400 mb-6">See what others are building. From cancer detection to stock prediction.</p>
                    <span className="text-emerald-500 font-medium cursor-pointer hover:underline">Browse Showcase →</span>
                </motion.div>
            </div>
        </PageLayout>
    );
}
