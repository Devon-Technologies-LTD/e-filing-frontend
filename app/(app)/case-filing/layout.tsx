import React from "react";
import { StepperNavigation } from "@/components/case-filing/stepper-footer";
import { StepNav } from "@/components/case-filing/step-nav";
import { FormProvider } from "@/context/file-case";

export default function CaseFilingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider>
      <div className="h-[calc(100dvh-10rem)] md:grid md:grid-cols-[minmax(220px,_4fr)_minmax(0,_8fr)] md:gap-6 lg:grid-cols-[minmax(240px,_4fr)_minmax(0,_8fr)] lg:gap-10 container">
        <aside className="fixed top-14 z-30 hidden  w-full shrink-0 md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
            <StepNav />
          </div>
        </aside>
        <main className="py-6 h-full overflow-auto">
          {children}
        </main>
      </div>
      <div className="sticky bg-white shadow-inner bottom-0 w-full z-50">
        <StepperNavigation />
      </div>
    </FormProvider>
  );
}
