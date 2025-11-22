import StaticPage from '@/components/StaticPage';

export default function CommunityPage() {
    return (
        <StaticPage title="Community" lastUpdated="November 2025">
            <p className="lead">Join thousands of ML engineers building with ModelForge.</p>
            
            <div className="grid md:grid-cols-2 gap-8 not-prose my-12">
                <div className="text-center p-8 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                    <h3 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-300">Discord Server</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">Chat with other developers, share your models, and get help from the team.</p>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">Join Discord</button>
                </div>

                <div className="text-center p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-2xl font-bold mb-4">GitHub Discussions</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">Propose features, report bugs, and contribute to our open-source tools.</p>
                    <button className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity">View on GitHub</button>
                </div>
            </div>

            <h2>Upcoming Events</h2>
            <p>
                Join our weekly office hours and monthly webinars to learn about the latest features 
                and best practices in MLOps.
            </p>
        </StaticPage>
    );
}
