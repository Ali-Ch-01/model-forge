import StaticPage from '@/components/StaticPage';

export default function FeaturesPage() {
    return (
        <StaticPage title="Features" lastUpdated="November 2025">
            <p className="lead">Discover how ModelForge accelerates your machine learning workflow.</p>
            
            <h2>AI-Powered Architecture Design</h2>
            <p>
                Our core engine analyzes your requirements and suggests optimal model architectures. 
                Whether you&apos;re working on computer vision, NLP, or tabular data, ModelForge provides 
                tailored recommendations based on state-of-the-art research.
            </p>

            <h2>Code Generation</h2>
            <p>
                Get production-ready code in seconds. We generate training scripts, data pipelines, 
                and deployment configurations for PyTorch, TensorFlow, and Scikit-learn.
            </p>

            <h2>Interactive Visualizations</h2>
            <p>
                Visualize your model architectures with our dynamic diagrams. Understand data flow, 
                layer dimensions, and connectivity at a glance.
            </p>
        </StaticPage>
    );
}
