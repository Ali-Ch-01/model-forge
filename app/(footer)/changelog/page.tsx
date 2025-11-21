'use client';

import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

export default function ChangelogPage() {
    const changes = [
        {
            version: "v2.0.0",
            date: "November 21, 2025",
            title: "The AI Overhaul",
            description: "A massive update introducing a new LLM backend, a complete UI redesign, and enhanced dashboard features.",
            items: [
                "Integrated Qwen-72B & Mistral for superior reasoning capabilities.",
                "Completely redesigned UI with a professional Blue/Slate theme.",
                "Added 'History' and 'Settings' dashboard pages.",
                "Implemented a robust footer and improved navigation.",
                "Added support for multimodal problem descriptions."
            ]
        },
        {
            version: "v1.5.0",
            date: "November 10, 2025",
            title: "Performance Improvements",
            description: "Optimized the recommendation engine and reduced latency by 40%.",
            items: [
                "Cached common queries in Supabase.",
                "Improved Mermaid diagram generation stability.",
                "Added mobile responsiveness tweaks."
            ]
        },
        {
            version: "v1.0.0",
            date: "October 15, 2025",
            title: "Initial Launch",
            description: "ModelForge is live! The first AI architect for ML engineers.",
            items: [
                "Basic recommendation engine.",
                "Code generation for PyTorch.",
                "Simple architecture visualization."
            ]
        }
    ];

    return (
        <PageLayout title="Changelog" subtitle="Track our progress and latest updates.">
            <div className="space-y-16 mt-8 relative border-l border-zinc-800 ml-4 md:ml-0 pl-8 md:pl-0">
                {changes.map((change, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="relative md:grid md:grid-cols-5 gap-8"
                    >
                        <div className="md:col-span-1 md:text-right mb-4 md:mb-0">
                            <div className="text-sm font-mono text-zinc-500 sticky top-24">{change.date}</div>
                        </div>

                        {/* Timeline Dot */}
                        <div className="absolute left-[-37px] md:left-auto md:right-full md:mr-[-9px] top-1 w-4 h-4 rounded-full bg-black border-2 border-blue-500 z-10" />

                        <div className="md:col-span-4">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-white m-0">{change.version}</h2>
                                <span className="px-2 py-1 rounded bg-blue-900/30 text-blue-400 text-xs font-mono border border-blue-500/30">
                                    Latest
                                </span>
                            </div>
                            <h3 className="text-xl font-medium text-zinc-200 mb-4">{change.title}</h3>
                            <p className="text-zinc-400 mb-6">{change.description}</p>
                            <ul className="space-y-2">
                                {change.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2 text-zinc-300">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </PageLayout>
    );
}
