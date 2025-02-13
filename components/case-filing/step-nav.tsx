"use client";
import { useCaseFilingForm } from "@/context/file-case";
import { FORM_STEPS, STEP_TITLES } from "@/constants/form";
import { CaseFilingStepper } from "./case-filing-indicator";
import CostAssessment from "./cost-assessment";

export function StepNav() {
  const { currentStep } = useCaseFilingForm();

  return (
    <div className=" max-h-screen bg-white border-r pr-12">
      <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
        <div className="sticky top-0 bg-white z-10 space-y-2">
          <div className="text-xs font-semibold text-gray-600">
            STEP {currentStep} OF {FORM_STEPS.length}
          </div>
          <div className="text-3xl font-medium leading-8 text-primary">
            {STEP_TITLES[currentStep]}
          </div>
        </div>
        <div className="space-y-3 ">
          <CaseFilingStepper steps={FORM_STEPS} currentStep={currentStep} />
        </div>{" "}
        {currentStep > 2 && (
          <div className="space-y-3 ">
            <CostAssessment />
          </div>
        )}
      </div>
    </div>
  );
}
