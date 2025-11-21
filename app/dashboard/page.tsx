'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import InputSection from '@/components/InputSection';
import Dashboard from '@/components/Dashboard';
import { UserInput, ModelRecommendation, getRecommendations } from '@/lib/recommendationEngine';
import { LogOut, Sparkles } from 'lucide-react';

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
