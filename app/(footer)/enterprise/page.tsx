'use client';

import PageLayout from '@/components/PageLayout';
import { Shield, Lock, Server, Users, Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EnterprisePage() {
    return (
        <PageLayout title="Enterprise" subtitle="Secure, scalable AI infrastructure for your organization.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-white">Why ModelForge Enterprise?</h2>
                    <p className="text-zinc-400 mb-6 leading-relaxed">
                        Enterprises face unique challenges when adopting AI: security, compliance, and scalability.
                        ModelForge Enterprise is built from the ground up to address these needs while empowering your
                        teams to innovate faster.
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                        We provide a dedicated environment where your data never leaves your control,
                        integrated with your existing identity providers and governance policies.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800"
                >
                    <h3 className="text-xl font-bold mb-4 text-white">Trusted by Industry Leaders</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['Acme Corp', 'Global Tech', 'FinServe', 'HealthAI'].map((name) => (
                            <div key={name} className="h-12 bg-zinc-800/50 rounded flex items-center justify-center text-zinc-500 font-bold">
                                {name}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <h2 className="text-3xl font-bold mb-12 text-center text-white">Enterprise-Grade Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                {[
                    { icon: Shield, title: "Advanced Security", desc: "SOC2 Type II compliant, with end-to-end encryption and private VPC peering options." },
                    { icon: Lock, title: "SSO & Governance", desc: "Integrate with Okta, Azure AD, or Google Workspace. Role-based access control (RBAC) included." },
                    { icon: Server, title: "On-Premise Deployment", desc: "Deploy ModelForge entirely within your own infrastructure for maximum data sovereignty." },
                    { icon: Users, title: "Team Collaboration", desc: "Shared workspaces, version history, and comment threads for seamless team coordination." },
                    { icon: Activity, title: "Usage Analytics", desc: "Detailed insights into how your organization is using AI resources and API quotas." },
                    { icon: Globe, title: "24/7 Support", desc: "Dedicated support engineers available around the clock to help with critical issues." }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800"
                    >
                        <item.icon className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                        <p className="text-zinc-400 text-sm">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 text-center">
                <h2 className="text-2xl font-bold mb-6 text-white">Ready to scale?</h2>
                <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors">
                    Contact Enterprise Sales
                </button>
            </div>
        </PageLayout>
    );
}
