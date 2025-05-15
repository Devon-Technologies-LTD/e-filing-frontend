'use client'
import { FormProvider } from "@/context/file-case";
import { LogoIcon } from "@/components/svg/logoIcon";
import { OnboaringFooter } from "@/components/onboarding/signup/onboarding-footer";
import Link from "next/link";
import { OnboarindIndicator } from "@/components/onboarding/onboarding-indicator";
import { useState } from "react";
import { OnboardingContext } from "@/context/OnboardingContext";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  return (
    <OnboardingContext.Provider value={{ loading, setLoading, active, setActive }}>
      <FormProvider>
        <div className="flex h-dvh flex-col">
          {/* Header */}

          <header className="bg-white shadow-sm px-2 py-6 fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-between mx-8">
              <div className="flex items-center space-x-4">
                <LogoIcon className="h-8 w-8" />
                <div className="w-[1px] h-10 bg-gray-200"></div>
                <div className="text-sm font-light text-gray-800">
                  <div className="text-xs text-muted">Abuja</div>
                  <div className="text-app-primary font-bold text-sm">
                    Docket Master
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
          <section className="flex h-screen pt-[5.5rem]">
            {/* Aside */}
            <aside className="fixed top-[5.5rem] left-0 z-40 hidden lg:block w-1/5 h-[calc(100vh-5.5rem)] bg-white border-r overflow-y-auto">
              <div className="p-6 pr-4 lg:py-8">
                <div className="mx-auto space-y-8">
                  <div className="sticky top-0 bg-white z-10 space-y-2">
                    {currentStep > 0 && (
                      <div className="text-xs font-semibold text-gray-600">
                        STEP {currentStep} OF 3
                      </div>
                    )}
                    <div className="text-2xl md:text-3xl font-medium leading-8 text-primary">
                      {heading}
                    </div>
                  </div>
                  {currentStep > 0 && (
                    <>
                      <div className="space-y-3">
                        <OnboarindIndicator steps={[1, 2, 3]} currentStep={currentStep} />
                      </div>
                      <div className="font-medium leading-8 text-primary">
                        {subheading}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 lg:ml-[20%] w-full h-[calc(100vh-5.5rem)] flex justify-center items-start">
              <div className="w-full fixed max-w-4xl h-full overflow-y-auto scroll-smooth scrollbar-hide px-4 md:px-0">
                {children}
              </div>
            </main>
          </section>

          {/* Footer */}
          <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-lg border-t px-4">
            <OnboaringFooter currentStep={currentStep} />
          </div>

        </div>
      </FormProvider>
    </OnboardingContext.Provider>
  );
}

