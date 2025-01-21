import { notFound } from "next/navigation"
import { FORM_STEPS } from "@/constants/form"
import { CaseForm } from "@/components/case-filing/case-form"

export default function CaseFilingStepPage({ params }: { params: { step: string } }) {
  const stepNumber = Number.parseInt(params.step, 10)

  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > FORM_STEPS.length) {
    notFound()
  }

  return <CaseForm initialStep={stepNumber} />
}

