// "use client";

// import { FormStep } from "@/types/file-case";
// import { useCaseFilingForm } from "@/context/file-case";
// import { useEffect } from "react";
// import { LawyerComponent } from "./signup/lawyer";
// import { OtpComponent } from "./signup/otp";
// import { IndividualComponent } from "./signup/individual";

// export function OnboardingForm({ initialStep, location }: { initialStep?: number; location?: string }) {
//   const { currentStep, setCurrentStep } = useCaseFilingForm();

//   useEffect(() => {
//     if (currentStep !== initialStep) {
//       setCurrentStep(initialStep as FormStep);
//     }
//   }, [initialStep, currentStep, setCurrentStep]);

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return <Signup />;
//       case 2:
//         if (location === "lawyer") {
//           return <LawyerComponent />;
//         } else {
//           return <IndividualComponent />;
//         }
//       case 3:
//         return <OtpComponent />;
//       default:
//         return null;
//     }
//   };

//   return <div>{renderStep()}</div>;
// }
