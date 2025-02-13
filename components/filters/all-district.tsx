"use client";
import { ALL_DISTRICT, CaseTypes } from "@/types/files/case-type";
import { useState } from "react";
import { FilterDropdown } from "@/components/ui/filter-dropdown";

export function AllDistrictFilter() {
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value as CaseTypes);
  };
  const caseFilter = [{ value: 'all', label: 'ALL DISTRICTS' }, ...ALL_DISTRICT];
  return (
    <section className="flex gap-3">
      <FilterDropdown
        triggerVariant="outline"
        itemVariant="outline"
        placeholder="ALL DISTRICTS"
        options={caseFilter}
        value={selectedCase}
        onChange={handleCaseTypeChange}
      />
    </section>
  );
}


