"use client";
import { useParams, useRouter } from "next/navigation";
import { TCaseFilterType } from "@/types/case";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { RoleToTabs } from "@/types/general";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";

import { useMemo } from "react";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const activeTab = params?.tab as string;
  const { data: user } = useAppSelector((state) => state.profile);

  const handleTabChange = (newTab: string) => {
    router.push(`/monitoring/${newTab}`);
  };

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
    { id: "request", label: "Cases Request" },
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

  return (
    <div className="container mx-auto space-y-8 py-4">
      <header className="space-y-4">
        <h1 className="text-xl font-semibold uppercase">Your Cases</h1>
        <ReusableTabs
          tabs={tabs}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />
      </header>
      <div>{children}</div>
    </div>
  );
}
