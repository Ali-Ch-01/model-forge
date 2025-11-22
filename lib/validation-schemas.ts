import { z } from 'zod';

// Schema for natural language input
export const naturalLanguageSchema = z.object({
    description: z.string()
        .min(10, 'Please provide at least 10 characters to describe your project')
        .max(1000, 'Description is too long. Please keep it under 1000 characters')
        .refine(
            (val) => val.trim().length > 0,
            { message: 'Description cannot be empty or just whitespace' }
        ),
});

// Schema for structured input
export const structuredInputSchema = z.object({
    dataType: z.enum(['image', 'text', 'tabular', 'audio', 'video', 'time_series', 'multimodal'] as const, {
        message: 'Please select a valid data type',
    }),
    taskType: z.enum([
        'classification',
        'regression',
        'clustering',
        'nlp',
        'vision',
        'forecasting',
        'anomaly_detection',
        'multimodal_reasoning'
    ] as const, {
        message: 'Please select a valid task type',
    }),
    datasetSize: z.enum(['small', 'medium', 'large', 'very-large'] as const, {
        message: 'Please select a dataset size',
    }),
    deploymentTarget: z.enum(['cloud', 'edge', 'mobile', 'server'] as const, {
        message: 'Please select a deployment target',
    }),
    performanceRequirement: z.enum(['speed', 'accuracy', 'balanced'] as const, {
        message: 'Please select a performance requirement',
    }),
    framework: z.enum(['pytorch', 'tensorflow', 'sklearn', 'no-preference'] as const, {
        message: 'Please select a preferred framework',
    }).optional(),
    budget: z.enum(['low', 'medium', 'high'] as const, {
        message: 'Please select a budget constraint',
    }).optional(),
});

// Login schema
export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password is too long'),
});

// Signup schema
export const signupSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password is too long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Type exports
export type NaturalLanguageInput = z.infer<typeof naturalLanguageSchema>;
export type StructuredInput = z.infer<typeof structuredInputSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
