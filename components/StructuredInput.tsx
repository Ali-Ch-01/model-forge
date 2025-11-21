'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Database, Activity, Layers, Clock, Cpu } from 'lucide-react';
import { UserInput, TaskType, DataType } from '@/lib/recommendationEngine';

interface StructuredInputProps {
    onSubmit: (input: UserInput) => void;
    isLoading: boolean;
}

export default function StructuredInput({ onSubmit, isLoading }: StructuredInputProps) {
    const [step, setStep] = useState(1);
    const [input, setInput] = useState<UserInput>({
        description: '',
        taskType: 'classification',
        dataType: 'tabular',
        constraints: { latency: 'real-time', modelSize: 'medium' }
    });

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else onSubmit(input);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute left-0 top-1/2 w-full h-1 bg-zinc-800 -z-10 rounded-full" />
                <div
                    className="absolute left-0 top-1/2 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                />
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-blue-600 text-white scale-110' : 'bg-zinc-800 text-zinc-500'
                            }`}
                    >
                        {s}
                    </div>
                ))}
            </div>

            <div className="min-h-[300px]">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Describe your problem</h2>
                            <p className="text-zinc-400">What are you trying to build?</p>
                        </div>
                        <textarea
                            value={input.description}
                            onChange={(e) => setInput({ ...input, description: e.target.value })}
                            placeholder="e.g., I need to detect anomalies in real-time sensor data from manufacturing equipment to predict failures before they happen..."
                            className="w-full h-40 bg-black/50 border border-zinc-700 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Data & Task Details</h2>
                            <p className="text-zinc-400">Help us understand your data.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <Database className="w-4 h-4 text-blue-400" />
                                    Data Type
                                </label>
                                <select
                                    value={input.dataType}
                                    onChange={(e) => setInput({ ...input, dataType: e.target.value as DataType })}
                                    className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="tabular">Tabular (CSV, SQL)</option>
                                    <option value="image">Image / Computer Vision</option>
                                    <option value="text">Text / NLP</option>
                                    <option value="audio">Audio / Speech</option>
                                    <option value="video">Video</option>
                                    <option value="time_series">Time Series</option>
                                    <option value="multimodal">Multimodal</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-400" />
                                    Task Type
                                </label>
                                <select
                                    value={input.taskType}
                                    onChange={(e) => setInput({ ...input, taskType: e.target.value as TaskType })}
                                    className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="classification">Classification</option>
                                    <option value="regression">Regression</option>
                                    <option value="clustering">Clustering</option>
                                    <option value="nlp">NLP (Generation/Translation)</option>
                                    <option value="vision">Object Detection / Segmentation</option>
                                    <option value="forecasting">Forecasting</option>
                                    <option value="anomaly_detection">Anomaly Detection</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-300">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Constraints</h2>
                            <p className="text-zinc-400">Any specific requirements?</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-orange-400" />
                                    Latency Requirement
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['real-time', 'batch', 'offline'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setInput({ ...input, constraints: { ...input.constraints, latency: opt } })}
                                            className={`p-3 rounded-lg border text-sm capitalize transition-all ${input.constraints?.latency === opt
                                                ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                                : 'bg-black/50 border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-purple-400" />
                                    Model Size / Resource
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['tiny', 'medium', 'large'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setInput({ ...input, constraints: { ...input.constraints, modelSize: opt } })}
                                            className={`p-3 rounded-lg border text-sm capitalize transition-all ${input.constraints?.modelSize === opt
                                                ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                                                : 'bg-black/50 border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-8 pt-8 border-t border-zinc-800">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    disabled={isLoading || (step === 1 && !input.description)}
                    className="px-8 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all flex items-center gap-2"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : step === 3 ? (
                        <>
                            Generate Recommendations <Sparkles className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Next <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
