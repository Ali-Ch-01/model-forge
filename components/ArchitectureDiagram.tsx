'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ArchitectureDiagramProps {
    chart: string;
}

export default function ArchitectureDiagram({ chart }: ArchitectureDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMermaidLoaded, setIsMermaidLoaded] = useState(false);

    useEffect(() => {
        // Dynamically import mermaid to avoid SSR issues
        const initMermaid = async () => {
            try {
                const mermaid = (await import('mermaid')).default;
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'dark',
                    securityLevel: 'loose',
                    fontFamily: 'inherit',
                });
                // Suppress default error rendering which appends to body
                mermaid.parseError = (err) => {
                    console.error('Mermaid parse error (suppressed):', err);
                };
                setIsMermaidLoaded(true);
            } catch (e) {
                console.error('Failed to load mermaid', e);
            }
        };
        initMermaid();
    }, []);

    useEffect(() => {
        if (isMermaidLoaded && containerRef.current) {
            const renderChart = async () => {
                try {
                    const mermaid = (await import('mermaid')).default;
                    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

                    // Sanitize chart string: replace literal "\n" with actual newline character
                    const sanitizedChart = chart.replace(/\\n/g, '\n');
                    console.log('Rendering chart:', sanitizedChart); // Debug log

                    // mermaid.render returns an object { svg: string } in newer versions or just string in older
                    const { svg } = await mermaid.render(id, sanitizedChart);

                    if (containerRef.current) {
                        containerRef.current.innerHTML = svg;
                    }
                } catch (error) {
                    console.error('Mermaid rendering error:', error);
                    if (containerRef.current) {
                        containerRef.current.innerHTML = `<div class="text-red-500 text-sm p-4 border border-red-500 rounded">
              <p class="font-bold">Failed to render diagram</p>
              <pre class="mt-2 text-xs overflow-auto">${error instanceof Error ? error.message : JSON.stringify(error)}</pre>
              <p class="mt-2 text-xs text-zinc-500">Chart content:</p>
              <pre class="text-xs bg-zinc-800 p-2 rounded mt-1 overflow-auto">${chart}</pre>
            </div>`;
                    }
                }
            };
            renderChart();
        }
    }, [chart, isMermaidLoaded]);

    return (
        <div className="w-full overflow-x-auto bg-zinc-900 rounded-xl p-6 border border-zinc-800 flex justify-center items-center min-h-[300px]">
            <div ref={containerRef} className="w-full flex justify-center" />
        </div>
    );
}
