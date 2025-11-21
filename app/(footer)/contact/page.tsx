'use client';

import PageLayout from '@/components/PageLayout';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <PageLayout title="Contact Us" subtitle="We'd love to hear from you.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Have a question about our pricing, enterprise features, or just want to say hi?
                        Fill out the form and our team will get back to you within 24 hours.
                    </p>

                    <div className="space-y-6 not-prose">
                        <div className="flex items-center gap-4 text-zinc-300">
                            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                <Mail className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500">Email</div>
                                <div className="font-medium">support@modelforge.ai</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-300">
                            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                <MessageCircle className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500">Live Chat</div>
                                <div className="font-medium">Available 9am - 5pm PST</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-300">
                            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                <MapPin className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                                <div className="text-sm text-zinc-500">Office</div>
                                <div className="font-medium">San Francisco, CA</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800"
                >
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">First Name</label>
                                <input type="text" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Last Name</label>
                                <input type="text" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                            <input type="email" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Subject</label>
                            <select className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
                                <option>General Inquiry</option>
                                <option>Support</option>
                                <option>Sales</option>
                                <option>Feedback</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                            <textarea rows={4} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </PageLayout>
    );
}
