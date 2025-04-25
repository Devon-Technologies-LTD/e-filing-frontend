/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react"; // Import React
import ReusableTabs from "@/components/ui/reusable-tabs";
import { useState } from "react";
import { Icons } from "@/components/svg/icons";
import { ActivityList } from "@/components/activity-list";
// import { documentHistory, notifications } from "@/lib/dummy-data";
import CaseHistoryTimeline from "./case-history";

export function DocumentUpdates() {
  const tabs: { id: any; label: string }[] = [
    { id: "recent", label: "Recent Activities" },
    { id: "history", label: "Document History" },
  ];
  const [activeTab, setActiveTab] = useState("recent");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="bg-white space-y-4 w-full overflow-hidden p-4 rounded-lg shadow-sm">
      <div className="flex justify-between w-full items-center gap-4">
        <h2 className="flex items-center gap-3 font-semibold text-semibold">
          <Icons.recent /> DOCUMENT UPDATES
        </h2>
        <p className="text-xs font-medium">3 Updates available</p>
      </div>
      <ReusableTabs
        tablistClassName="text-xs"
        tabs={tabs}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
      {/* <ScrollArea className="h-[calc(100dvh-300px)] max-h-[calc(100dvh-300px)] overflow-y-auto rounded-md "> */}
      <div className="py-4">
        {/* {activeTab === "recent" && (
            <ActivityList notifications={documentHistory} />
          )} */}
        {activeTab === "history" && (
          <CaseHistoryTimeline
            steps={[
              {
                title: "Case Filed Successfully",
                description:
                  "Suit Number #12345 generated, QR Code and electronic seal issued.",
                status: "completed",
                time: "5/01/2025",
              },
              {
                title: "Awaiting to be assigned to a Magistrate",
                description:
                  "No Magistrate has been assigned to this case yet",
                status: "pending",
                time: "5/01/2025",
              },
            ]}
          />
        )}
        {/* {activeTab === "hearings" && (
            <ActivityList
              notifications={notifications.filter((n) => n.icon === "hearings")}
            />
          )} */}
      </div>
      {/* </ScrollArea> */}
    </div>
  );
}
