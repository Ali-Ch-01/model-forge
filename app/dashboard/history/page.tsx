'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Search, Calendar, ChevronDown, Trash2, Download } from 'lucide-react';
import Link from 'next/link';
import Dashboard from '@/components/Dashboard';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

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
    const [expandedQueries, setExpandedQueries] = useState<Set<string>>(new Set());
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
            toast.error('Failed to load history');
        } else {
            setHistory(data || []);
        }
        setIsLoading(false);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        e.preventDefault();

        console.log('Delete clicked for:', id);

        const previousHistory = [...history];
        setHistory(prev => prev.filter(item => item.id !== id));
        if (selectedItem?.id === id) setSelectedItem(null);

        try {
            const { data, error } = await supabase
                .from('query_history')
                .delete()
                .eq('id', id);

            console.log('Delete response:', { data, error });

            if (error) {
                console.error('Supabase delete error:', error);
                toast.error(`Delete failed: ${error.message}`);
                throw error;
            }
            console.log('Delete successful');
            toast.success('History item deleted');
        } catch (error: any) {
            console.error('Error deleting history:', error);
            setHistory(previousHistory);
            toast.error(`Failed: ${error?.message || 'Unknown error'}`);
        }
    };

    const toggleQueryExpansion = (id: string) => {
        setExpandedQueries(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleExport = (item: HistoryItem, format: 'pdf' | 'md' | 'json') => {
        const recommendations = item.recommended_models || [];

        if (format === 'json') {
            const dataStr = JSON.stringify({
                query: item.query_text,
                date: item.created_at,
                recommendations
            }, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `history-${new Date(item.created_at).toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success('Exported as JSON');
        } else if (format === 'md') {
            let mdContent = `# ModelForge Query History\n\n`;
            mdContent += `**Date:** ${new Date(item.created_at).toLocaleDateString()}\n`;
            mdContent += `**Query:** ${item.query_text}\n\n`;

            recommendations.forEach((rec: any, index: number) => {
                mdContent += `## ${index + 1}. ${rec.name}\n\n`;
                mdContent += `**Suitability Score:** ${rec.suitabilityScore}%\n\n`;
                mdContent += `### Description\n${rec.description}\n\n`;
                if (rec.pros?.length) mdContent += `### Pros\n${rec.pros.map((p: string) => `- ${p}`).join('\n')}\n\n`;
                if (rec.cons?.length) mdContent += `### Cons\n${rec.cons.map((c: string) => `- ${c}`).join('\n')}\n\n`;
            });

            const blob = new Blob([mdContent], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `history-${new Date(item.created_at).toISOString().split('T')[0]}.md`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success('Exported as Markdown');
        } else if (format === 'pdf') {
            const doc = new jsPDF();
            doc.setFontSize(20);
            doc.text('ModelForge Query History', 20, 20);
            doc.setFontSize(12);
            doc.text(`Date: ${new Date(item.created_at).toLocaleDateString()}`, 20, 30);
            doc.text(`Query: ${item.query_text}`, 20, 40);

            let yPos = 55;
            recommendations.forEach((rec: any, index: number) => {
                if (yPos > 250) { doc.addPage(); yPos = 20; }
                doc.setFontSize(14);
                doc.text(`${index + 1}. ${rec.name}`, 20, yPos);
                yPos += 10;
                doc.setFontSize(11);
                const desc = doc.splitTextToSize(rec.description, 170);
                doc.text(desc, 20, yPos);
                yPos += (desc.length * 6) + 10;
            });

            doc.save(`history-${new Date(item.created_at).toISOString().split('T')[0]}.pdf`);
            toast.success('Exported as PDF');
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
                    {history.map((item, i) => {
                        const isExpanded = expandedQueries.has(item.id);
                        const isLongQuery = item.query_text && item.query_text.length > 100;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all"
                            >
                                <div className="p-6 flex items-start justify-between gap-4">
                                    <div
                                        onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                                        className="flex-1 min-w-0 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                            <span className="text-zinc-500 text-xs flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(item.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>

                                        <div className="mb-2">
                                            <h3 className={`text-lg font-medium text-white transition-colors group-hover:text-blue-400 ${!isExpanded ? 'line-clamp-1' : ''}`}>
                                                {item.query_text || "Untitled Query"}
                                            </h3>
                                            {isLongQuery && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleQueryExpansion(item.id);
                                                    }}
                                                    className="text-xs text-blue-400 hover:text-blue-300 mt-1 font-medium"
                                                >
                                                    {isExpanded ? 'Show Less' : 'Show More'}
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                            {Array.isArray(item.recommended_models) ? item.recommended_models.length : 0} models recommended
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                        {/* Download Options */}
                                        <div className="flex items-center bg-zinc-800 rounded-lg p-1 gap-1">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleExport(item, 'pdf'); }}
                                                className="px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                                                title="Download PDF"
                                            >
                                                PDF
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleExport(item, 'md'); }}
                                                className="px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                                                title="Download Markdown"
                                            >
                                                MD
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleExport(item, 'json'); }}
                                                className="px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                                                title="Download JSON"
                                            >
                                                JSON
                                            </button>
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(e, item.id)}
                                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                            title="Delete history item"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                                            className={`p-2 rounded-lg transition-all ${selectedItem?.id === item.id ? 'bg-blue-600 text-white rotate-180' : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700'}`}
                                        >
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
                        );
                    })}
                </div>
            )}
        </div>
    );
}
