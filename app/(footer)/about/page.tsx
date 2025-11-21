'use client';

import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <PageLayout title="About Us" subtitle="Democratizing access to expert-level AI engineering.">
            <div className="space-y-12 mt-8">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Machine learning is evolving at a breakneck pace. Keeping up with the latest architectures,
                        frameworks, and deployment strategies is a full-time job. We believe that every developer
                        should have access to the collective wisdom of the world's best AI researchers.
                    </p>
                    <p className="text-zinc-400 text-lg leading-relaxed mt-4">
                        ModelForge acts as your AI co-pilot, bridging the gap between a problem description and a
                        production-ready solution. We are building the tools that will power the next generation of intelligent applications.
                    </p>
                </motion.section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-8">The Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose max-w-4xl mx-auto">
                        {[
                            { name: "Ali Mohsin", role: "Co-founder", bio: "Visionary leader driving AI innovation." },
                            { name: "Iqra Azam", role: "Co-founder", bio: "Technical architect behind the core engine." }
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center hover:border-blue-500/30 transition-colors"
                            >
                                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                                <p className="text-zinc-400 text-sm">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-blue-900/10 rounded-2xl p-8 border border-blue-500/20 text-center"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Backed by the Best</h2>
                    <p className="text-zinc-400 mb-8">We are proud to be supported by world-class investors who share our vision.</p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-70">
                        {['Sequoia', 'Y Combinator', 'Index Ventures', 'a16z'].map((vc) => (
                            <span key={vc} className="text-xl font-bold text-zinc-300">{vc}</span>
                        ))}
                    </div>
                </motion.section>
            </div>
        </PageLayout>
    );
}
