import React from "react";
import { YearSelector } from "@/components/year-selector";
import { AllCasesFilter, AllFiledCasesFilter } from "@/components/filters/all-cases";
import Histogram from "../Histogram";

interface CaseMetric {
  histogram: {
    labels: string[];
    data: number[];
    label: string;
    histogramTitle: string;
  };
}

interface CaseDistributionBarChartProps {
  caseData: { division_name: string; case_count: number }[];
  heading: string;
}
export default function CaseDistributionBarChart({ caseData = [], heading }: CaseDistributionBarChartProps) {
  // Ensure caseData is always an array and remove entries with empty division names
  const validCaseData = Array.isArray(caseData) ? caseData.filter((item) => item.division_name?.trim() !== "") : [];

  // Map division names as labels and case counts as data
  const labels = validCaseData.map((item) => item.division_name.trim());
  const data = validCaseData.map((item) => item.case_count);

  // Ensure Histogram receives valid data
  console.log("Histogram Labels:", labels);
  console.log("Histogram Data:", data);

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
          label="Case Count"
          histogramTitle="Case Distribution by Division"
        />
      </section>
    </div>
  );
}
