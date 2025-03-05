import { ResetPaswordComponent } from '@/components/auth/resetPassword'
import AuthLayout from '@/components/AuthLayout'
import Link from 'next/link'

export default function ResetPaswword() {
    return (
        <AuthLayout
            headerContent={
                <Link href="/login" className="text-sm font-bold text-app-primary relative z-10">
                    Login
                </Link>
            }>
            <ResetPaswordComponent />
        </AuthLayout>
    )
}
