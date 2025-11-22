import StaticPage from '@/components/StaticPage';

export default function LegalPage() {
    return (
        <StaticPage title="Legal" lastUpdated="November 21, 2025">
            <h2>Terms of Service</h2>
            <p>
                By accessing and using ModelForge, you agree to be bound by these Terms of Service. 
                Please read them carefully before using our platform.
            </p>

            <h3>1. Usage Rights</h3>
            <p>
                You retain all rights to the models and code you generate using ModelForge. 
                We claim no ownership over your intellectual property.
            </p>

            <h3>2. Acceptable Use</h3>
            <p>
                You agree not to use ModelForge for any illegal or unauthorized purpose. 
                You must not transmit any worms or viruses or any code of a destructive nature.
            </p>

            <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

            <h2>Privacy Policy</h2>
            <p>
                Your privacy is important to us. This policy outlines how we collect, use, and protect your data.
            </p>

            <h3>Data Collection</h3>
            <p>
                We collect only the information necessary to provide our service, including account details 
                and usage metrics. We do not sell your personal data to third parties.
            </p>
        </StaticPage>
    );
}
