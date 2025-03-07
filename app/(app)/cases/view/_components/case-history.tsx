"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/svg/icons";
import CaseGenerationLoader from "@/components/loaders/case-generation-loader";

interface TimelineStep {
  title: string;
  description: string;
  time: string;
  status: "completed" | "in-progress" | "pending";
}

interface TimelineProgressProps {
  steps: TimelineStep[];
  onComplete?: () => void;
}

export default function CaseHistoryTimeline({ steps }: TimelineProgressProps) {
  return (
    <div className="">
      <div className="relative">
        {/* Vertical line */}
        <div
          style={{ height: `${steps.length * 80}px` }}
          className="absolute z-10 left-[27px] top-6 h-full w-[4px] bg-green-800"
        />

        {/* Steps */}
        <div className="space-y-8 ">
          {steps.map((step, index) => (
            <>
              <div key={index} className="z-40 relative">
                <div className="text-xs p-0 leading-none flex justify-end font-bold text-stone-600">
                  {step.time}
                </div>

                <div className="flex  items-center gap-4">
                  <div
                    className={cn(
                      "relative flex w-14 h-12 bg-white items-center justify-center rounded-full transition-colors duration-500"
                    )}
                  >
                    {step.status === "pending" && (
                      <Icons.outlineCheck className="opacity-20" />
                    )}
                    {step.status === "completed" && <Icons.check />}
                    {step.status === "in-progress" && <CaseGenerationLoader />}
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "flex flex-col pt-2 max-w-xs transition-colors duration-500",
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
                      className={cn("text-sm  font-medium", {
                        "text-neutral-400": step.status === "pending",
                        "text-black": step.status !== "pending",
                      })}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* <div className="text-xs leading-none flex justify-end font-bold text-stone-600">
                  View Receipts{" "}
                </div> */}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
