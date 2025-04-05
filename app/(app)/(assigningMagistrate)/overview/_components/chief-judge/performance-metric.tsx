import React from "react";
import { YearSelector } from "@/components/year-selector";
import { AllCasesFilter, AllFiledCasesFilter } from "@/components/filters/all-cases";
import Histogram from "../Histogram";
import { ROLES } from "@/types/auth";

interface PerformanceMetricChartProps {
  caseData: Record<string, { difference: number; total: number }>;
  heading: string;
  user: { role: ROLES | string | undefined };
}

export default function PerformanceMetricChart({ caseData, heading, user }: PerformanceMetricChartProps) {
  // Ensure caseData is always an array and remove entries with empty division names
  const validCaseData = Array.isArray(caseData) ? caseData.filter((item) => item.division_name?.trim() !== "") : [];
  const crVisibleKeys = ["totalCases", "activeCases", "closedCases", "reassignedCases"];

  // Label mapping for display
  const labelMap: Record<string, string> = {
    totalCases: "Total Cases Reviewed",
    pendingCases: "Pending Review",
    approved: "Approved Cases",
    denied: "Denied Cases",
    activeCases: "Active Cases",
    concludedCases: "Concluded Cases",
    reassignedCases: "Reassigned Cases",
  };

      // Decide which keys to use
      const visibleKeys =  crVisibleKeys;


  // Map keys to display labels and fetch corresponding data
  const labels = visibleKeys.map((key) => labelMap[key] || key);
  const data = visibleKeys.map((key) => caseData[key]?.total ?? 0);

  console.log("Visible Labels:", labels);
  console.log("Data:", data);

  return (
    <div className="space-y-4">
      <div className="bg-white border-b border-zinc-200 py-6">
        <div className="container flex items-center justify-between">
          <p className="font-bold">{heading}</p>
          <section className="flex gap-2">
            <YearSelector />
            <AllFiledCasesFilter />
            <AllCasesFilter />
          </section>
        </div>
      </div>
      <section className="container py-4">
        <Histogram
          labels={labels} // Pass cleaned division names
          data={data} // Pass case counts
          label="NO. Cases"
          histogramTitle="CASE STATUSES"
        />
      </section>
    </div>
  );
}
