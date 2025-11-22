import StaticPage from '@/components/StaticPage';

export default function ApiPage() {
    return (
        <StaticPage title="API Reference" lastUpdated="November 2025">
            <p className="lead">Programmatically access ModelForge&apos;s recommendation engine.</p>
            
            <div className="bg-zinc-900 rounded-xl p-6 text-white not-prose mb-8 overflow-x-auto">
                <code className="text-sm font-mono">
                    <span className="text-purple-400">POST</span> https://api.modelforge.ai/v1/recommend
                </code>
            </div>

            <h3>Request Body</h3>
            <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto">
{`{
  "task": "image_classification",
  "data_type": "image",
  "constraints": {
    "max_latency": 50,
    "max_memory": "2GB"
  }
}`}
            </pre>

            <h3>Response</h3>
             <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto">
{`{
  "recommendations": [
    {
      "model_name": "EfficientNet-B0",
      "suitability_score": 0.95,
      "architecture": "..."
    }
  ]
}`}
            </pre>

            <h2>Authentication</h2>
            <p>
                All API requests must be authenticated using a Bearer token. You can generate an API key 
                in your dashboard settings.
            </p>
        </StaticPage>
    );
}
