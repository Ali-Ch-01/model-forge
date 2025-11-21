'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Settings, Save, Bell, Moon, Database, Cpu } from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [preferences, setPreferences] = useState({
        theme: 'dark',
        notifications_enabled: true,
        preferred_frameworks: ['pytorch'],
        preferred_deployment: 'cloud'
    });

    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('user_preferences')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setPreferences({
                    theme: data.theme || 'dark',
                    notifications_enabled: data.notifications_enabled ?? true,
                    preferred_frameworks: data.preferred_frameworks || ['pytorch'],
                    preferred_deployment: data.preferred_deployment || 'cloud'
                });
            }
            setLoading(false);
        };

        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('user_preferences')
                .upsert({
                    user_id: user.id,
                    ...preferences,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-zinc-500">Loading settings...</div>;

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-zinc-400" />
                </div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
            </div>

            <div className="space-y-6">
                {/* Appearance */}
                <section className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Moon className="w-5 h-5 text-blue-400" />
                        Appearance
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300">Theme</label>
                            <p className="text-xs text-zinc-500 mt-1">Select your preferred interface theme</p>
                        </div>
                        <select
                            value={preferences.theme}
                            onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="dark">Dark Mode</option>
                            <option value="light">Light Mode</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>
                </section>

                {/* Notifications */}
                <section className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-yellow-400" />
                        Notifications
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300">Email Notifications</label>
                            <p className="text-xs text-zinc-500 mt-1">Receive updates about your model training</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={preferences.notifications_enabled}
                                onChange={(e) => setPreferences({ ...preferences, notifications_enabled: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </section>

                {/* ML Preferences */}
                <section className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-emerald-400" />
                        ML Preferences
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Preferred Framework</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['pytorch', 'tensorflow', 'sklearn'].map((fw) => (
                                    <button
                                        key={fw}
                                        onClick={() => setPreferences({ ...preferences, preferred_frameworks: [fw] })}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${preferences.preferred_frameworks.includes(fw)
                                                ? 'bg-blue-600 border-blue-500 text-white'
                                                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                                            }`}
                                    >
                                        {fw.charAt(0).toUpperCase() + fw.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Default Deployment Target</label>
                            <select
                                value={preferences.preferred_deployment}
                                onChange={(e) => setPreferences({ ...preferences, preferred_deployment: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="cloud">Cloud (AWS/GCP/Azure)</option>
                                <option value="edge">Edge Device</option>
                                <option value="mobile">Mobile (iOS/Android)</option>
                            </select>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>Saving...</>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
