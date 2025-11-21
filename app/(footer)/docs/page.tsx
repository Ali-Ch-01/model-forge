'use client';

import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import { Book, Code, Layers, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DocsPage() {
    return (
        <PageLayout title="Documentation" subtitle="Learn how to build with ModelForge.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 not-prose">
                {[
                    { icon: Book, title: "Getting Started", desc: "Everything you need to know to generate your first model architecture.", color: "text-blue-500", hover: "group-hover:text-blue-400" },
                    { icon: Code, title: "Code Generation", desc: "How to customize and export PyTorch, TensorFlow, and Scikit-learn code.", color: "text-emerald-500", hover: "group-hover:text-emerald-400" },
                    { icon: Layers, title: "Architecture Diagrams", desc: "Understanding the visual components and exporting Mermaid.js diagrams.", color: "text-purple-500", hover: "group-hover:text-purple-400" },
                    { icon: Settings, title: "Advanced Configuration", desc: "Fine-tuning constraints, latency requirements, and hardware targets.", color: "text-orange-500", hover: "group-hover:text-orange-400" }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link href="#" className="block h-full group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-all">
                            <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                            <h3 className={`text-xl font-bold text-white mb-2 ${item.hover} transition-colors`}>{item.title}</h3>
                            <p className="text-zinc-400 text-sm">{item.desc}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-16"
            >
                <h2 className="text-2xl font-bold text-white mb-6">Popular Topics</h2>
                <ul className="space-y-4 text-zinc-400">
                    <li><Link href="#" className="hover:text-blue-400 transition-colors">How to specify custom constraints?</Link></li>
                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Integrating with AWS SageMaker</Link></li>
                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Exporting to ONNX format</Link></li>
                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Understanding the MLOps pipeline</Link></li>
                </ul>
            </motion.div>
        </PageLayout>
    );
}
