import StaticPage from '@/components/StaticPage';

export default function BlogPage() {
    return (
        <StaticPage title="Blog" lastUpdated="November 2025">
            <p className="lead">Insights, tutorials, and news from the ModelForge team.</p>
            
            <div className="space-y-8 not-prose my-12">
                <article className="group cursor-pointer">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-48 h-32 bg-zinc-100 dark:bg-zinc-800 rounded-xl shrink-0"></div>
                        <div>
                            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">Tutorial</div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Optimizing Transformer Architectures for Edge Devices</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3 line-clamp-2">
                                Learn how to reduce model size and latency without sacrificing accuracy using knowledge distillation and quantization techniques.
                            </p>
                            <div className="text-xs text-zinc-500">Nov 18, 2025 • 8 min read</div>
                        </div>
                    </div>
                </article>

                <article className="group cursor-pointer">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-48 h-32 bg-zinc-100 dark:bg-zinc-800 rounded-xl shrink-0"></div>
                        <div>
                            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">Engineering</div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Scaling ModelForge: How We Handle Millions of Requests</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3 line-clamp-2">
                                A deep dive into our infrastructure, caching strategies, and how we ensure 99.99% uptime for our users.
                            </p>
                            <div className="text-xs text-zinc-500">Nov 12, 2025 • 12 min read</div>
                        </div>
                    </div>
                </article>

                <article className="group cursor-pointer">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-48 h-32 bg-zinc-100 dark:bg-zinc-800 rounded-xl shrink-0"></div>
                        <div>
                            <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2">Product</div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Introducing Visual Architecture Search</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3 line-clamp-2">
                                We&apos;re excited to announce a new way to explore and design neural networks visually.
                            </p>
                            <div className="text-xs text-zinc-500">Oct 28, 2025 • 5 min read</div>
                        </div>
                    </div>
                </article>
            </div>
        </StaticPage>
    );
}
