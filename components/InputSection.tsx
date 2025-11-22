'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Database, Layout, Server, Clock, HardDrive, Activity, BookOpen, RefreshCw, Globe } from 'lucide-react';
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
        datasetSize: 'medium',
        performancePriority: 'balance',
        deploymentTarget: 'cloud-gpu',
        latencyRequirement: 'moderate',
        modelSizeConstraint: 'medium',
        hardwareBudget: 'moderate',
        trainingDataQuality: 'labeled',
        interpretabilityNeed: 'nice',
        updateFrequency: 'weekly',
        domain: 'general'
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
        <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="flex justify-center mb-8">
                <div className="bg-zinc-100/50 dark:bg-zinc-800/50 p-1 rounded-full backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50">
                    <button
                        onClick={() => setMode('natural')}
                        className={clsx(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            mode === 'natural'
                                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        )}
                    >
                        Natural Language
                    </button>
                    <button
                        onClick={() => setMode('structured')}
                        className={clsx(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            mode === 'structured'
                                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
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
                className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-1 shadow-2xl"
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
                                className="w-full bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 pl-12 pr-32 py-4 rounded-xl focus:outline-none focus:ring-0 resize-none min-h-[120px] text-lg"
                            />
                            <div className="absolute bottom-4 right-4">
                                <button
                                    type="submit"
                                    disabled={isLoading || !description.trim()}
                                    className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Thinking...' : 'Generate'}
                                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Data Type */}
                                <div className="space-y-2">
                                    <label htmlFor="data-type" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Data Type</label>
                                    <select
                                        id="data-type"
                                        aria-label="Select data type for your ML project"
                                        value={structuredData.dataType}
                                        onChange={(e) => setStructuredData({ ...structuredData, dataType: e.target.value as DataType })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    >
                                        <option value="image">Image</option>
                                        <option value="text">Text</option>
                                        <option value="tabular">Tabular</option>
                                        <option value="audio">Audio</option>
                                        <option value="video">Video</option>
                                        <option value="time_series">Time Series</option>
                                        <option value="multimodal">Multimodal</option>
                                    </select>
                                </div>

                                {/* Task Type */}
                                <div className="space-y-2">
                                    <label htmlFor="task-type" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Task Type</label>
                                    <select
                                        id="task-type"
                                        aria-label="Select task type"
                                        value={structuredData.taskType}
                                        onChange={(e) => setStructuredData({ ...structuredData, taskType: e.target.value as TaskType })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    >
                                        <option value="classification">Classification</option>
                                        <option value="regression">Regression</option>
                                        <option value="clustering">Clustering</option>
                                        <option value="nlp">NLP</option>
                                        <option value="vision">Computer Vision</option>
                                        <option value="forecasting">Forecasting</option>
                                        <option value="anomaly_detection">Anomaly Detection</option>
                                        <option value="multimodal_reasoning">Multimodal Reasoning</option>
                                    </select>
                                </div>

                                {/* Dataset Size */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Dataset Size</label>
                                    <select
                                        value={structuredData.datasetSize}
                                        onChange={(e) => setStructuredData({ ...structuredData, datasetSize: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="small">Small (&lt;1K samples)</option>
                                        <option value="medium">Medium (1K-100K)</option>
                                        <option value="large">Large (100K-1M)</option>
                                        <option value="very-large">Very Large (&gt;1M)</option>
                                    </select>
                                </div>

                                {/* Performance Priority */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Performance Priority</label>
                                    <select
                                        value={structuredData.performancePriority}
                                        onChange={(e) => setStructuredData({ ...structuredData, performancePriority: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="accuracy">Accuracy</option>
                                        <option value="speed">Speed</option>
                                        <option value="balance">Balance</option>
                                    </select>
                                </div>

                                {/* Deployment Target */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Deployment Target</label>
                                    <select
                                        value={structuredData.deploymentTarget}
                                        onChange={(e) => setStructuredData({ ...structuredData, deploymentTarget: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="cloud-gpu">Cloud GPU</option>
                                        <option value="cloud-cpu">Cloud CPU</option>
                                        <option value="edge">Edge Device</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="browser">Browser (WASM/TensorFlow.js)</option>
                                    </select>
                                </div>

                                {/* Latency Requirement */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Latency Requirement</label>
                                    <select
                                        value={structuredData.latencyRequirement}
                                        onChange={(e) => setStructuredData({ ...structuredData, latencyRequirement: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="realtime">Real-time (&lt;100ms)</option>
                                        <option value="fast">Fast (&lt;1s)</option>
                                        <option value="moderate">Moderate (&lt;5s)</option>
                                        <option value="batch">Batch OK</option>
                                    </select>
                                </div>

                                {/* Model Size Constraint */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Model Size Constraint</label>
                                    <select
                                        value={structuredData.modelSizeConstraint}
                                        onChange={(e) => setStructuredData({ ...structuredData, modelSizeConstraint: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="tiny">Tiny (&lt;10MB)</option>
                                        <option value="small">Small (&lt;100MB)</option>
                                        <option value="medium">Medium (&lt;500MB)</option>
                                        <option value="large">Large (No limit)</option>
                                    </select>
                                </div>

                                {/* Hardware Budget */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Hardware Budget</label>
                                    <select
                                        value={structuredData.hardwareBudget}
                                        onChange={(e) => setStructuredData({ ...structuredData, hardwareBudget: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="limited">Limited (CPU only)</option>
                                        <option value="moderate">Moderate (Consumer GPU)</option>
                                        <option value="high-end">High-end (Enterprise GPU)</option>
                                    </select>
                                </div>

                                {/* Training Data Quality */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Training Data Quality</label>
                                    <select
                                        value={structuredData.trainingDataQuality}
                                        onChange={(e) => setStructuredData({ ...structuredData, trainingDataQuality: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="labeled">Fully Labeled</option>
                                        <option value="partially-labeled">Partially Labeled</option>
                                        <option value="unlabeled">Unlabeled</option>
                                    </select>
                                </div>

                                {/* Interpretability Need */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Interpretability Need</label>
                                    <select
                                        value={structuredData.interpretabilityNeed}
                                        onChange={(e) => setStructuredData({ ...structuredData, interpretabilityNeed: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="critical">Critical (Healthcare, Finance)</option>
                                        <option value="important">Important</option>
                                        <option value="nice">Nice to have</option>
                                        <option value="none">Not needed</option>
                                    </select>
                                </div>

                                {/* Update Frequency */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Update Frequency</label>
                                    <select
                                        value={structuredData.updateFrequency}
                                        onChange={(e) => setStructuredData({ ...structuredData, updateFrequency: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="realtime">Real-time Learning</option>
                                        <option value="daily">Daily Updates</option>
                                        <option value="weekly">Weekly Updates</option>
                                        <option value="static">Static Model</option>
                                    </select>
                                </div>

                                {/* Domain */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Domain</label>
                                    <select
                                        value={structuredData.domain}
                                        onChange={(e) => setStructuredData({ ...structuredData, domain: e.target.value as any })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    >
                                        <option value="general">General</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="finance">Finance</option>
                                        <option value="retail">Retail/E-commerce</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-cyan-600 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/25 disabled:opacity-50"
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
