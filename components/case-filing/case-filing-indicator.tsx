"use client";
import { cn } from "@/lib/utils";
import { FormStep } from "@/types/file-case";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export function CaseFilingStepper({
  steps,
  currentStep,
  className = "",
}: StepperProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-2">
        <div className="h-0.5 w-full bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-[#C4704B] transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
      <nav className="space-y-3 flex flex-col">
        {steps.map((step, index) => {
          const stepNumber = (index + 1) as FormStep;
          const isActive = currentStep === stepNumber;

          return (
            <p
              key={index}
              className={cn(
                "block cursor-default cursor- text-neutral-400 w-fit font-bold text-left px-0 py-1 text-sm transition-colors",
                isActive && "border-primary border-b-2 text-primary"
              )}
            >
              {step}
            </p>
          );
        })}
      </nav>
    </div>
  );
}
