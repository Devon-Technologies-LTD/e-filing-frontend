/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { RoleToTabs } from "@/types/general";

const chiefJudgeTabs = [
  { id: "all", label: "All (Director) Magistrates" },
  { id: "pending", label: "Pending Invitation" },
];
const directorMagostrateTabs = [
  { id: "all", label: "All (Assigning) Magistrates" },
  { id: "pending", label: "Pending Invitation" },
];

const defaultTabs = [
  { id: "all", label: "All (Presiding) Magistrates" },
  { id: "pending", label: "Pending Invitation" },
];

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const activeTab = params?.tab as string;

  const roleToTabs: RoleToTabs = {
    [ROLES.CHIEF_JUDGE]: chiefJudgeTabs,
    [ROLES.DIRECTOR_MAGISTRATES]: directorMagostrateTabs,
  };

  const handleTabChange = (newTab: string) => {
    router.push(`/management/${newTab}`);
  };
  const { data: user } = useAppSelector((state) => state.profile);
  const tabs = useMemo(() => {
    return roleToTabs[user?.role as string] || defaultTabs; 
  }, [user?.role]);

  return (
    <div className="bg-zinc-100 min-h-dvh space-y-4">
      <header className="bg-white shadow-md pt-6 sticky top-0 z-10">
        <div className="container space-y-3">
          <h1 className="text-xl font-bold uppercase">USER MANAGEMENT</h1>
          <ReusableTabs
            tabs={tabs}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
        </div>
      </header>
      <div className="container py-3 overflow-y-auto h-[calc(100dvh - 150px)]">
        {children}
      </div>
    </div>
  );
}
