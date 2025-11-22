import StaticPage from '@/components/StaticPage';

export default function ChangelogPage() {
    return (
        <StaticPage title="Changelog" lastUpdated="November 21, 2025">
            <div className="space-y-12">
                <div className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-black"></div>
                    <div className="text-sm text-zinc-500 mb-2">November 21, 2025</div>
                    <h2 className="text-2xl font-bold mt-0 mb-4">v2.1.0 - UI Polish & Light Mode</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Complete UI overhaul for better light mode support.</li>
                        <li>Improved dashboard navigation and layout.</li>
                        <li>New static pages for documentation and company info.</li>
                        <li>Performance improvements for model generation.</li>
                    </ul>
                </div>

                <div className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 ring-4 ring-white dark:ring-black"></div>
                    <div className="text-sm text-zinc-500 mb-2">November 10, 2025</div>
                    <h2 className="text-2xl font-bold mt-0 mb-4">v2.0.0 - Major Release</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Introduced new recommendation engine.</li>
                        <li>Added support for TensorFlow and Scikit-learn code generation.</li>
                        <li>Real-time collaboration features.</li>
                    </ul>
                </div>

                <div className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 ring-4 ring-white dark:ring-black"></div>
                    <div className="text-sm text-zinc-500 mb-2">October 15, 2025</div>
                    <h2 className="text-2xl font-bold mt-0 mb-4">v1.5.0 - Beta Launch</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Initial public beta release.</li>
                        <li>Basic model architecture search.</li>
                        <li>PyTorch export support.</li>
                    </ul>
                </div>
            </div>
        </StaticPage>
    );
}
