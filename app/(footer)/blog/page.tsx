'use client';

import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogPage() {
    const posts = [
        {
            title: "The Future of Auto-ML: Beyond Hyperparameter Tuning",
            excerpt: "How Large Language Models are changing the way we design neural network architectures from the ground up.",
            date: "Nov 20, 2025",
            author: "Sarah Chen",
            category: "Research"
        },
        {
            title: "Optimizing Transformer Inference for Edge Devices",
            excerpt: "A deep dive into quantization, pruning, and knowledge distillation techniques for deploying BERT on mobile.",
            date: "Nov 15, 2025",
            author: "Mike Ross",
            category: "Engineering"
        },
        {
            title: "Building a Multi-Modal Recommendation System",
            excerpt: "Case study: How we helped a leading e-commerce platform increase conversion by 15% using ModelForge.",
            date: "Nov 08, 2025",
            author: "Alex Rivera",
            category: "Case Study"
        },
        {
            title: "Introducing ModelForge Enterprise",
            excerpt: "Security, scalability, and support for large organizations. Everything you need to know about our new tier.",
            date: "Nov 01, 2025",
            author: "Team ModelForge",
            category: "Announcements"
        }
    ];

    return (
        <PageLayout title="Blog" subtitle="Insights, tutorials, and news from the ModelForge team.">
            <div className="grid gap-8 mt-8 max-w-3xl mx-auto">
                {posts.map((post, i) => (
                    <motion.article
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="border-b border-zinc-800 pb-10 last:border-0"
                    >
                        <div className="flex items-center gap-4 text-sm mb-3">
                            <span className="text-blue-400 font-medium px-2 py-0.5 rounded bg-blue-400/10 border border-blue-400/20">{post.category}</span>
                            <span className="text-zinc-500">{post.date}</span>
                        </div>
                        <Link href="#" className="block group">
                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h2>
                            <p className="text-zinc-400 leading-relaxed mb-4">{post.excerpt}</p>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                                {post.author.charAt(0)}
                            </div>
                            {post.author}
                        </div>
                    </motion.article>
                ))}
            </div>
        </PageLayout>
    );
}
