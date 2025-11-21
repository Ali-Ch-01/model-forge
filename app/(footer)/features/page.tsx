'use client';

import PageLayout from '@/components/PageLayout';
import { Sparkles, Terminal, Cpu, Rocket, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesPage() {
    const features = [
        {
            icon: Sparkles,
            title: "Smart Recommendations",
            desc: "Our advanced LLM engine analyzes your problem description to suggest the optimal model architecture, taking into account data type, latency constraints, and deployment environment."
        },
        {
            icon: Cpu,
            title: "Visual Architecture Diagrams",
            desc: "Instantly generate professional Mermaid.js diagrams of your model's architecture. Visualize data flow, layer connections, and input/output shapes with clarity."
        },
        {
            icon: Terminal,
            title: "Production-Ready Code",
            desc: "Get complete, runnable starter code for PyTorch, TensorFlow, and Scikit-learn. We handle the boilerplate so you can focus on the model logic."
        },
        {
            icon: Rocket,
            title: "MLOps Pipeline Generation",
            desc: "Don't just build a model; build a system. We generate comprehensive MLOps pipelines including CI/CD workflows, Dockerfiles, and Kubernetes manifests."
        },
        {
            icon: Shield,
            title: "Enterprise Security",
            desc: "Your data is safe with us. We use industry-standard encryption and comply with SOC2 and GDPR requirements to ensure your intellectual property is protected."
        },
        {
            icon: Zap,
            title: "Real-time Collaboration",
            desc: "Share your projects with your team. Comment on architectures, version control your designs, and iterate faster together."
        }
    ];

    return (
        <PageLayout title="Features" subtitle="The complete toolkit for modern ML engineering.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mt-12">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-blue-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <feature.icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </PageLayout>
    );
}
