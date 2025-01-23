"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Icons } from "@/components/svg/icons";
import CaseGenerationLoader from "@/components/loaders/case-generation-loader";
import { Button } from "@/components/ui/button";

interface TimelineStep {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
}

interface TimelineProgressProps {
  steps: TimelineStep[];
  onComplete?: () => void;
}

export default function TimelineProgress({
  steps: initialSteps,
  onComplete,
}: TimelineProgressProps) {
  const [steps, setSteps] = useState(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      onComplete?.();
      return;
    }

    // Mark current step as in-progress
    setSteps((current) =>
      current.map((step, index) => ({
        ...step,
        status:
          index === currentStepIndex
            ? "in-progress"
            : index < currentStepIndex
            ? "completed"
            : "pending",
      }))
    );

    // After 2 seconds, mark current step as completed and move to next step
    const timer = setTimeout(() => {
      setSteps((current) =>
        current.map((step, index) => ({
          ...step,
          status: index <= currentStepIndex ? "completed" : "pending",
        }))
      );
      setCurrentStepIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStepIndex, steps.length, onComplete]);

  return (
    <div className="max-w-2xl p-6">
      <div className="relative">
        {/* Vertical line */}
        <div
          style={{ height: `${steps.length * 80}px` }}
          className="absolute -z-30 left-[27px] top-10 h-full w-[4px] bg-primary"
        />

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className=" relative flex items-center justify-between gap-4"
            >
              {/* Status indicator */}
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "relative flex w-14 h-12 bg-white items-center justify-center rounded-full transition-colors duration-500"
                  )}
                >
                  {step.status === "pending" && <Icons.timelinePendingCheck />}
                  {step.status === "completed" && <Icons.timelineCheck />}
                  {step.status === "in-progress" && <CaseGenerationLoader />}
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex flex-col pt-2 transition-colors duration-500",
                    step.status === "pending" && "text-muted-foreground"
                  )}
                >
                  <h3
                    className={cn("text-base font-semibold", {
                      "text-neutral-400": step.status === "pending",
                      "text-black": step.status !== "pending",
                    })}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn("text-sm font-medium", {
                      "text-neutral-400": step.status === "pending",
                      "text-black": step.status !== "pending",
                    })}
                  >
                    {step.description}
                  </p>
                  {step.status !== "completed" && (
                    <Button
                      size={"sm"}
                      variant={"ghost"}
                      className={cn(
                        "text-sm h-8 font-semibold p-0 w-fit text-primary hover:underline",
                        {
                          "text-neutral-400":
                            step.status === "pending" ||
                            step.status === "in-progress",
                        }
                      )}
                    >
                      Loading...
                    </Button>
                  )}
                  {index === 0 && step.status === "completed" && (
                    <Button
                      size={"sm"}
                      variant={"ghost"}
                      className="text-sm h-7 font-semibold p-0 w-fit text-primary hover:underline"
                    >
                      View Receipts
                    </Button>
                  )}

                  {index === 1 && step.status === "completed" && (
                    <span className="text-sm h-7 font-semibold text-primary">
                      CV/Wuse/233456789/2024
                    </span>
                  )}

                  {index === 2 && step.status === "completed" && (
                    <Button
                      size={"sm"}
                      variant={"ghost"}
                      className="text-sm h-7 font-semibold p-0 w-fit text-primary hover:underline"
                    >
                      View Court Seal
                    </Button>
                  )}

                  {index === 3 && step.status === "completed" && (
                    <Button
                      size={"sm"}
                      variant={"ghost"}
                      className="text-sm h-7 font-semibold p-0 w-fit text-primary hover:underline"
                    >
                      QR Code
                    </Button>
                  )}

                  {index === steps.length - 1 &&
                    step.status === "completed" && (
                      <Button
                        size={"sm"}
                        variant={"ghost"}
                        className="text-sm h-7 font-semibold p-0 w-fit text-primary hover:underline"
                      >
                        View Case
                      </Button>
                    )}
                </div>
              </div>

              {/* Completed text for first step */}
              {index === 0 && step.status === "completed" && (
                <div className="text-xs font-bold text-stone-600">
                  Completed
                </div>
              )}
              {[1, 2, 3].includes(index) && step.status === "completed" && (
                <div className="text-xs font-bold text-stone-600">
                  <Icons.verified />
                </div>
              )}

              {/* Line connecting steps */}
              {/* {index < steps.length - 1 && (
               <div className="absolute left-[35px] top-[50%] h-[40px] w-[2px] bg-muted transform -translate-y-[50%]" />
             )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
