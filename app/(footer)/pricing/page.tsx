import StaticPage from '@/components/StaticPage';

export default function PricingPage() {
    return (
        <StaticPage title="Pricing" lastUpdated="November 2025">
            <p className="lead">Simple, transparent pricing for teams of all sizes.</p>
            
            <div className="grid md:grid-cols-3 gap-8 not-prose my-12">
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <h3 className="text-xl font-bold mb-2">Free</h3>
                    <div className="text-3xl font-bold mb-4">$0<span className="text-sm font-normal text-zinc-500">/mo</span></div>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                        <li>• 5 Model Generations/day</li>
                        <li>• Basic Code Export</li>
                        <li>• Community Support</li>
                    </ul>
                    <button className="w-full py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black font-medium">Get Started</button>
                </div>
                
                <div className="p-6 rounded-2xl border-2 border-blue-500 bg-white dark:bg-zinc-900 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">POPULAR</div>
                    <h3 className="text-xl font-bold mb-2">Pro</h3>
                    <div className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal text-zinc-500">/mo</span></div>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                        <li>• Unlimited Generations</li>
                        <li>• Advanced Architecture Search</li>
                        <li>• Priority Support</li>
                        <li>• API Access</li>
                    </ul>
                    <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium">Start Trial</button>
                </div>

                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                    <div className="text-3xl font-bold mb-4">Custom</div>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                        <li>• On-premise Deployment</li>
                        <li>• Custom Integrations</li>
                        <li>• Dedicated Account Manager</li>
                        <li>• SLA Guarantees</li>
                    </ul>
                    <button className="w-full py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 font-medium">Contact Sales</button>
                </div>
            </div>
        </StaticPage>
    );
}
