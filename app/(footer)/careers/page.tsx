'use client';

import PageLayout from '@/components/PageLayout';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CareersPage() {
    return (
        <PageLayout title="Careers" subtitle="Help us build the future of AI development.">
            <div className="mt-8">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Why join ModelForge?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
                        {[
                            { title: "Remote-First", desc: "Work from anywhere in the world. We trust you to manage your time." },
                            { title: "Competitive Pay", desc: "Top-tier salary and equity packages. We believe in shared success." },
                            { title: "Cutting Edge", desc: "Work with the latest LLMs and ML frameworks every single day." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800"
                            >
                                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-zinc-400 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-8">Open Positions</h2>
                <div className="space-y-4 not-prose">
                    {[
                        { title: "Senior ML Engineer", dept: "Engineering", loc: "Remote", type: "Full-time" },
                        { title: "Frontend Developer (React/Next.js)", dept: "Engineering", loc: "Remote", type: "Full-time" },
                        { title: "Product Designer", dept: "Design", loc: "New York / Remote", type: "Full-time" },
                        { title: "Developer Advocate", dept: "Growth", loc: "San Francisco / Remote", type: "Full-time" }
                    ].map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-6 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:border-blue-500/50 transition-all flex items-center justify-between cursor-pointer"
                        >
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-zinc-500 mt-2">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.loc}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                                    <span>{job.dept}</span>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
