"use client";
import { useParams, useRouter } from "next/navigation";
import { MCaseFilterType } from "@/types/case";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { RoleToTabs } from "@/types/general";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import { useMemo } from "react";

const defaultTabs: { id: MCaseFilterType; label: string }[] = [];

const assigningMTabs: { id: MCaseFilterType; label: string }[] = [
  { id: "case", label: "Cases Metrics" },
  { id: "magistrate", label: "Magistrate Cases" },
];
const chiefJudgeTabs = [
  { id: "case", label: "Cases Metric" },
  { id: "magistrate", label: "Magistrate Cases" },
  { id: "financial", label: "Financial Metrics" },
];

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
    router.push(`/overview/${newTab}`);
  };

  const roleToTabs: RoleToTabs = {
    [ROLES.CHIEF_JUDGE]: chiefJudgeTabs,
    [ROLES.ASSIGNING_MAGISTRATES]: assigningMTabs,
  };
  const tabs = useMemo(() => {
    return roleToTabs[user?.role as string] || defaultTabs;
  }, [user?.role]);

  return (
    <div className="bg-zinc-100 min-h-dh">
      <header className="bg-white shadow-md pt-4 sticky top-0 z-10">
        <div className="container space-y-3">
          <h1 className="text-xl pb-4 font-bold uppercase">Overview</h1>
          {tabs.length > 0 && (
            <ReusableTabs
              tabs={tabs}
              onTabChange={handleTabChange}
              activeTab={activeTab}
            />
          )}
        </div>
      </header>
      <div className=" overflow-y-auto min-h-dvh">
        {children}
      </div>
    </div>
  );
}
