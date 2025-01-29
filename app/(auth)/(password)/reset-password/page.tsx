import { ResetPaswordComponent } from '@/components/auth/resetPassword'
import AuthLayout from '@/components/AuthLayout'
import Link from 'next/link'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ResetPaswword() {
    const cookieStore = cookies();
    const emailCookie = cookieStore.get("otpEmail");
    if (!emailCookie?.value) {
        redirect("/forgot");
    }

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
