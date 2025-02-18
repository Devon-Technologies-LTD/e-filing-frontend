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
  caseMetric: CaseMetric;
  heading: string;
}

export default function CaseDistributionBarChart({ caseMetric, heading }: CaseDistributionBarChartProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white border-b border-zinc-200 py-6">
        <div className="container flex items-center justify-between">
          <p className="font-bold ">{heading}</p>
          <section className="flex gap-2">
            <YearSelector />
            <AllFiledCasesFilter />
            <AllCasesFilter />
          </section>
        </div>
      </div>
      <section className="container py-4">
        <Histogram
          labels={caseMetric.histogram.labels}
          data={caseMetric.histogram.data}
          label={caseMetric.histogram.label}
          histogramTitle={caseMetric.histogram.histogramTitle}
        />
      </section>
    </div>
  );
}
