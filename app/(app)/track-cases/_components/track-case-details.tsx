/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import type React from "react"; 
import { StatusBadge } from "@/components/ui/status-badge";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaseStatus } from "@/constants";

export function TrackCaseDetails() {
  const tabs: { id: any; label: string }[] = [
    { id: "activities", label: "All Activities" },
    { id: "hearings", label: "Hearings" },
  ];
  const [activeTab, setActiveTab] = useState("activities");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  const router = useRouter();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div className="">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg">CV/WZ2/001e/Year</h2>
            <StatusBadge status={CaseStatus.Approved}>
              CRIMINAL CASE - CLAIMANT
            </StatusBadge>
            <StatusBadge
              tooltip="A Presiding Magistrate is attached to this case"
              tooltipProps={{ delayDuration: 200 }}
              status={CaseStatus.UnderReview}
            />
          </div>
          <p className="text-black font-medium text-sm">John Doe V. Jane Doe</p>
        </div>
        <Button
          onClick={() =>
            router.push(`/cases/view/${encodeURIComponent("CV/WZ2/001e/Year")}`)
          }
          variant={"default"}
          className="font-semibold text-sm"
        >
          VIEW CASE PAGE
        </Button>
      </div>

      <ReusableTabs
        tabs={tabs}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
      <div className="py-4">
        {/* {activeTab === "activities" && <AllActivities />} */}
        {/* {activeTab === "hearings" && <Hearings />} */}
      </div>
    </div>
  );
}
