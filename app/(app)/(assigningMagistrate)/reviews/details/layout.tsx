'use client'
import { ReactNode } from "react";
import { FormProvider } from "@/context/file-case";
import { CaseActions, SideBarComponent } from "./component";

interface CaseFilingLayoutProps {
    children: ReactNode;
}

export default function CaseFilingLayout({ children }: CaseFilingLayoutProps) {
    return (
        <FormProvider>
            <div className="h-full md:grid md:grid-cols-[minmax(220px,_4fr)_minmax(0,_8fr)] md:gap-6 lg:grid-cols-[minmax(240px,_4fr)_minmax(0,_8fr)] lg:gap-10 container">
               {children}
            </div>
            <div className="sticky container bg-white shadow-lg border-t-2 px-2 bottom-0 w-full z-50">
                <CaseActions handlePreviousStep={() => { throw new Error("Function not implemented."); }} />
            </div>
        </FormProvider>
    );
}


