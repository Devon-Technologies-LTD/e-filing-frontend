// pages/signup/[step]/[location].tsx

import { notFound } from "next/navigation";
import { FORM_STEPS } from "@/constants/form";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export default function OnboardingStepPage({ params }: { params: { step: string, location: string } }) {
  const stepNumber = Number.parseInt(params.step, 10);
  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > FORM_STEPS.length) {
    notFound();
  }
  return <OnboardingForm initialStep={stepNumber} location={params.location} />;
}
