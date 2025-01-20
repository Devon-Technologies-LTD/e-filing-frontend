import { LogoIcon } from "@/components/svg/logoIcon";
import { ReactNode } from "react";
import TermsAndPrivacy from "./auth/terms";

interface AuthLayoutProps {
    children: ReactNode;
    headerContent?: ReactNode;
}

const AuthLayout = ({ children, headerContent }: AuthLayoutProps) => {
    return (
        <main className="relative w-full min-h-screen bg-gray-50">
            <header className="w-full bg-white shadow-sm px-2 py-6">
                <div className="flex items-center justify-between mx-8">
                    <div className="flex items-center space-x-4">
                        <LogoIcon className="h-8 w-8" />
                        <div className="w-[1px] h-10 bg-gray-200"></div>
                        <div className="text-sm font-light text-gray-800">
                            <div className="text-xs text-muted">Abuja</div>
                            <div className="text-app-primary font-bold text-sm">
                                E-filling Portal
                            </div>
                        </div>
                    </div>
                    {headerContent && (
                        <div className="hidden md:flex items-center text-app-primary group relative">
                            {headerContent}
                            <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-app-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-24 group-hover:bg-app-secondary"></div>
                        </div>
                    )}
                </div>
            </header>
            <section className="mx-auto py-8 px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
                <div className="p-6 flex items-center justify-center container min-w-screen-sm mx-auto">
                    <div className="flex flex-col gap-4 mt-24 items-center justify-center space-y-4 w-[350px]">
                        {children}
                        <TermsAndPrivacy />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AuthLayout;
