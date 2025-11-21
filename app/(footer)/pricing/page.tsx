'use client';

import PageLayout from '@/components/PageLayout';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingPage() {
    return (
        <PageLayout title="Pricing" subtitle="Simple, transparent pricing for teams of all sizes.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mt-8">
                {/* Hobby Plan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col"
                >
                    <h3 className="text-xl font-bold mb-2 text-white">Hobby</h3>
                    <div className="text-4xl font-bold mb-6 text-white">$0<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
                    <p className="text-zinc-400 text-sm mb-8">Perfect for students and hobbyists getting started with ML.</p>
                    <ul className="space-y-4 text-zinc-300 mb-8 flex-1">
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> 50 queries/month</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Standard models</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Basic diagrams</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> Community support</li>
                    </ul>
                    <button className="w-full py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors">Get Started</button>
                </motion.div>

                {/* Pro Plan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-blue-900/10 border border-blue-500/50 relative flex flex-col shadow-2xl shadow-blue-900/20"
                >
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">Popular</div>
                    <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
                    <div className="text-4xl font-bold mb-6 text-white">$29<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
                    <p className="text-blue-200/70 text-sm mb-8">For professional engineers shipping production models.</p>
                    <ul className="space-y-4 text-zinc-300 mb-8 flex-1">
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> Unlimited queries</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> Advanced research models</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> Export to Python/Jupyter</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> Priority email support</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-400" /> MLOps pipeline generation</li>
                    </ul>
                    <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-600/20">Upgrade to Pro</button>
                </motion.div>

                {/* Enterprise Plan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col"
                >
                    <h3 className="text-xl font-bold mb-2 text-white">Enterprise</h3>
                    <div className="text-4xl font-bold mb-6 text-white">Custom</div>
                    <p className="text-zinc-400 text-sm mb-8">For large organizations requiring security and control.</p>
                    <ul className="space-y-4 text-zinc-300 mb-8 flex-1">
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-zinc-500" /> SSO & SAML Integration</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-zinc-500" /> Private Cloud Deployment</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-zinc-500" /> Custom Model Fine-tuning</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-zinc-500" /> Audit Logs & Compliance</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-zinc-500" /> Dedicated Account Manager</li>
                    </ul>
                    <button className="w-full py-3 rounded-lg bg-white text-black hover:bg-zinc-200 font-medium transition-colors">Contact Sales</button>
                </motion.div>
            </div>
        </PageLayout>
    );
}
