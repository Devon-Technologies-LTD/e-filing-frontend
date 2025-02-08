'use client';
import React from 'react';
import LoginComponent from '@/components/auth/login'
import AuthLayout from '@/components/AuthLayout'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <AuthLayout
            headerContent={
                <Link href="/signup" className="text-sm font-bold text-app-primary relative z-10">
                    Create Account
                </Link>
            }>
            <LoginComponent />
        </AuthLayout>
    );
}