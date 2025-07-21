'use client'
import { LogoIcon } from "@/components/svg/logoIcon";
import { ReactNode } from "react";
import TermsAndPrivacy from "./auth/terms";
import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
    children: ReactNode;
    headerContent?: ReactNode;
}

const AuthLayout = ({ children, headerContent }: AuthLayoutProps) => {
    return (
        <main className="relative w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
            {/* Fixed Header */}
            <header className="w-full bg-white shadow-sm flex-shrink-0">
                <div className="px-4 py-6 md:px-8">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <LogoIcon className="h-6 w-6 md:h-8 md:w-8" />
                            </Link>
                            <div className="hidden sm:block w-[1px] h-10 bg-gray-200"></div>
                            <div className="hidden text-sm sm:block font-light text-gray-800">
                                <div className="text-xs text-muted">Abuja</div>
                            </div>
                        </div>
                        {headerContent && (
                            <div className="hidden md:flex items-center text-app-primary group relative">
                                {headerContent}
                                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-app-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-24 group-hover:bg-app-secondary"></div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Scrollable Content Section */}
            <div className="flex-1 overflow-y-auto">
                <section className="min-h-full w-full py-8 px-4">
                    <div className="container mx-auto flex items-center justify-center">
                        <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col gap-4 items-center justify-center">
                            {children}
                        </div>
                    </div>
                </section>
            </div>
            <TermsAndPrivacy />
        </main>
    );
};

export default AuthLayout;


{/* <section className="mx-auto py-8 px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
<div className="p-6 flex items-center justify-center container min-w-screen-sm mx-auto">
    <div className="flex flex-col gap-4 mt-24 items-center justify-center space-y-4 w-[350px]">
        {children}
        <TermsAndPrivacy />
    </div>
</div>
</section> */}