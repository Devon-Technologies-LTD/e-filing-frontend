'use client';
import FORGOT from '@/components/auth/forgot'
import AuthLayout from '@/components/AuthLayout'
import Link from 'next/link'

export default function ForgotPage() {
    return (
        <AuthLayout
            headerContent={
                <Link href="/login" className="text-sm font-medium text-app-primary relative z-10">
                    Log In
                </Link>
            }>
            <FORGOT />
        </AuthLayout>
    )
}
