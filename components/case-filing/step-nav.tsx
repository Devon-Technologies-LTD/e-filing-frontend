"use client";
import { FORM_STEPS, STEP_TITLES } from "@/constants/form";
import { CaseFilingStepper } from "./case-filing-indicator";
import CostAssessment from "./cost-assessment";
import { useAppSelector } from "@/hooks/redux";

export function StepNav() {
  const {
    current_step,
    documents,
    caseType: { case_type, recovery_amount, sub_case_type },
  } = useAppSelector((data) => data.caseFileForm);

  return (
    <div className=" max-h-screen bg-white border-r pr-12">
      <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
        <div className="sticky top-0 bg-white z-10 space-y-2">
          <div className="text-xs font-semibold text-gray-600">
            STEP {current_step} OF {FORM_STEPS.length}
          </div>
          <div className="text-3xl font-medium leading-8 text-primary">
            {STEP_TITLES[current_step]}
          </div>
        </div>
        <div className="space-y-3 ">
          <CaseFilingStepper steps={FORM_STEPS} currentStep={current_step} />
        </div>{" "}
        {current_step > 1 && case_type && (
          <div className="space-y-3 ">
            <CostAssessment
              sub_case_type={sub_case_type}
              recovery_amount={recovery_amount}
              documents={documents}
              case_type={case_type}
            />
          </div>
        )}
      </div>
    </div>
  );
}
