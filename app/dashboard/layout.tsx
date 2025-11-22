import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import UnifiedNavbar from '@/components/UnifiedNavbar';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
            <UnifiedNavbar variant="dashboard" />
            <main>{children}</main>
        </div>
    )
}
