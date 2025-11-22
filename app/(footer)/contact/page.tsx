import StaticPage from '@/components/StaticPage';

export default function ContactPage() {
    return (
        <StaticPage title="Contact Us" lastUpdated="November 2025">
            <p className="lead">Have questions? We&apos;d love to hear from you.</p>
            
            <div className="grid md:grid-cols-2 gap-12 my-12 not-prose">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">Email</label>
                            <input type="email" className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">Message</label>
                            <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Send Message</button>
                    </form>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-6">Other Ways to Connect</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold mb-1">Support</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-2">For technical issues and account help.</p>
                            <a href="mailto:support@modelforge.ai" className="text-blue-600 hover:underline">support@modelforge.ai</a>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">Sales</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-2">For enterprise inquiries and partnerships.</p>
                            <a href="mailto:sales@modelforge.ai" className="text-blue-600 hover:underline">sales@modelforge.ai</a>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">Office</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                123 AI Boulevard<br />
                                San Francisco, CA 94105<br />
                                United States
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </StaticPage>
    );
}
