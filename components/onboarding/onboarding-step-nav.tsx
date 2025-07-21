"use client";
import { useCaseFilingForm } from "@/context/file-case";
import { useEffect, useState } from "react";

export const ONBOARDING_FORM_STEPS_TITLES: Record<number, string> = {
  1: "How will you be filling your cases",
  2: "Provide your information to get Started",
  3: "Please Input the One Time Password Sent (OTP)",
};

export const ONBOARDING_FORM_STEPS = [
  "Case Types",
  "Upload Documents",
  "Generate Seal and QR Code",
];

export function OnboardingStepNav() {
  const { currentStep, setCurrentStep } = useCaseFilingForm();
  const [isClient, setIsClient] = useState(false);


  const getStepFromURL = (path: string) => {
    if (path.includes("signup")) return 1;
    if (path.includes("lawyer")) return 2;
    if (path.includes("individual")) return 2;
    if (path.includes("otp")) return 3;
    return 1;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const path = window.location.pathname;
      const step = getStepFromURL(path);
      setCurrentStep(step);
    }
  }, [isClient, setCurrentStep]);


  if (!isClient) {
    return null;
  }

  return (
    <div className="max-h-screen bg-white border-r pr-12">
      <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
        <div className="sticky top-0 bg-white z-10 space-y-2">
          <div className="text-xs font-semibold text-gray-600">
            STEP {currentStep} OF {ONBOARDING_FORM_STEPS.length}
          </div>
          <div className="text-3xl font-medium leading-8 text-primary">
            {ONBOARDING_FORM_STEPS_TITLES[currentStep]}
          </div>
        </div>
        <div className="space-y-3">
          {/* <OnboarindIndicator steps={ONBOARDING_FORM_STEPS} currentStep={currentStep} /> */}
        </div>
      </div>
    </div>
  );
}
