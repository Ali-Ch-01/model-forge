'use client';

import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { History, Search, Calendar } from 'lucide-react';

export default function HistoryPage() {
    // Placeholder data until backend is connected
    const historyItems = [
        { id: 1, query: "Detect anomalies in sensor data", date: "2 mins ago", type: "Time Series" },
        { id: 2, query: "Classify medical images for pneumonia", date: "2 hours ago", type: "Computer Vision" },
        { id: 3, query: "Predict stock prices using LSTM", date: "1 day ago", type: "Forecasting" },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <History className="w-8 h-8 text-blue-500" />
                Query History
            </h1>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                {historyItems.map((item) => (
                    <div key={item.id} className="p-4 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                <Search className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-medium text-zinc-200">{item.query}</h3>
                                <p className="text-sm text-zinc-500">{item.type}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <Calendar className="w-4 h-4" />
                            {item.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
