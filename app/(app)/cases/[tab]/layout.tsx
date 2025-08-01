"use client";
import { useParams, useRouter } from "next/navigation";
import { TCaseFilterType } from "@/types/case";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { RoleToTabs } from "@/types/general";
import { ROLES } from "@/types/auth";
import { useMemo } from "react";
import { useAppSelector } from "@/hooks/redux";

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
    router.push(`/cases/${newTab}`);
  };
  const defaultTabs: { id: TCaseFilterType; label: string }[] = [
    { id: "recent", label: "Recent Cases" },
    { id: "active", label: "Active Cases" },
    { id: "unassigned", label: "Unassigned Cases" },
    { id: "concluded", label: "Concluded Cases" },
    { id: "joined", label: "Joined Cases" },
  ];
  const directorTabs = [
    { id: "assigned", label: "Assigned To Me" },
    { id: "submitted", label: "Submitted Request" },
    { id: "concluded", label: "Concluded Cases" },
  ];
  const presidingTabs = [
    { id: "assigned", label: "Assigned To Me" },
    { id: "submitted", label: "Submitted Request" },
    { id: "concluded", label: "Concluded Cases" },
  ];
  const assigningMagistrateTabs = [
    { id: "case", label: "My Cases" },
    { id: "active", label: "Active Cases" },
    { id: "concluded", label: "Concluded Cases" },
  ];
   const centralaRegistrarTabs = [
      { id: "under-review", label: "Under Review" },
      { id: "approved-review", label: "Approved Cases Filed" },
      { id: "denied-review", label: "Denied Cases Filed" },
    ];

  const roleToTabs: RoleToTabs = {
    [ROLES.DIRECTOR_MAGISTRATE]: directorTabs,
    [ROLES.ASSIGNING_MAGISTRATE]: assigningMagistrateTabs,
    [ROLES.PRESIDING_MAGISTRATE]: presidingTabs,
    [ROLES.CENTRAL_REGISTRAR]: centralaRegistrarTabs,
  };
  const tabs = useMemo(() => {
    return roleToTabs[user?.role as string] || defaultTabs;
  }, [user?.role]);

  return (
    <div className="h-full bg-white">
      <div className="flex flex-col h-full mx-auto gap-3">
        <header className="shadow-md space-y-4">
          <div className="container space-y-3 pt-4">
            <h1 className="text-xl font-semibold uppercase">Your Cases</h1>
            <ReusableTabs
              tabs={tabs}
              onTabChange={handleTabChange}
              activeTab={activeTab}
            />
          </div>
        </header>
        <div className="flex-1 container py-8 overflow-auto">
          {children}</div>
      </div>
    </div>
  );
}
