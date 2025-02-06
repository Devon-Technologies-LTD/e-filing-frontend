"use client";
import { useCaseFilingForm } from "@/context/file-case";
import { ONBOARDING_FORM_STEPS, ONBOARDING_FORM_STEPS_TITLES } from "@/constants/form";
import { OnboarindIndicator } from "./onboarding-indicator";
export function OnboardingStepNav() {
  const { currentStep } = useCaseFilingForm();

  return (
    <div className=" max-h-screen bg-white border-r pr-12">
      <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
        <div className="sticky top-0 bg-white z-10 space-y-2">
          <div className="text-xs font-semibold text-gray-600">
            STEP {currentStep} OF {ONBOARDING_FORM_STEPS.length}
          </div>
          <div className="text-3xl font-medium leading-8 text-primary">
            {ONBOARDING_FORM_STEPS_TITLES[currentStep]}
          </div>
        </div>
        <div className="space-y-3 ">
          <OnboarindIndicator steps={ONBOARDING_FORM_STEPS} currentStep={currentStep} />
        </div>{" "}
      </div>
    </div>
  );
}
