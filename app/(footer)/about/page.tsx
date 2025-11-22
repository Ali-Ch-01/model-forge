import StaticPage from '@/components/StaticPage';

export default function AboutPage() {
    return (
        <StaticPage title="About Us" lastUpdated="November 2025">
            <p className="lead">We&apos;re on a mission to democratize AI architecture design.</p>
            
            <h2>Our Story</h2>
            <p>
                ModelForge was born from a simple observation: designing optimal neural network architectures 
                is still more of an art than a science. We wanted to change that by combining state-of-the-art 
                AutoML research with an intuitive developer experience.
            </p>
            <p>
                Founded in 2024 by a team of ML engineers and researchers, we&apos;ve grown into a platform 
                trusted by thousands of developers worldwide.
            </p>

            <h2>Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                    <h3 className="font-bold mb-2">Innovation</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">We push the boundaries of what&apos;s possible in automated machine learning.</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                    <h3 className="font-bold mb-2">Simplicity</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Complex technology doesn&apos;t have to be complicated to use.</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                    <h3 className="font-bold mb-2">Transparency</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">We believe in open/explainable AI and clear communication.</p>
                </div>
            </div>
        </StaticPage>
    );
}
