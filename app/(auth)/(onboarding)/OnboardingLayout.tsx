
import { FormProvider } from "@/context/file-case";
import { LogoIcon } from "@/components/svg/logoIcon";
import { OnboaringFooter } from "@/components/onboarding/signup/onboarding-footer";
import Link from "next/link";
import { OnboarindIndicator } from "@/components/onboarding/onboarding-indicator";

interface OnboardingLayout {
  children: React.ReactNode;
  currentStep: number;
  heading: string;
  subheading: string;
  close: string;
}

export default function CaseFilingLayout({
  children,
  currentStep,
  heading,
  subheading,
  close,
}: OnboardingLayout) {
    
  return (
    <>
      <FormProvider>
        <header className="w-[1512px] bg-white shadow-sm px-2 py-6 container">
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
            <div className="hidden md:flex items-center text-app-primary group relative">
              <div className="text-sm font-extrabold text-app-primary">
                <Link href="/login">{close}</Link>
              </div>
              <div className="absolute bottom-0 w-0 h-[2px] bg-app-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-24 group-hover:bg-app-secondary"></div>
            </div>
          </div>
        </header>
        <div className="h-full md:grid md:grid-cols-[minmax(220px,_4fr)_minmax(0,_8fr)] md:gap-6 lg:grid-cols-[minmax(240px,_4fr)_minmax(0,_8fr)] lg:gap-10 container">
          <aside className="fixed top-14 z-30 hidden h-[calc(100vh-4.5rem)] w-full shrink-0 md:sticky md:block">
            <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
              <div className="max-h-screen bg-white border-r pr-12">
                <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
                  <div className="sticky top-0 bg-white z-10 space-y-2">
                    <div className="text-xs font-semibold text-gray-600">
                      STEP {currentStep} OF 3
                    </div>
                    <div className="text-3xl font-medium leading-8 text-primary">
                      {heading}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <OnboarindIndicator steps={[1, 2, 3]} currentStep={currentStep} />
                  </div>
                  <div className="font-medium leading-8 text-primary">
                    {subheading}
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <main className="py-6 pb-32 overflow-auto">{children}</main>
        </div>
        <div className="sticky container bg-white shadow-lg border-t-2 px-2 bottom-0 w-full z-50">
          <OnboaringFooter currentStep={currentStep} />
        </div>
      </FormProvider>
    </>
  );
}
