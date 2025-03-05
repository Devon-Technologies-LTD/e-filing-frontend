import React from "react";
import { StepperNavigation } from "@/components/case-filing/stepper-footer";
import { StepNav } from "@/components/case-filing/step-nav";

export default function RefilingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex flex-col">
      <div className="md:grid md:grid-cols-[minmax(220px,_4fr)_minmax(0,_8fr)] md:gap-6 lg:grid-cols-[minmax(240px,_4fr)_minmax(0,_8fr)] lg:gap-10 container flex-1 min-h-0">
        <aside className="fixed top-14 z-30 hidden w-full shrink-0 md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
            <StepNav isRefiling />
          </div>
        </aside>
        <main className="py-6 overflow-auto">{children}</main>
      </div>
      <div className="sticky bg-white shadow-inner bottom-0 w-full z-50">
        <StepperNavigation isRefiling />
      </div>
    </section>
  );
}
