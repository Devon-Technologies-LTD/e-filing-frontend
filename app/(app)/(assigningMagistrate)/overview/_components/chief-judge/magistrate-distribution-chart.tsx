import React, { useState } from "react";
import { YearSelector } from "@/components/year-selector";
import {
  AllCasesFilter,
  AllFiledCasesFilter,
} from "@/components/filters/all-cases";
import Histogram from "../Histogram";
import { caseMetric } from "@/lib/dummy-data";
import { FilterDropdown } from "@/components/ui/filter-dropdown";

export default function MagistrateDistributionBarChart() {
  const [selectedCase, setSelectedCase] = useState("all");
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value);
  };
  const caseFilter = [{ value: "all", label: "ALL MAGISTRATES" }];

  return (
    <div className=" space-y-4">
      <div className="  bg-white border-b border-zinc-200 py-6">
        <div className="container flex items-center justify-between">
          <p className=" font-bold">
            ACTIVE MAGISTRATE HANDLING CASE ACROSS DIVISIONS (ABUJA){" "}
          </p>
          <section className="flex gap-2">
            <FilterDropdown
              triggerVariant="outline"
              itemVariant="outline"
              placeholder="SELECT CASE TYPE"
              options={caseFilter}
              value={selectedCase}
              onChange={handleCaseTypeChange}
            />{" "}
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
