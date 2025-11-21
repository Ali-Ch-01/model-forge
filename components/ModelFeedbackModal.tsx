'use client';

import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { submitModelFeedback } from '@/lib/supabase-helpers';
import { trackFeedback } from '@/lib/analytics';
import { toast } from 'sonner';

interface ModelFeedbackModalProps {
    modelName: string;
    queryId?: string;
    onClose: () => void;
}

export default function ModelFeedbackModal({ modelName, queryId, onClose }: ModelFeedbackModalProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [wasHelpful, setWasHelpful] = useState<boolean | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        setIsSubmitting(true);

        const success = await submitModelFeedback(
            supabase,
            modelName,
            rating,
            feedbackText || undefined,
            wasHelpful ?? undefined,
            queryId
        );

        if (success) {
            await trackFeedback(supabase, modelName, rating);
            toast.success('Thank you for your feedback!');
            onClose();
        } else {
            toast.error('Failed to submit feedback');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Rate this Model</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <p className="text-sm text-zinc-400 mb-2">Model: <span className="text-white font-medium">{modelName}</span></p>
                    </div>

                    {/* Star Rating */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-3">How would you rate this recommendation?</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= (hoverRating || rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-zinc-600'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Was Helpful */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-3">Was this recommendation helpful?</label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setWasHelpful(true)}
                                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${wasHelpful === true
                                        ? 'bg-green-600 text-white'
                                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                    }`}
                            >
                                👍 Yes
                            </button>
                            <button
                                type="button"
                                onClick={() => setWasHelpful(false)}
                                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${wasHelpful === false
                                        ? 'bg-red-600 text-white'
                                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                    }`}
                            >
                                👎 No
                            </button>
                        </div>
                    </div>

                    {/* Feedback Text */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Additional feedback (optional)</label>
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows={4}
                            placeholder="Tell us more about your experience..."
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || rating === 0}
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
