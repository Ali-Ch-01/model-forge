'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Search, ChevronRight, Calendar, ChevronDown, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Dashboard from '@/components/Dashboard';

interface HistoryItem {
    id: string;
    query_text: string;
    created_at: string;
    recommended_models: any[];
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from('query_history')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching history:', error);
        } else {
            setHistory(data || []);
        }
        setIsLoading(false);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent expanding the item when clicking delete
        if (!confirm('Are you sure you want to delete this history item?')) return;

        try {
            const { error } = await supabase
                .from('query_history')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Remove from local state
            setHistory(history.filter(item => item.id !== id));
            if (selectedItem?.id === id) setSelectedItem(null);
        } catch (error) {
            console.error('Error deleting history:', error);
            alert('Failed to delete history item');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold text-white">Query History</h1>
            </div>

            {isLoading ? (
                <div className="text-center py-20 text-zinc-500">Loading history...</div>
            ) : history.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                    <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No history yet</h3>
                    <p className="text-zinc-400 mb-6">Start generating recommendations to see them here.</p>
                    <Link href="/dashboard" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
                        New Search
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all"
                        >
                            <div
                                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                                className="p-6 flex items-start justify-between gap-4 cursor-pointer"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="text-zinc-500 text-xs flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(item.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {item.query_text || "Untitled Query"}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {Array.isArray(item.recommended_models) ? item.recommended_models.length : 0} models recommended
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => handleDelete(e, item.id)}
                                        className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                        title="Delete history item"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                    <button className={`p-2 rounded-lg bg-zinc-800 text-zinc-400 transition-all ${selectedItem?.id === item.id ? 'bg-blue-600 text-white rotate-180' : 'group-hover:bg-zinc-700'}`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {selectedItem?.id === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-zinc-800 bg-black/20"
                                    >
                                        <div className="p-6">
                                            <Dashboard recommendations={item.recommended_models} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
