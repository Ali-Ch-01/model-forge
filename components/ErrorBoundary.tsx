'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <ErrorFallback
                    error={this.state.error}
                    onReset={() => this.setState({ hasError: false, error: undefined })}
                />
            );
        }

        return this.props.children;
    }
}

interface ErrorFallbackProps {
    error?: Error;
    onReset: () => void;
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-[400px] flex items-center justify-center p-8"
        >
            <div className="text-center max-w-md">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">
                    Oops! Something went wrong
                </h2>

                <p className="text-zinc-400 mb-6 leading-relaxed">
                    We encountered an unexpected error. Don't worry, your data is safe. Try refreshing the page or contact support if the problem persists.
                </p>

                {error && process.env.NODE_ENV === 'development' && (
                    <details className="mb-6 text-left">
                        <summary className="text-sm text-zinc-500 cursor-pointer hover:text-zinc-400 mb-2">
                            Error details (dev mode)
                        </summary>
                        <pre className="text-xs bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-auto text-red-400">
                            {error.message}
                            {'\n\n'}
                            {error.stack}
                        </pre>
                    </details>
                )}

                <button
                    onClick={() => {
                        onReset();
                        window.location.reload();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-medium transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Reload Page
                </button>
            </div>
        </motion.div>
    );
}

export default ErrorBoundary;
