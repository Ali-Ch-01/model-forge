'use client';

import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

export default function ApiPage() {
    return (
        <PageLayout title="API Reference" subtitle="Integrate ModelForge intelligence into your own tools.">
            <div className="space-y-12">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Authentication</h2>
                    <p className="text-zinc-400 mb-4">
                        All API requests require a Bearer Token in the header. You can generate an API key from your dashboard settings.
                    </p>
                    <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 font-mono text-sm text-zinc-300">
                        Authorization: Bearer mf_live_...
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Endpoints</h2>

                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded bg-green-900/30 text-green-400 font-mono text-sm border border-green-500/30">POST</span>
                            <code className="text-zinc-200 font-mono">/v1/recommendations</code>
                        </div>
                        <p className="text-zinc-400 mb-4">Generate a model recommendation based on a problem description.</p>

                        <h4 className="text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">Request Body</h4>
                        <pre className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 overflow-x-auto text-sm text-blue-300">
                            {`{
  "description": "A system to detect defects in manufacturing assembly lines using camera feeds.",
  "constraints": {
    "latency": "realtime",
    "deployment": "edge"
  },
  "framework": "pytorch"
}`}
                        </pre>

                        <h4 className="text-sm font-bold text-zinc-300 mt-6 mb-2 uppercase tracking-wider">Response</h4>
                        <pre className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 overflow-x-auto text-sm text-emerald-300">
                            {`{
  "id": "rec_123456789",
  "model": {
    "name": "YOLOv8-Nano",
    "architecture": "CNN",
    "reasoning": "YOLOv8-Nano is optimized for edge deployment..."
  },
  "code": "import torch\\n...",
  "diagram": "graph TD\\n..."
}`}
                        </pre>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Rate Limits</h2>
                    <p className="text-zinc-400">
                        The API is rate limited to 100 requests per minute for Pro users and 1000 requests per minute for Enterprise users.
                    </p>
                </motion.section>
            </div>
        </PageLayout>
    );
}
