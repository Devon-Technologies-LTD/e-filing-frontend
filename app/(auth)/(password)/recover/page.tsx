import { RecoverComponent } from '@/components/auth/recover'
import AuthLayout from '@/components/AuthLayout'
import Link from 'next/link'

export default function RecoverPage() {
    return (
        <AuthLayout
            headerContent={
                <Link href="/login" className="text-sm font-medium text-app-primary relative z-10">
                    Login
                </Link>
            }>
            <RecoverComponent />
        </AuthLayout>
    )
}
