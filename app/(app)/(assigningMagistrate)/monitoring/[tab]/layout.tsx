"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useCallback, createContext } from "react";
import { TCaseFilterType } from "@/types/case";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { RoleToTabs } from "@/types/general";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import { CaseTypes, COURT_TYPE, ALL_DISTRICT } from "@/types/files/case-type";

import { LocationAdmin } from "@/components/location-admin";
import { MonitoringContext } from "@/context/MonitoringContext";

export default function LayoutPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const activeTab = params?.tab as string;
  const { data: user } = useAppSelector((state) => state.profile);
  const handleTabChange = (newTab: string) => {
    router.push(`/monitoring/${newTab}`);
  };
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const [totalCase, setTotalCase] = useState<number>(0);
  const [caseName, setCaseName] = useState<string>("");
  const { caseType, caseTypeErrors } = useAppSelector((data) => data.caseFileForm);

  const defaultTabs: { id: TCaseFilterType; label: string }[] = [
    { id: "case", label: "My Cases" },
    { id: "reassigned", label: "Re-assigned Cases" },
    { id: "unassigned", label: "Unassigned Cases" },
    { id: "active", label: "Active Cases" },
    { id: "concluded", label: "Concluded Cases" },
    { id: "request", label: "Case Request" },
  ];

  const CheifJudegeTabs = [
    { id: "case", label: "All Cases" },
    { id: "reassigned", label: "Re-assigned Cases" },
    { id: "unassigned", label: "Unassigned Cases" },
    { id: "active", label: "Active Cases" },
    { id: "concluded", label: "Concluded Cases" },
  ];
  const DirectorMTabs = [
    { id: "case", label: "All Cases" },
    { id: "reassigned", label: "Re-assigned Cases" },
    { id: "unassigned", label: "Unassigned Cases" },
    { id: "active", label: "Active Cases" },
    { id: "concluded", label: "Concluded Cases" },
  ];

  const AssigningMTabs = [
    { id: "case", label: "All Cases" },
    { id: "unassigned", label: "Unassigned Cases" },
    { id: "request", label: "Case Requests" },
    { id: "reassigned", label: "Re-assigned Cases" },
    { id: "active", label: "Active Cases" },
    { id: "concluded", label: "Concluded Cases" },
  ];

  const roleToTabs: RoleToTabs = {
    [ROLES.CHIEF_JUDGE]: CheifJudegeTabs,
    [ROLES.ASSIGNING_MAGISTRATE]: AssigningMTabs,
    [ROLES.DIRECTOR_MAGISTRATE]: DirectorMTabs,
  };
  const tabs = useMemo(() => {
    return roleToTabs[user?.role as string] || defaultTabs;
  }, [user?.role]);


  const [selectedCourtDivision, setSelectedCourtDivision] = useState<string>(caseType.court_division);
  const handleCourtDivisionChange = (value: string) => {
    setSelectedCourtDivision(value);
  };

  return (
    <MonitoringContext.Provider value={{ totalCase, setTotalCase, caseName, setCaseName }}>
      <div className="container mx-auto space-y-8 py-4">
        <header className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <LocationAdmin
                placeholder="All District"
                value={selectedCase}
                className="bg-primary text-white"
                onChange={handleCourtDivisionChange}
                error={caseTypeErrors?.court_division}
              />
            </div>
            <div className="text-primary text-end">
              <>
                <p className="text-2xl font-bold">{totalCase}</p>
                <p className="text-sm font-bold uppercase ">{(caseName == "case") ? "ALL CASES" : `Total  ${caseName} cases`}</p>
              </>
            </div>
          </div>
          <ReusableTabs
            tabs={tabs}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
        </header>
        <div>{children}</div>
      </div>
    </MonitoringContext.Provider>
  );
}
