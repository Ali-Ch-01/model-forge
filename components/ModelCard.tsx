'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Heart, MessageSquare } from 'lucide-react';
import { ModelRecommendation } from '@/lib/recommendationEngine';
import ModelFeedbackModal from './ModelFeedbackModal';
import { createClient } from '@/utils/supabase/client';
import { saveModel, isModelSaved } from '@/lib/supabase-helpers';
import { trackModelSave } from '@/lib/analytics';
import { toast } from 'sonner';

interface ModelCardProps {
    model: ModelRecommendation;
    isSelected: boolean;
    onClick: () => void;
}

export default function ModelCard({ model, isSelected, onClick }: ModelCardProps) {
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const supabase = createClient();

    const handleSave = async (e: React.MouseEvent) => {
        e.stopPropagation();

        toast.promise(
            saveModel(supabase, model.name, model),
            {
                loading: 'Saving model...',
                success: async () => {
                    setIsSaved(true);
                    await trackModelSave(supabase, model.name, 'saved');
                    return 'Model saved to favorites';
                },
                error: () => 'Failed to save model. Please try again.',
            }
        );
    };

    const handleFeedback = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowFeedbackModal(true);
    };

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${isSelected
                    ? 'bg-cyan-600/10 border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                        <p className="text-sm text-zinc-400 line-clamp-2">{model.description}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-white">{model.suitabilityScore}%</span>
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaved}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${isSaved
                            ? 'bg-pink-600 text-white cursor-default'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button
                        onClick={handleFeedback}
                        className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Feedback
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Pros</h4>
                        <ul className="space-y-1">
                            {model.pros.map((pro, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>{pro}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Cons</h4>
                        <ul className="space-y-1">
                            {model.cons.map((con, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <span>{con}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>

            {showFeedbackModal && (
                <ModelFeedbackModal
                    modelName={model.name}
                    onClose={() => setShowFeedbackModal(false)}
                />
            )}
        </>
    );
}
