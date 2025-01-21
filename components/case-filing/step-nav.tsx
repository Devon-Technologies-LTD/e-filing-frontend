"use client";
import { useCaseFilingForm } from "@/context/file-case";
import { FORM_STEPS } from "@/constants/form";
import { CaseFilingStepper } from "./case-filing-indicator";

export function StepNav() {
  const { currentStep } = useCaseFilingForm();

  return (
    <div className=" max-h-screen bg-white border-r pr-12">
      <div className="mx-auto space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-600">
            {" "}
            STEP {currentStep} OF {FORM_STEPS.length}
          </div>
          <div className="text-3xl font-medium leading-8 text-primary">
            General Overview of the case you want to file
          </div>
        </div>
        <div className="space-y-3 ">
          <CaseFilingStepper steps={FORM_STEPS} currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
}
