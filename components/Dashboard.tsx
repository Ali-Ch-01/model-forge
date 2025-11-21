'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModelRecommendation } from '@/lib/recommendationEngine';
import ModelCard from './ModelCard';
import ArchitectureDiagram from './ArchitectureDiagram';
import CodeGenerator from './CodeGenerator';
import MLOpsPanel from './MLOpsPanel';

interface DashboardProps {
    recommendations: ModelRecommendation[];
}

export default function Dashboard({ recommendations }: DashboardProps) {
    const [selectedModelId, setSelectedModelId] = useState<string>(recommendations[0]?.id);

    const selectedModel = recommendations.find(m => m.id === selectedModelId) || recommendations[0];

    if (!recommendations.length) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Model Cards + MLOps Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="space-y-4">
                        {recommendations.map((model) => (
                            <ModelCard
                                key={model.id}
                                model={model}
                                isSelected={model.id === selectedModel.id}
                                onClick={() => setSelectedModelId(model.id)}
                            />
                        ))}
                    </div>

                    {/* MLOps Panel - now in left column */}
                    <section className="mt-6">
                        <MLOpsPanel practices={selectedModel.mlopsBestPractices} />
                    </section>
                </div>

                {/* Right Column: Architecture & Code */}
                <div className="lg:col-span-2 space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedModel.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Architecture Diagram */}
                            <section>
                                <h3 className="text-lg font-semibold text-zinc-300 mb-3">Architecture Diagram</h3>
                                <ArchitectureDiagram chart={selectedModel.architectureDiagram} />
                            </section>

                            {/* Code Generator */}
                            <section>
                                <h3 className="text-lg font-semibold text-zinc-300 mb-3">Training Code Boilerplate</h3>
                                <CodeGenerator codeSnippets={selectedModel.trainingCode} />
                            </section>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
