"use client";
import { usePathname } from "next/navigation";

interface StepperProps {
  steps: number[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export function OnboarindIndicator({
  steps,
  currentStep,
  className = "",
}: StepperProps) {
  const pathname = usePathname();

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
    </div>
  );
}