"use client";
import React, { useState } from "react";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { CASE_TYPES, CASES_FILED } from "@/types/files/case-type";
import { cn } from "@/lib/utils"; // Ensure this import exists
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust import as needed

interface CaseOption {
  value: string;
  label: string;
}

interface CaseFilterProps {
  caseData: CaseOption[];
  defaultLabel: string;
}

function CaseFilter({ caseData, defaultLabel }: CaseFilterProps) {
  const [selectedCase, setSelectedCase] = useState<string>("all");

  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value);
  };

  const caseFilterOptions = [{ value: "all", label: defaultLabel }, ...caseData];

  return (
    <div className="w-full min:w-24">
      <FilterDropdown
        triggerVariant="outline"
        itemVariant="outline"
        placeholder="SELECT CASE TYPE"
        options={caseFilterOptions}
        value={selectedCase}
        onChange={handleCaseTypeChange}
      />
    </div>
  );
}

export function AllCasesFilter() {
  return <CaseFilter caseData={CASE_TYPES} defaultLabel="ALL CASE TYPES" />;
}

export function AllFiledCasesFilter() {
  return <CaseFilter caseData={CASES_FILED} defaultLabel="ALL FILED CASE TYPES" />;
}

export function YearSelector() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>("All Year");

  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (currentYear - i).toString());
  const allYears = ["All Year", ...years]; // Ensure "All Year" casing is consistent

  return (
    <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 h-12 border-app-tertiary border-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
        )}
        aria-label="Select Year"
      >
        <SelectValue placeholder="Select Year">
          <span className="ml-2 uppercase text-neutral-600 font-bold text-xs">
            YEAR FILED: {selectedYear}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-52">
        {allYears.map((year) => (
          <SelectItem
            variant="outline"
            className="uppercase min-w-40"
            key={year}
            value={year}
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
