import StaticPage from '@/components/StaticPage';

export default function CareersPage() {
    return (
        <StaticPage title="Careers" lastUpdated="November 2025">
            <p className="lead">Help us build the future of AI development.</p>
            
            <div className="my-12 not-prose">
                <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
                
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
                        <div>
                            <h3 className="text-lg font-bold group-hover:text-blue-500 transition-colors">Senior ML Engineer</h3>
                            <p className="text-zinc-500 text-sm">Remote • Engineering • Full-time</p>
                        </div>
                        <button className="mt-4 md:mt-0 px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Apply Now</button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
                        <div>
                            <h3 className="text-lg font-bold group-hover:text-blue-500 transition-colors">Frontend Developer</h3>
                            <p className="text-zinc-500 text-sm">San Francisco / Remote • Product • Full-time</p>
                        </div>
                        <button className="mt-4 md:mt-0 px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Apply Now</button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
                        <div>
                            <h3 className="text-lg font-bold group-hover:text-blue-500 transition-colors">Developer Advocate</h3>
                            <p className="text-zinc-500 text-sm">Remote • Marketing • Full-time</p>
                        </div>
                        <button className="mt-4 md:mt-0 px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Apply Now</button>
                    </div>
                </div>
            </div>

            <h2>Benefits</h2>
            <ul className="grid md:grid-cols-2 gap-4">
                <li>✅ Competitive salary and equity</li>
                <li>✅ Remote-first culture</li>
                <li>✅ Comprehensive health insurance</li>
                <li>✅ Unlimited PTO</li>
                <li>✅ Learning budget</li>
                <li>✅ Home office stipend</li>
            </ul>
        </StaticPage>
    );
}
