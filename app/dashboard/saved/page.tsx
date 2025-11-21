'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import { Heart, Trash2, Eye, Download, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import Dashboard from '@/components/Dashboard';
import EmptyState from '@/components/EmptyState';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import type { SavedModel } from '@/lib/database.types';
import { getSavedModels, unsaveModel } from '@/lib/supabase-helpers';

export default function SavedModelsPage() {
    const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedModel, setSelectedModel] = useState<SavedModel | null>(null);
    const supabase = createClient();

    useEffect(() => {
        loadSavedModels();
    }, []);

    const loadSavedModels = async () => {
        const models = await getSavedModels(supabase);
        setSavedModels(models);
        setIsLoading(false);
    };

    const handleDelete = async (modelId: string) => {
        const deletedModel = savedModels.find(m => m.id === modelId);

        // Optimistic update
        setSavedModels(prev => prev.filter(m => m.id !== modelId));
        if (selectedModel?.id === modelId) setSelectedModel(null);

        toast.promise(
            unsaveModel(supabase, modelId),
            {
                loading: 'Removing from favorites...',
                success: () => 'Model removed from favorites',
                error: () => {
                    // Restore on error
                    if (deletedModel) {
                        setSavedModels(prev => [deletedModel, ...prev]);
                    }
                    return 'Failed to remove model. Please try again.';
                },
            }
        );
    };

    const handleExport = (saved: SavedModel, format: 'pdf' | 'md' | 'json') => {
        const modelData = saved.model_data as any;
        const recommendations = modelData ? [modelData] : [];

        if (format === 'json') {
            const dataStr = JSON.stringify({
                model_name: saved.model_name,
                saved_date: saved.created_at,
                notes: saved.notes,
                model_data: modelData
            }, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `saved-${saved.model_name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success('Exported as JSON');
        } else if (format === 'md') {
            let mdContent = `# ${saved.model_name}\n\n`;
            mdContent += `**Saved on:** ${new Date(saved.created_at).toLocaleDateString()}\n\n`;
            if (saved.notes) mdContent += `**Notes:** ${saved.notes}\n\n`;

            if (modelData) {
                mdContent += `## Description\n${modelData.description}\n\n`;
                if (modelData.suitabilityScore) mdContent += `**Suitability Score:** ${modelData.suitabilityScore}%\n\n`;
                if (modelData.pros?.length) mdContent += `### Pros\n${modelData.pros.map((p: string) => `- ${p}`).join('\n')}\n\n`;
                if (modelData.cons?.length) mdContent += `### Cons\n${modelData.cons.map((c: string) => `- ${c}`).join('\n')}\n\n`;
                if (modelData.use_cases?.length) mdContent += `### Use Cases\n${modelData.use_cases.map((u: string) => `- ${u}`).join('\n')}\n\n`;
                if (modelData.mlopsBestPractices?.length) mdContent += `### MLOps Best Practices\n${modelData.mlopsBestPractices.map((m: string) => `- ${m}`).join('\n')}\n\n`;

                // Architecture Diagram
                if (modelData.architectureDiagram) {
                    mdContent += `### Architecture Diagram\n\`\`\`mermaid\n${modelData.architectureDiagram}\n\`\`\`\n\n`;
                }

                // Training Code
                if (modelData.trainingCode?.length) {
                    mdContent += `### Training Code\n\n`;
                    modelData.trainingCode.forEach((code: any) => {
                        mdContent += `#### ${code.framework.toUpperCase()}\n\`\`\`python\n${code.code}\n\`\`\`\n\n`;
                    });
                }
            }

            const blob = new Blob([mdContent], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `saved-${saved.model_name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success('Exported as Markdown');
        } else if (format === 'pdf') {
            const doc = new jsPDF();

            // Title
            doc.setFontSize(22);
            doc.setTextColor(41, 128, 185);
            doc.text(saved.model_name, 20, 20);

            // Meta info
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Saved: ${new Date(saved.created_at).toLocaleDateString()}`, 20, 30);

            let yPos = 35;
            if (saved.notes) {
                const splitNotes = doc.splitTextToSize(`Notes: ${saved.notes}`, 170);
                doc.text(splitNotes, 20, yPos);
                yPos += (splitNotes.length * 5) + 10;
            }

            if (modelData) {
                // Score
                if (modelData.suitabilityScore) {
                    doc.setFontSize(12);
                    doc.setTextColor(39, 174, 96);
                    doc.text(`Suitability Score: ${modelData.suitabilityScore}%`, 20, yPos);
                    yPos += 10;
                }

                // Description
                doc.setFontSize(11);
                doc.setTextColor(60);
                const desc = doc.splitTextToSize(modelData.description, 170);
                doc.text(desc, 20, yPos);
                yPos += (desc.length * 6) + 5;

                // Helper function for lists
                const addListSection = (title: string, items: string[]) => {
                    if (items && items.length > 0) {
                        if (yPos > 250) { doc.addPage(); yPos = 20; }
                        doc.setFontSize(11);
                        doc.setTextColor(0);
                        doc.text(title, 20, yPos);
                        yPos += 6;
                        doc.setFontSize(10);
                        doc.setTextColor(80);
                        items.forEach((item: string) => {
                            if (yPos > 270) { doc.addPage(); yPos = 20; }
                            const splitItem = doc.splitTextToSize(`• ${item}`, 160);
                            doc.text(splitItem, 25, yPos);
                            yPos += (splitItem.length * 5) + 2;
                        });
                        yPos += 5;
                    }
                };

                addListSection('Pros:', modelData.pros);
                addListSection('Cons:', modelData.cons);
                addListSection('Use Cases:', modelData.use_cases);
                addListSection('MLOps Best Practices:', modelData.mlopsBestPractices);

                // Architecture Diagram
                if (modelData.architectureDiagram) {
                    if (yPos > 230) { doc.addPage(); yPos = 20; }
                    doc.setFontSize(11);
                    doc.setTextColor(0);
                    doc.text('Architecture Diagram (Mermaid Code):', 20, yPos);
                    yPos += 6;
                    doc.setFontSize(8);
                    doc.setTextColor(100);
                    doc.setFont("courier");
                    const splitDiagram = doc.splitTextToSize(modelData.architectureDiagram, 170);
                    doc.text(splitDiagram, 20, yPos);
                    yPos += (splitDiagram.length * 4) + 10;
                    doc.setFont("helvetica");
                }
            }

            doc.save(`saved-${saved.model_name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`);
            toast.success('Exported as PDF');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <h1 className="text-3xl font-bold text-white">Saved Models</h1>
            </div>

            {isLoading ? (
                <div className="text-center py-20 text-zinc-500">Loading saved models...</div>
            ) : savedModels.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                    <Heart className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No saved models yet</h3>
                    <p className="text-zinc-400 mb-6">Models you save will appear here for quick access.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {savedModels.map((saved, i) => {
                        const modelData = saved.model_data as any;

                        return (
                            <motion.div
                                key={saved.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-pink-500/30 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {saved.model_name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <Calendar className="w-3 h-3" />
                                            Saved {new Date(saved.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* Download Options */}
                                        <div className="flex items-center bg-zinc-800 rounded-lg p-1 gap-1">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleExport(saved, 'pdf'); }}
                                                className="px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                                                title="Download PDF"
                                            >
                                                PDF
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleExport(saved, 'md'); }}
                                                className="px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                                                title="Download Markdown"
                                            >
                                                MD
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleExport(saved, 'json'); }}
                                                className="px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                                                title="Download JSON"
                                            >
                                                JSON
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(saved.id)}
                                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                            title="Remove from favorites"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {saved.notes && (
                                    <div className="mb-4 p-3 bg-zinc-800/50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <FileText className="w-3 h-3 text-zinc-400" />
                                            <span className="text-xs font-medium text-zinc-400">Notes</span>
                                        </div>
                                        <p className="text-sm text-zinc-300">{saved.notes}</p>
                                    </div>
                                )}

                                {modelData && (
                                    <div className="space-y-2 text-sm">
                                        <p className="text-zinc-400 line-clamp-2">
                                            {modelData.description || 'No description'}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded">
                                                Score: {modelData.suitabilityScore || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={() => setSelectedModel(saved)}
                                    className="mt-4 w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    View Details
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Detail Modal */}
            {selectedModel && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedModel(null)}>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-white mb-4">{selectedModel.model_name}</h2>
                        <Dashboard recommendations={selectedModel.model_data ? [selectedModel.model_data] : []} />
                        <button
                            onClick={() => setSelectedModel(null)}
                            className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
