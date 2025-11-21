
'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import InputSection from '@/components/InputSection';
import Dashboard from '@/components/Dashboard';
import { UserInput, ModelRecommendation, getRecommendations } from '@/lib/recommendationEngine';
import { Save, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
    const [recommendations, setRecommendations] = useState<ModelRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [lastQuery, setLastQuery] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleSearch = async (input: UserInput) => {
        setIsLoading(true);
        setLastQuery(input.description || '');
        try {
            const results = await getRecommendations(input);
            setRecommendations(results);
            setHasSearched(true);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            toast.error('Failed to fetch recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveHistory = async () => {
        if (!recommendations.length) return;

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error('Please sign in to save history');
                return;
            }

            const { error } = await supabase.from('query_history').insert({
                user_id: user.id,
                query_text: lastQuery || recommendations[0].description,
                recommended_models: recommendations,
                hf_inference_success: true
            });

            if (error) throw error;
            toast.success('Saved to history!');
        } catch (error) {
            console.error('Error saving history:', error);
            toast.error('Failed to save history');
        }
    };

    const handleExportJSON = () => {
        if (!recommendations.length) return;
        const dataStr = JSON.stringify({
            query: lastQuery,
            date: new Date().toISOString(),
            recommendations
        }, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `modelforge-recommendations-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('Exported as JSON');
    };

    const handleExportMarkdown = () => {
        if (!recommendations.length) return;
        let mdContent = `# ModelForge Recommendations\n\n`;
        mdContent += `**Date:** ${new Date().toLocaleDateString()}\n`;
        mdContent += `**Query:** ${lastQuery || recommendations[0].description}\n\n`;

        recommendations.forEach((rec, index) => {
            mdContent += `## ${index + 1}. ${rec.name}\n\n`;
            mdContent += `**Suitability Score:** ${rec.suitabilityScore}%\n\n`;
            mdContent += `### Description\n${rec.description}\n\n`;

            if (rec.pros && rec.pros.length) {
                mdContent += `### Pros\n${rec.pros.map(p => `- ${p}`).join('\n')}\n\n`;
            }

            if (rec.cons && rec.cons.length) {
                mdContent += `### Cons\n${rec.cons.map(c => `- ${c}`).join('\n')}\n\n`;
            }

            if (rec.use_cases && rec.use_cases.length) {
                mdContent += `### Use Cases\n${rec.use_cases.map(u => `- ${u}`).join('\n')}\n\n`;
            }

            if (rec.mlopsBestPractices && rec.mlopsBestPractices.length) {
                mdContent += `### MLOps Best Practices\n${rec.mlopsBestPractices.map(p => `- ${p}`).join('\n')}\n\n`;
            }

            mdContent += `### Architecture Diagram (Mermaid)\n\`\`\`mermaid\n${rec.architectureDiagram}\n\`\`\`\n\n`;
            mdContent += `---\n\n`;
        });

        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `modelforge-recommendations-${new Date().toISOString().split('T')[0]}.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('Exported as Markdown');
    };

    const handleExportPDF = async () => {
        if (!recommendations.length) return;
        try {
            const jsPDF = (await import('jspdf')).default;
            const doc = new jsPDF();

            // Title
            doc.setFontSize(22);
            doc.setTextColor(41, 128, 185); // Blue
            doc.text('ModelForge Recommendations', 20, 20);

            // Meta info
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);

            const splitQuery = doc.splitTextToSize(`Query: ${lastQuery}`, 170);
            doc.text(splitQuery, 20, 35);

            let yPos = 35 + (splitQuery.length * 5) + 10;

            recommendations.forEach((rec, index) => {
                // New page if running out of space
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }

                // Model Name
                doc.setFontSize(16);
                doc.setTextColor(0);
                doc.text(`${index + 1}. ${rec.name}`, 20, yPos);
                yPos += 10;

                // Score
                doc.setFontSize(12);
                doc.setTextColor(39, 174, 96); // Green
                doc.text(`Suitability Score: ${rec.suitabilityScore}%`, 20, yPos);
                yPos += 10;

                // Description
                doc.setFontSize(11);
                doc.setTextColor(60);
                const splitDesc = doc.splitTextToSize(rec.description, 170);
                doc.text(splitDesc, 20, yPos);
                yPos += (splitDesc.length * 6) + 5;

                // Helper to add list section
                const addListSection = (title: string, items: string[]) => {
                    if (items && items.length > 0) {
                        if (yPos > 250) { doc.addPage(); yPos = 20; }
                        doc.setFontSize(11);
                        doc.setTextColor(0);
                        doc.text(title, 20, yPos);
                        yPos += 6;
                        doc.setFontSize(10);
                        doc.setTextColor(80);
                        items.forEach(item => {
                            if (yPos > 270) { doc.addPage(); yPos = 20; }
                            const splitItem = doc.splitTextToSize(`• ${item}`, 160);
                            doc.text(splitItem, 25, yPos);
                            yPos += (splitItem.length * 5) + 2;
                        });
                        yPos += 5;
                    }
                };

                addListSection('Pros:', rec.pros);
                addListSection('Cons:', rec.cons);
                addListSection('Use Cases:', rec.use_cases);
                addListSection('MLOps Best Practices:', rec.mlopsBestPractices);

                // Architecture Diagram (Text Representation)
                if (yPos > 230) { doc.addPage(); yPos = 20; }
                doc.setFontSize(11);
                doc.setTextColor(0);
                doc.text('Architecture Diagram (Mermaid Code):', 20, yPos);
                yPos += 6;
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.setFont("courier");

                const splitDiagram = doc.splitTextToSize(rec.architectureDiagram, 170);
                doc.text(splitDiagram, 20, yPos);
                yPos += (splitDiagram.length * 4) + 10;
                doc.setFont("helvetica"); // Reset font

                // Separator
                doc.setDrawColor(200);
                doc.line(20, yPos, 190, yPos);
                yPos += 15;
            });

            doc.save(`modelforge-recommendations-${new Date().toISOString().split('T')[0]}.pdf`);
            toast.success('Exported as PDF');
        } catch (error) {
            console.error('PDF Export Error:', error);
            toast.error('Failed to export PDF');
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px]" />
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
                                        onClick={handleExportPDF}
                                        className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                                    >
                                        PDF
                                    </button>
                                    <div className="w-px h-4 bg-zinc-800 mx-1" />
                                    <button
                                        onClick={handleExportMarkdown}
                                        className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                                    >
                                        MD
                                    </button>
                                    <div className="w-px h-4 bg-zinc-800 mx-1" />
                                    <button
                                        onClick={handleExportJSON}
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
