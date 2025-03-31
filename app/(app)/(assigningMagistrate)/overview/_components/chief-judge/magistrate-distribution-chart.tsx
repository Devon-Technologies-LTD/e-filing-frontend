import React, { useState } from "react";
import {
  AllCasesFilter,
} from "@/components/filters/all-cases";
import Histogram from "../Histogram";
import { FilterDropdown } from "@/components/ui/filter-dropdown";

interface CaseDistributionBarChartProps {
  caseData: { division_name: string; case_count: number }[];
  header: string;
}

export default function MagistrateDistributionBarChart({ caseData = [], header }: CaseDistributionBarChartProps) {
  const [selectedCase, setSelectedCase] = useState("all");
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value);
  };
  const caseFilter = [{ value: "all", label: "ALL MAGISTRATES" }];

  // Ensure caseData is always an array and remove entries with empty division names
  const validCaseData = Array.isArray(caseData) ? caseData.filter((item) => item.division_name?.trim() !== "") : [];

  // Map division names as labels and case counts as data
  const labels = validCaseData.map((item) => item.division_name.trim());
  const data = validCaseData.map((item) => item.case_count);

  // Ensure Histogram receives valid data
  console.log("Histogram Labels:", labels);
  console.log("Histogram Data:", data);


  return (
    <div className=" space-y-4">
      <div className="  bg-white border-b border-zinc-200 py-6">
        <div className="container flex items-center justify-between">
          <p className=" font-bold">
            {header}
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
          labels={labels} // Pass cleaned division names
          data={data} // Pass case counts
          label="Case Count"
          histogramTitle="Case Distribution by Division"
        />
      </section>
    </div>
  );
}
