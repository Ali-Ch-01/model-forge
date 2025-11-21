'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, ArrowRight, Sparkles } from 'lucide-react';
import { UserInput, TaskType, DataType } from '@/lib/recommendationEngine';
import clsx from 'clsx';

interface InputSectionProps {
    onSubmit: (input: UserInput) => void;
    isLoading: boolean;
}

export default function InputSection({ onSubmit, isLoading }: InputSectionProps) {
    const [mode, setMode] = useState<'natural' | 'structured'>('natural');
    const [description, setDescription] = useState('');
    const [structuredData, setStructuredData] = useState<UserInput>({
        taskType: 'classification',
        dataType: 'image',
        constraints: { latency: 'medium', modelSize: 'medium' }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'natural') {
            onSubmit({ description });
        } else {
            onSubmit(structuredData);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-12">
            <div className="flex justify-center mb-8">
                <div className="bg-zinc-800/50 p-1 rounded-full backdrop-blur-sm border border-zinc-700/50">
                    <button
                        onClick={() => setMode('natural')}
                        className={clsx(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            mode === 'natural'
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                                : "text-zinc-400 hover:text-white"
                        )}
                    >
                        Natural Language
                    </button>
                    <button
                        onClick={() => setMode('structured')}
                        className={clsx(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            mode === 'structured'
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                                : "text-zinc-400 hover:text-white"
                        )}
                    >
                        Structured Form
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-1 shadow-2xl"
            >
                <form onSubmit={handleSubmit} className="relative">
                    {mode === 'natural' ? (
                        <div className="relative">
                            <div className="absolute top-4 left-4 text-zinc-500">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your ML problem (e.g., 'I need a model to classify X-ray images for pneumonia detection with low latency')"
                                className="w-full bg-transparent text-white placeholder-zinc-500 pl-12 pr-32 py-4 rounded-xl focus:outline-none focus:ring-0 resize-none min-h-[120px] text-lg"
                            />
                            <div className="absolute bottom-4 right-4">
                                <button
                                    type="submit"
                                    disabled={isLoading || !description.trim()}
                                    className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Thinking...' : 'Generate'}
                                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Data Type</label>
                                    <select
                                        value={structuredData.dataType}
                                        onChange={(e) => setStructuredData({ ...structuredData, dataType: e.target.value as DataType })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    >
                                        <option value="image">Image</option>
                                        <option value="text">Text</option>
                                        <option value="tabular">Tabular</option>
                                        <option value="audio">Audio</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Task Type</label>
                                    <select
                                        value={structuredData.taskType}
                                        onChange={(e) => setStructuredData({ ...structuredData, taskType: e.target.value as TaskType })}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    >
                                        <option value="classification">Classification</option>
                                        <option value="regression">Regression</option>
                                        <option value="clustering">Clustering</option>
                                        <option value="nlp">NLP</option>
                                        <option value="vision">Computer Vision</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25 disabled:opacity-50"
                                >
                                    {isLoading ? 'Analyzing...' : 'Find Models'}
                                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    );
}
