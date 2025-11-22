import StaticPage from '@/components/StaticPage';

export default function EnterprisePage() {
    return (
        <StaticPage title="Enterprise" lastUpdated="November 2025">
            <p className="lead">Scalable, secure, and custom AI solutions for large organizations.</p>
            
            <h2>Why ModelForge Enterprise?</h2>
            <p>
                ModelForge Enterprise is designed for teams that need more than just model generation. 
                We offer advanced security, compliance, and integration features to help you ship AI products faster.
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <h3 className="text-lg font-bold mb-2">Security & Compliance</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">SOC 2 Type II compliant, SSO integration, and on-premise deployment options.</p>
                </div>
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <h3 className="text-lg font-bold mb-2">Custom Models</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fine-tune models on your proprietary data with our secure training infrastructure.</p>
                </div>
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <h3 className="text-lg font-bold mb-2">Dedicated Support</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">24/7 priority support and a dedicated technical account manager.</p>
                </div>
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <h3 className="text-lg font-bold mb-2">Advanced Analytics</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Deep insights into your team&apos;s usage and model performance metrics.</p>
                </div>
            </div>

            <p>
                Contact our sales team to learn more about how ModelForge can transform your enterprise AI strategy.
            </p>
        </StaticPage>
    );
}
