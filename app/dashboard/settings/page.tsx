'use client';

import React from 'react';
import { Settings, User, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-500" />
                Settings
            </h1>

            <div className="grid gap-8 max-w-3xl">
                {/* Profile Section */}
                <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-zinc-400" />
                        Profile Settings
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Display Name</label>
                            <input type="text" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                            <input type="email" className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="john@example.com" disabled />
                        </div>
                    </div>
                </section>

                {/* Preferences Section */}
                <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-zinc-400" />
                        Preferences
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Default Framework</h3>
                                <p className="text-sm text-zinc-500">Preferred framework for code generation</p>
                            </div>
                            <select className="bg-black border border-zinc-800 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                                <option>PyTorch</option>
                                <option>TensorFlow</option>
                                <option>Scikit-learn</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Theme</h3>
                                <p className="text-sm text-zinc-500">Application appearance</p>
                            </div>
                            <select className="bg-black border border-zinc-800 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                                <option>Dark</option>
                                <option>Light</option>
                                <option>System</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Notifications Section */}
                <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-zinc-400" />
                        Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Email Updates</h3>
                                <p className="text-sm text-zinc-500">Receive product updates and newsletters</p>
                            </div>
                            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-4">
                    <button className="px-6 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors">Cancel</button>
                    <button className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
