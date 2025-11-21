'use client';

import React from 'react';
import { GitBranch, Database, Rocket, Activity } from 'lucide-react';

interface MLOpsPanelProps {
    practices: string[];
}

export default function MLOpsPanel({ practices }: MLOpsPanelProps) {
    const icons = [GitBranch, Database, Rocket, Activity];

    return (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-500" />
                MLOps Best Practices
            </h3>
            <div className="grid gap-4">
                {practices.map((practice, idx) => {
                    const Icon = icons[idx % icons.length];
                    return (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                                <Icon className="w-4 h-4" />
                            </div>
                            <p className="text-sm text-zinc-300 mt-1">{practice}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
