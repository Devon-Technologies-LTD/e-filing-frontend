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
      <div className="h-full md:grid md:grid-cols-[minmax(220px,_4fr)_minmax(0,_8fr)] md:gap-6 lg:grid-cols-[minmax(240px,_4fr)_minmax(0,_8fr)] lg:gap-10 container">
        <aside className=" fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
            <StepNav />
          </div>
        </aside>
        <main className="p-6 pb-24 overflow-auto">{children}</main>
      </div>
      <div className="sticky border bg-white shadow-inner bottom-0 w-full z-50">
        <StepperNavigation /> 
      </div>
    </FormProvider>
  );
}
