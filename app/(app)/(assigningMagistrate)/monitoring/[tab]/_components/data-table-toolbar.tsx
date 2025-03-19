"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";
import { CASE_TYPES, CaseTypes } from "@/types/files/case-type";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { YearSelector } from "@/components/year-selector";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { PopoverCalendar } from "@/components/popover-calender";

export function CasesDataTableToolbar({
  selectedCase,
  setSelectedCase,
}: {
  selectedCase: string;
  setSelectedCase: Dispatch<SetStateAction<CaseTypes | "all">>;
}) {
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value as CaseTypes);
  };
  const caseFilter = [{ value: "all", label: "ALL CASE TYPE" }, ...CASE_TYPES];
  return (
    <div className="flex items-center justify-between">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
        <Input
          type="search"
          variant="ghost"
          autoComplete="off"
          data-form-type="other"
          placeholder="e.g CV/Wuse/233456789/2024, "
          className="pl-9 h-12 md:w-[100px] lg:w-[400px]"
        />
      </div>
      <section className="flex gap-3">
        <PopoverCalendar initialDate={new Date()} />
        <FilterDropdown
          triggerVariant="outline"
          itemVariant="outline"
          placeholder="ALL CASE TYPE"
          options={caseFilter}
          value={selectedCase}
          onChange={handleCaseTypeChange}
        />
      </section>
    </div>
  );
}
