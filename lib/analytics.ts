// Analytics tracking utility for ModelForge
import { createClient } from '@/utils/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';

export type EventType =
    | 'query_submitted'
    | 'model_saved'
    | 'model_unsaved'
    | 'export_pdf'
    | 'export_markdown'
    | 'export_json'
    | 'feedback_submitted'
    | 'history_viewed'
    | 'history_deleted'
    | 'settings_updated'
    | 'profile_updated';

export interface EventMetadata {
    query_length?: number;
    model_name?: string;
    rating?: number;
    export_format?: string;
    [key: string]: any;
}

/**
 * Track a user event
 */
export async function trackEvent(
    supabase: SupabaseClient,
    eventType: EventType,
    metadata?: EventMetadata
): Promise<void> {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase.from('usage_stats').insert({
            user_id: user.id,
            event_type: eventType,
            event_metadata: metadata || {}
        });
    } catch (error) {
        // Silent fail - don't break user experience for analytics
        console.error('Analytics tracking error:', error);
    }
}

/**
 * Track query submission
 */
export async function trackQuery(
    supabase: SupabaseClient,
    queryText: string,
    modelCount: number
): Promise<void> {
    await trackEvent(supabase, 'query_submitted', {
        query_length: queryText.length,
        model_count: modelCount
    });
}

/**
 * Track export action
 */
export async function trackExport(
    supabase: SupabaseClient,
    format: 'pdf' | 'markdown' | 'json'
): Promise<void> {
    const eventMap: Record<typeof format, EventType> = {
        pdf: 'export_pdf',
        markdown: 'export_markdown',
        json: 'export_json'
    };

    await trackEvent(supabase, eventMap[format], {
        export_format: format
    });
}

/**
 * Track model save/unsave
 */
export async function trackModelSave(
    supabase: SupabaseClient,
    modelName: string,
    action: 'saved' | 'unsaved'
): Promise<void> {
    await trackEvent(supabase, action === 'saved' ? 'model_saved' : 'model_unsaved', {
        model_name: modelName
    });
}

/**
 * Track feedback submission
 */
export async function trackFeedback(
    supabase: SupabaseClient,
    modelName: string,
    rating: number
): Promise<void> {
    await trackEvent(supabase, 'feedback_submitted', {
        model_name: modelName,
        rating
    });
}
