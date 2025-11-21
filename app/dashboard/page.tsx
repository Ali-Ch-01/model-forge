'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import InputSection from '@/components/InputSection';
import Dashboard from '@/components/Dashboard';
import { UserInput, ModelRecommendation, getRecommendations } from '@/lib/recommendationEngine';
import { Save, Download } from 'lucide-react';

export default function DashboardPage() {
    const [recommendations, setRecommendations] = useState<ModelRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSearch = async (input: UserInput) => {
        setIsLoading(true);
        try {
            const results = await getRecommendations(input);
            setRecommendations(results);
            setHasSearched(true);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveHistory = async () => {
        if (!recommendations.length) return;

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Please sign in to save history');
                return;
            }

            const { error } = await supabase.from('query_history').insert({
                user_id: user.id,
                query_text: recommendations[0].description, // Using description as proxy for query since we don't have raw input stored in state
                recommended_models: recommendations,
                hf_inference_success: true
            });

            if (error) throw error;
            alert('Saved to history!');
        } catch (error) {
            console.error('Error saving history:', error);
            alert('Failed to save history');
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Input Section */}
                <InputSection onSubmit={handleSearch} isLoading={isLoading} />

                {/* Results */}
                {hasSearched && (
                    <div className="mt-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Recommendations</h2>
                            <div className="flex gap-3">
                                <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-1">
                                    <button
                                        onClick={() => alert('Export as PDF')}
                                        className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                                    >
                                        PDF
                                    </button>
                                    <div className="w-px h-4 bg-zinc-800 mx-1" />
                                    <button
                                        onClick={() => alert('Export as Markdown')}
                                        className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                                    >
                                        MD
                                    </button>
                                    <div className="w-px h-4 bg-zinc-800 mx-1" />
                                    <button
                                        onClick={() => alert('Export as JSON')}
                                        className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                                    >
                                        JSON
                                    </button>
                                </div>
                                <button
                                    onClick={handleSaveHistory}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20"
                                >
                                    <Save className="w-4 h-4" />
                                    Save to History
                                </button>
                            </div>
                        </div>
                        {recommendations.length > 0 ? (
                            <Dashboard recommendations={recommendations} />
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-zinc-500 text-lg">
                                    No models found in the database for your query.
                                </div>
                                <p className="text-zinc-600 text-sm mt-2">
                                    Try a different search term or check your Supabase database.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
