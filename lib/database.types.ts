// Database type definitions for ModelForge Supabase tables
// Generated from schema.sql and extended-schema.sql

export interface Profile {
    id: string; // UUID
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    company: string | null;
    role: string | null; // e.g., 'Data Scientist', 'ML Engineer', 'Student'
    bio: string | null;
    subscription_tier: 'free' | 'pro' | 'enterprise';
    credits_remaining: number;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

export interface SavedModel {
    id: string; // UUID
    user_id: string; // UUID
    model_name: string; // Model name as identifier
    model_data: any; // JSONB - Store full ModelRecommendation object
    notes: string | null;
    created_at: string; // ISO timestamp
}

export interface QueryHistory {
    id: string; // UUID
    user_id: string; // UUID
    query_text: string;
    query_type: string | null; // 'natural_language' or 'structured'
    inferred_data_type: string | null; // 'image', 'text', 'tabular', 'audio'
    inferred_task_type: string | null; // 'classification', 'regression', etc.
    recommended_models: any; // JSONB - Store ModelRecommendation[]
    execution_time_ms: number | null;
    hf_inference_success: boolean;
    created_at: string; // ISO timestamp
}

export interface UserPreferences {
    user_id: string; // UUID - primary key
    preferred_frameworks: string[]; // ['pytorch', 'tensorflow', 'sklearn']
    preferred_deployment: 'cloud' | 'edge' | 'mobile';
    notifications_enabled: boolean;
    theme: 'dark' | 'light';
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

export interface ModelFeedback {
    id: string; // UUID
    user_id: string; // UUID
    model_id: string; // UUID - references model recommendations
    rating: number; // 1-5
    feedback_text: string | null;
    was_helpful: boolean | null;
    created_at: string; // ISO timestamp
}

export interface UsageStats {
    id: string; // UUID
    user_id: string; // UUID
    event_type: string; // e.g., 'query', 'save_model', 'export_code'
    event_metadata: Record<string, any> | null; // JSONB
    timestamp: string; // ISO timestamp
}

export interface UserDashboardStats {
    user_id: string; // UUID
    full_name: string | null;
    subscription_tier: string;
    credits_remaining: number;
    total_queries: number;
    saved_models_count: number;
    feedback_given_count: number;
}

// Helper type for Supabase query results
export type Tables = {
    profiles: Profile;
    saved_models: SavedModel;
    query_history: QueryHistory;
    user_preferences: UserPreferences;
    model_feedback: ModelFeedback;
    usage_stats: UsageStats;
};

// Insert types (omit auto-generated fields)
export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'> & {
    created_at?: string;
    updated_at?: string;
};

export type QueryHistoryInsert = Omit<QueryHistory, 'id' | 'created_at'> & {
    id?: string;
    created_at?: string;
};

export type SavedModelInsert = Omit<SavedModel, 'id' | 'created_at'> & {
    id?: string;
    created_at?: string;
};

export type UserPreferencesInsert = Omit<UserPreferences, 'created_at' | 'updated_at'> & {
    created_at?: string;
    updated_at?: string;
};

export type ModelFeedbackInsert = Omit<ModelFeedback, 'id' | 'created_at'> & {
    id?: string;
    created_at?: string;
};

export type UsageStatsInsert = Omit<UsageStats, 'id' | 'timestamp'> & {
    id?: string;
    timestamp?: string;
};
