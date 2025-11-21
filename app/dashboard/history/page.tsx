'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import { Clock, Search, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';

interface HistoryItem {
    id: string;
    query_text: string;
    created_at: string;
    recommended_models: any[];
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
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

        fetchHistory();
    }, []);

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
                            className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-blue-500/30 transition-all"
                        >
                            <div className="flex items-start justify-between gap-4">
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
                                <button className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
