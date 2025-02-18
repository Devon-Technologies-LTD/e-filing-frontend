"use client";

import { ReactNode } from "react";
import { FormProvider } from "@/context/file-case";
import { CaseActions , SideBarComponent } from "./component";

interface CaseFilingLayoutProps {
    children: ReactNode;
}

export default function CaseFilingLayout({ children }: CaseFilingLayoutProps) {
    return (
        <FormProvider>
            <div className="h-full md:grid md:grid-cols-[minmax(220px,_4fr)_minmax(0,_8fr)] md:gap-6 lg:grid-cols-[minmax(240px,_4fr)_minmax(0,_8fr)] lg:gap-10 container">
                <aside className="fixed top-14 z-30 hidden h-[calc(100vh-4.5rem)] w-full shrink-0 md:sticky md:block">
                    <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
                        <div className="max-h-screen bg-white border-r pr-12">
                            <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
                                <SideBarComponent />
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="py-6 pb-32 overflow-auto">{children}</main>
            </div>
            <div className="sticky container bg-white shadow-lg border-t-2 px-2 bottom-0 w-full z-50">
                <CaseActions handlePreviousStep={() => { throw new Error("Function not implemented."); }} />
            </div>
        </FormProvider>
    );
}
