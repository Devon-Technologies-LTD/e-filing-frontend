"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Icons } from "@/components/svg/icons";
import CaseGenerationLoader from "@/components/loaders/case-generation-loader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { validatePayment } from "@/lib/actions/payment";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FilePreview } from "@/components/ui/file-preview";
import CaseNumberExplainer from "@/components/ui/case-number-explainer";

interface TimelineStep {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "failed";
}

interface TimelineProgressProps {
  steps: TimelineStep[];
  onComplete?: () => void;
}

const StepIcon = ({ status }: { status: TimelineStep["status"] }) => {
  const icons = {
    pending: <Icons.timelinePendingCheck />,
    completed: <Icons.timelineCheck />,
    "in-progress": <CaseGenerationLoader />,
    failed: <Icons.alert className="h-10 w-10" />,
  };
  return icons[status];
};

const StepContent = ({
  step,
  index,
  sealNumber,
  verifyData,
  router,
}: {
  step: TimelineStep;
  index: number;
  sealNumber: string;
  verifyData: any;
  router: ReturnType<typeof useRouter>;
}) => {
  const isPending = step.status === "pending";
  const textColor = isPending ? "text-neutral-400" : "text-black";

  const actionButtons = {
    0: step.status === "completed" && (
      <Button
        size="sm"
        disabled
        variant="ghost"
        className="text-sm h-7 font-semibold p-0 w-fit text-primary hover:underline"
      >
        View Receipts
      </Button>
    ),
    1: step.status === "completed" && (
      <span className="text-sm h-7 font-semibold text-primary">
        {sealNumber}
      </span>
    ),
    2: step.status === "completed" && (
      <FilePreview
        disabled={!verifyData?.data?.seal_path}
        preview={verifyData?.data?.seal_path}
        buttonText="View Court Seal"
      />
    ),
    3: step.status === "completed" && (
      <FilePreview
        disabled={!verifyData?.data?.qrcode_path}
        preview={verifyData?.data?.qrcode_path}
        buttonText="QR Code"
      />
    ),
    4: step.status === "completed" && (
      <Button
        disabled={!verifyData?.data?.case_suit_number}
        onClick={() =>
          router.push(`/cases/view/${encodeURIComponent(verifyData?.data?.id)}`)
        }
        size="sm"
        variant="ghost"
        className="text-sm h-7 font-semibold p-0 w-fit text-primary hover:underline"
      >
        View Case
      </Button>
    ),
  };

  return (
    <div
      className={cn(
        "flex flex-col pt-2 transition-colors duration-500",
        isPending && "text-muted-foreground"
      )}
    >
      <h3 className={cn("text-base uppercase font-semibold", textColor)}>
        {step.title}
      </h3>
      <p className={cn("text-sm capitalize font-medium", textColor)}>
        {step.description}
      </p>
      {step.status !== "completed" && (
        <Button
          size="sm"
          variant="ghost"
          className={cn("text-sm h-8 font-semibold p-0 w-fit text-primary", {
            "text-neutral-400": isPending || step.status === "in-progress",
          })}
        >
          {step.status === "failed" ? "Failed" : "..."}
        </Button>
      )}
      {actionButtons[index as keyof typeof actionButtons]}
    </div>
  );
};

export default function TimelineProgress({
  steps: initialSteps,
}: TimelineProgressProps) {
  const [steps, setSteps] = useState(initialSteps);
  const [sealNumber, setSealNumber] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const {
    caseType: { case_file_id, reference },
    paymentType,
    exemption_code
  } = useAppSelector((state) => state.caseFileForm);

  const router = useRouter();

  const { data: verifyData, isLoading: verifyLoading } = useQuery({
    queryKey: ["verify_transaction"],
    queryFn: async () => validatePayment(case_file_id, reference!, paymentType, exemption_code),
  });

  // Payment verification effect
  useEffect(() => {
    setSteps((current) =>
      current.map((step, index) =>
        index === 0 
          ? {
              ...step,
              status: verifyLoading
                ? "in-progress"
                : verifyData?.success
                ? "completed"
                : "failed",
              ...(verifyData?.success && {
                title: "PAYMENT SUCCESSFUL",
                description: `Confirmed from ${paymentType?.toUpperCase()}  Services`,
              }),
              ...(!verifyLoading &&
                !verifyData?.success && {
                  title: verifyData?.data?.data || "Payment Failed",
                  description:
                    verifyData?.data?.data || "Payment verification failed",
                }),
            }
          : step
      )
    );

    if (!verifyLoading && verifyData?.success) {
      setSealNumber(verifyData.data?.case_suit_number ?? "");
      setCurrentStepIndex(1);
    } else if (!verifyLoading && !verifyData?.success) {
      toast.error(verifyData?.data?.data || "Payment verification failed");
    }
  }, [verifyData, verifyLoading]);

  // Step progression effect
  useEffect(() => {
    if (currentStepIndex > 0 && currentStepIndex < steps.length) {
      setSteps((current) =>
        current.map((step, index) => {
          // Base status based on progression
          let newStatus: TimelineStep["status"] =
            index === currentStepIndex
              ? "in-progress"
              : index < currentStepIndex
              ? "completed"
              : "pending";

          return {
            ...step,
            status: newStatus,
          };
        })
      );

      const timer = setTimeout(() => {
        setSteps((current) =>
          current.map((step, index) => {
            // Base completed status
            let newStatus: TimelineStep["status"] =
              index <= currentStepIndex ? "completed" : "pending";

            // Maintain failure conditions
            if (index === 1 && !verifyData?.data?.case_suit_number) {
              newStatus = "failed";
              return {
                ...step,
                status: newStatus,
                title: "Seal Generation Failed",
                description: "Failed to generate court seal",
              };
            }
            if (index === 2 && !verifyData?.data?.seal_path) {
              newStatus = "failed";
              return {
                ...step,
                status: newStatus,
                title: "Court Seal Generation Failed",
                description: "Failed to generate court seal",
              };
            }
            if (index === 3 && !verifyData?.data?.qrcode_path) {
              newStatus = "failed";
              return {
                ...step,
                status: newStatus,
                title: "QR Code Generation Failed",
                description: "Failed to generate QR code",
              };
            }
            if (index === 5 && !verifyData?.data?.case_suit_number) {
              newStatus = "failed";
              return {
                ...step,
                status: newStatus,
                title: "Case Not Filed ",
                description: "Failed to file case",
              };
            }

            return {
              ...step,
              status: newStatus,
            };
          })
        );
        setCurrentStepIndex((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, steps.length, verifyData]);
  return (
    <section>
      <div className="max-w-2xl p-6">
        <div className="relative">
          <div
            style={{ height: `${steps.length * 80}px` }}
            className="absolute -z-30 left-[27px] top-10 w-[4px] bg-primary"
          />
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex w-14 h-12 bg-white items-center justify-center rounded-full transition-colors duration-500">
                    <StepIcon status={step.status} />
                  </div>
                  <StepContent
                    step={step}
                    index={index}
                    sealNumber={sealNumber}
                    verifyData={verifyData}
                    router={router}
                  />
                </div>
                {index === 0 && step.status === "completed" && (
                  <div className="text-xs font-bold text-stone-600">
                    Completed
                  </div>
                )}
                {[1, 2, 3].includes(index) &&
                  !["pending", "in-progress"].includes(step.status) && (
                    <div className="text-xs font-bold text-stone-600">
                      {index === 1 && verifyData?.data?.case_suit_number ? (
                        <Icons.verified />
                      ) : null}
                      {index === 2 && verifyData?.data?.qrcode_path ? (
                        <Icons.verified />
                      ) : null}
                      {index === 3 && verifyData?.data?.seal_path ? (
                        <Icons.verified />
                      ) : null}
                      {index === 1 && !verifyData?.data?.case_suit_number ? (
                        <Icons.alert />
                      ) : null}
                      {index === 2 && !verifyData?.data?.qrcode_path ? (
                        <Icons.alert />
                      ) : null}
                      {index === 3 && !verifyData?.data?.seal_path ? (
                        <Icons.alert />
                      ) : null}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <CaseNumberExplainer />
    </section>
  );
}
