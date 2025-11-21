// Supabase client helper functions for ModelForge
import { createClient } from '@/utils/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import type {
    Profile,
    QueryHistory,
    QueryHistoryInsert,
    SavedModel,
    SavedModelInsert,
    UserPreferences,
    UserPreferencesInsert,
    ModelFeedback,
    ModelFeedbackInsert,
    UsageStatsInsert,
    UserDashboardStats
} from './database.types';

/**
 * Get the current user's profile
 */
export async function getUserProfile(supabase: SupabaseClient): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data;
}

/**
 * Update the current user's profile
 */
export async function updateUserProfile(
    supabase: SupabaseClient,
    updates: Partial<Profile>
): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id);

    if (error) {
        console.error('Error updating profile:', error);
        return false;
    }

    return true;
}

/**
 * Get user preferences
 */
export async function getUserPreferences(
    supabase: SupabaseClient
): Promise<UserPreferences | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error) {
        console.error('Error fetching preferences:', error);
        return null;
    }

    return data;
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
    supabase: SupabaseClient,
    updates: Partial<UserPreferencesInsert>
): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
        .from('user_preferences')
        .upsert({
            user_id: user.id,
            ...updates,
            updated_at: new Date().toISOString()
        });

    if (error) {
        console.error('Error updating preferences:', error);
        return false;
    }

    return true;
}

/**
 * Get all saved models for the current user
 */
export async function getSavedModels(supabase: SupabaseClient): Promise<SavedModel[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('saved_models')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching saved models:', error);
        return [];
    }

    return data || [];
}

/**
 * Save a model to favorites
 */
export async function saveModel(
    supabase: SupabaseClient,
    modelName: string,
    modelData: any,
    notes?: string
): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
        .from('saved_models')
        .insert({
            user_id: user.id,
            model_name: modelName,
            model_data: modelData,
            notes
        });

    if (error) {
        console.error('Error saving model:', error);
        return false;
    }

    return true;
}

/**
 * Remove a model from favorites
 */
export async function unsaveModel(
    supabase: SupabaseClient,
    modelId: string
): Promise<boolean> {
    const { error } = await supabase
        .from('saved_models')
        .delete()
        .eq('id', modelId);

    if (error) {
        console.error('Error unsaving model:', error);
        return false;
    }

    return true;
}

/**
 * Check if a model is saved
 */
export async function isModelSaved(
    supabase: SupabaseClient,
    modelName: string
): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
        .from('saved_models')
        .select('id')
        .eq('user_id', user.id)
        .eq('model_name', modelName)
        .single();

    return !error && !!data;
}

/**
 * Submit model feedback
 */
export async function submitModelFeedback(
    supabase: SupabaseClient,
    modelName: string,
    rating: number,
    feedbackText?: string,
    wasHelpful?: boolean,
    queryId?: string
): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
        .from('model_feedback')
        .insert({
            user_id: user.id,
            model_name: modelName,
            rating,
            feedback_text: feedbackText || null,
            was_helpful: wasHelpful !== undefined ? wasHelpful : null,
            query_id: queryId || null
        });

    if (error) {
        console.error('Error submitting feedback:', error);
        return false;
    }

    return true;
}

/**
 * Track usage event
 */
export async function trackEvent(
    supabase: SupabaseClient,
    eventType: string,
    metadata?: Record<string, any>
): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('usage_stats').insert({
        user_id: user.id,
        event_type: eventType,
        event_metadata: metadata
    });
}

/**
 * Get user dashboard statistics
 */
export async function getUserDashboardStats(
    supabase: SupabaseClient
): Promise<UserDashboardStats | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('user_dashboard_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error) {
        console.error('Error fetching dashboard stats:', error);
        return null;
    }

    return data;
}
