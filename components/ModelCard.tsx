'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star } from 'lucide-react';
import { ModelRecommendation } from '@/lib/recommendationEngine';

interface ModelCardProps {
    model: ModelRecommendation;
    isSelected: boolean;
    onClick: () => void;
}

export default function ModelCard({ model, isSelected, onClick }: ModelCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${isSelected
                    ? 'bg-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-500/20'
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
    );
}
