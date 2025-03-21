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
const assigningMagostrateTabs = [
  { id: "all", label: "All (Presiding) Magistrates" },
  { id: "registerars", label: "Central Registrar" },
  { id: "pending", label: "Pending Invitation" },
];
const defaultTab = [
  { id: "all", label: "All (Presiding) Magistrates" },
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
    [ROLES.DIRECTOR_MAGISTRATE]: directorMagostrateTabs,
    [ROLES.ASSIGNING_MAGISTRATE]: assigningMagostrateTabs,
  };

  const handleTabChange = (newTab: string) => {
    router.push(`/management/${newTab}`);
  };
  const { data: user } = useAppSelector((state) => state.profile);

  const tabs = useMemo(() => {
    return roleToTabs[user?.role as string] ?? defaultTab;
  }, [user?.role]);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      <header className="shadow-md space-y-4">
        <div className="container space-y-3 pt-4">
          <h1 className="text-xl font-semibold uppercase">USER MANAGEMENT</h1>
          <ReusableTabs
            tabs={tabs}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
        </div>
      </header>
      {/* <div className="container py-3 overflow-y-auto h-[calc(100dvh - 150px)]"> */}
      <div className="flex-1 container py-4 overflow-auto">
        {children}
      </div>
    </div>
  );
}
