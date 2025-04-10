"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Search } from "lucide-react";
import { CASE_TYPES, CaseTypes } from "@/types/files/case-type";
import { Input } from "@/components/ui/input";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CasesDataTableToolbarProps {
  selectedCase: CaseTypes | "all";
  setSelectedCase: Dispatch<SetStateAction<CaseTypes | "all">>;
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  searchTerm: string; // ✅ Add searchTerm
  setSearchTerm: Dispatch<SetStateAction<string>>; // ✅ Add setSearchTerm
}

export function CasesDataTableToolbar({
  selectedCase,
  setSelectedCase,
  selectedStatus,
  setSelectedStatus,
  searchTerm,
  setSearchTerm,
}: CasesDataTableToolbarProps) {
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value as CaseTypes);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // ✅ Updates state correctly
  };

  const caseFilter = [{ value: "all", label: "ALL CASE TYPE" }, ...CASE_TYPES];

  return (
    <div className="flex items-center justify-between">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4  text-neutral" />
        <Input
          type="search"
          variant="ghost"
          autoComplete="off"
          placeholder="e.g CV/WZ2/001e/Year, "
          className="pl-9 h-12"
          value={searchTerm} // ✅ Now correctly bound
          onChange={handleSearchChange} // ✅ Updates search term
        />
      </div>
      <div className="flex gap-3">
        <section className="flex gap-3">
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
    </div>
  );
}
