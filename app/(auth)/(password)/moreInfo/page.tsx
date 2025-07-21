import { MoreInfoComponent } from '@/components/auth/more-info'
import AuthLayout from '@/components/AuthLayout'
import Link from 'next/link'

export default function MoreInfoPage() {
    return (
        <AuthLayout
            headerContent={
                <Link href="/login" className="text-sm font-medium text-app-primary relative z-10">
                    Login
                </Link>
            }>
            <MoreInfoComponent />
        </AuthLayout>
    )
}
