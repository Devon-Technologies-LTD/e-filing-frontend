"use client";

import { Search } from "lucide-react";
import { CaseTypes } from "@/types/files/case-type";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FilterDropdown } from "@/components/ui/filter-dropdown";

export function DraftsDataTableToolbar() {
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "">("");
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value as CaseTypes);
  };
  const caseFilter = [{ value: "all", label: "ALL CASE TYPE" }];
  return (
    <div className="flex items-center justify-between">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
        <Input
          type="search"
          variant="ghost"
          autoComplete="off"
          data-form-type="other"
          placeholder="e.g search case name"
          className="pl-9 h-12 md:w-[100px] opacity-30 lg:w-[400px]"
        />
      </div>

      <section className="flex gap-3">
        <FilterDropdown
          triggerVariant="outline"
          itemVariant="outline"
          placeholder="LAST EDITED: MOST RECENT"
          options={caseFilter}
          value={selectedCase}
          onChange={handleCaseTypeChange}
        />
      </section>
    </div>
  );
}
