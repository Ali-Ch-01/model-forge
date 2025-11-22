import StaticPage from '@/components/StaticPage';

export default function DocsPage() {
    return (
        <StaticPage title="Documentation" lastUpdated="November 2025">
            <p className="lead">Everything you need to know about using ModelForge.</p>
            
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                <a href="#" className="block p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-colors group">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors">Getting Started</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Learn the basics of ModelForge, from account setup to your first model generation.</p>
                </a>
                <a href="#" className="block p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-colors group">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors">Model Architecture</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Deep dive into how our AI engine designs architectures for different tasks.</p>
                </a>
                <a href="#" className="block p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-colors group">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors">Code Export</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Guide to exporting and integrating generated code into your projects.</p>
                </a>
                <a href="#" className="block p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-colors group">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors">API Integration</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Technical documentation for integrating ModelForge into your CI/CD pipelines.</p>
                </a>
            </div>

            <h2>Popular Topics</h2>
            <ul>
                <li><a href="#">How to fine-tune recommendations</a></li>
                <li><a href="#">Supported frameworks and libraries</a></li>
                <li><a href="#">Understanding suitability scores</a></li>
                <li><a href="#">Exporting to ONNX</a></li>
            </ul>
        </StaticPage>
    );
}
