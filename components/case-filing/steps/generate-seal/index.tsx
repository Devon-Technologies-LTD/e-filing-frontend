"use client";

import TimelineProgress from "./timeline-progress";

export default function GenerateSeal() {
  const steps = [
    {
      title: "PAYMENT SUCCESSFUL",
      description: "confirmed from REMITA Services",
      status: "pending" as const,
    },
    {
      title: "GENERATING SUIT NUMBER",
      description: "Please be patient as we generate suit number",
      status: "pending" as const,
    },
    {
      title: "GENERATING COURT SEAL",
      description: "Please be patient as we generate case seal",
      status: "pending" as const,
    },
    {
      title: "GENERATING QR CODE",
      description: "Please be patient as we generate Case QR code",
      status: "pending" as const,
    },
    {
      title: "CASE FILED SUCCESSFULLY",
      description: "Case can be viewed in your cases menu",
      status: "pending" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <TimelineProgress
        steps={steps}
        onComplete={() => console.log("All steps completed!")}
      />
    </div>
  );
}
