"use client";

import { Search } from "lucide-react";
import { ALL_DISTRICT,  CaseTypes } from "@/types/files/case-type";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Button } from "@/components/ui/button";

export function CasesDataTableToolbar() {
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value as CaseTypes);
  };
  const caseFilter = [{ value: 'all', label: 'ALL DISTRICT' }, ...ALL_DISTRICT];
  return (
    <div className="flex items-center justify-between">
      <div className="col">
        <div className="text-sm">
          <span>Presiding Magisterate</span>
          <p>
            View and Manage all presiding magisterate responsible for presiding over cases.
          </p>
        </div>

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
      </div>

      <section className="flex gap-3">

        <FilterDropdown
          triggerVariant="outline"
          itemVariant="outline"
          placeholder="ALL DISTRICT"
          options={caseFilter}
          value={selectedCase}
          onChange={handleCaseTypeChange}
        />
        <Button className="h-12 text-center">
          INVITE NEW MAGISTERATE
        </Button>
      </section>
    </div>
  );
}
