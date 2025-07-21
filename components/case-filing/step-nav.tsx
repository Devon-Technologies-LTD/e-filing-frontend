"use client";
import { FORM_STEPS, REFILING_FORM_STEPS, STEP_TITLES } from "@/constants/form";
import { CaseFilingStepper } from "./case-filing-indicator";
import CostAssessment from "./cost-assessment";
import { useAppSelector } from "@/hooks/redux";

interface Iprops {
  isRefiling?: boolean;
}
export function StepNav({ isRefiling = false }: Iprops) {
  const {
    current_step,
    documents,
    caseType: { case_type, recovery_amount, sub_case_type },
  } = useAppSelector((data) => data.caseFileForm);

  const form = isRefiling ? REFILING_FORM_STEPS : FORM_STEPS;
  const step = isRefiling ? current_step - 2 : current_step;

  return (
    <div className=" max-h-screen bg-white border-r pr-12">
      <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
        <div className="sticky top-0 bg-white z-10 space-y-2">
          <div className="text-xs font-semibold text-gray-600">
            STEP {step} OF {form.length}
          </div>
          <div className="text-3xl font-medium leading-8 text-primary">
            {STEP_TITLES[current_step]}
          </div>
        </div>
        <div className="space-y-3 ">
          <CaseFilingStepper steps={form} currentStep={step} />
        </div>{" "}
        {current_step > 1 && case_type && (
          <div className="space-y-3 ">
            <CostAssessment
              isRefiling={isRefiling}
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
