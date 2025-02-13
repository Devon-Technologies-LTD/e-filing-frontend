"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { TCaseFilterType } from "@/types/case";
import { CaseTypes, COURT_TYPE, ALL_DISTRICT } from "@/types/files/case-type";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MModal from "./_components/mModal";

export default function LayoutPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const activeTab = params?.tab as string;

  const [selectedCourt, setSelectedCourt] = useState<CaseTypes | "all">("all");
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");

  const handleCourtTypeChange = useCallback((value: string) => {
    setSelectedCourt(value as CaseTypes);
  }, []);

  const handleCaseTypeChange = useCallback((value: string) => {
    setSelectedCase(value as CaseTypes);
  }, []);

  const handleTabChange = useCallback((newTab: string) => {
    router.push(`/oversight/${newTab}`);
  }, [router]);

  const tabs: { id: TCaseFilterType; label: string }[] = [
    { id: "all", label: "All Magistrates" },
    { id: "performing", label: "Magistrate Performance" },
  ];

  const courtFilterOptions = [{ value: "all", label: "ALL COURT TYPE" }, ...COURT_TYPE];
  const districtFilterOptions = [{ value: "all", label: "ALL DISTRICTS" }, ...ALL_DISTRICT];

  return (
    <div className="bg-zinc-100 min-h-dvh space-y-2">
      <header className="bg-white shadow-md py-6 sticky top-0 z-10">
        <div className="container space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <FilterDropdown
                triggerVariant="outline"
                itemVariant="outline"
                placeholder="ALL DISTRICTS"
                className="bg-primary text-white"
                options={districtFilterOptions}
                value={selectedCase}
                onChange={handleCaseTypeChange}
              />
            </div>

            <div className="text-primary text-end">
              {activeTab === "all" ? (
                <>
                  <p className="text-2xl font-bold">2,456</p>
                  <p className="text-sm font-bold">Total Magistrates across all divisions</p>
                </>
              ) : (
                <MModal />
              )}
            </div>
          </div>

          <ReusableTabs tabs={tabs} onTabChange={handleTabChange} activeTab={activeTab} />

          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
              <Input
                type="search"
                variant="ghost"
                autoComplete="off"
                placeholder="e.g. Search Magistrate Name"
                className="pl-9 h-12 md:w-[100px] lg:w-[400px]"
              />
            </div>

            <section className="flex gap-3">
              <FilterDropdown
                triggerVariant="outline"
                itemVariant="outline"
                placeholder="All Status"
                options={districtFilterOptions}
                value={selectedCase}
                onChange={handleCaseTypeChange}
              />

              {activeTab === "all" && (
                <FilterDropdown
                  triggerVariant="outline"
                  itemVariant="outline"
                  placeholder="SELECT COURT TYPE"
                  options={courtFilterOptions}
                  value={selectedCourt}
                  onChange={handleCourtTypeChange}
                />
              )}
            </section>
          </div>
        </div>
      </header>

      <main className="container py-3 overflow-y-auto h-[calc(100dvh - 150px)]">
        {children}
      </main>
    </div>
  );
}
