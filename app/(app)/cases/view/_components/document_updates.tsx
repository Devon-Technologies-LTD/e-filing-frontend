import type React from "react";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { useState } from "react";
import { Icons } from "@/components/svg/icons";
import CaseHistoryTimeline from "./case-history";
import { getDocumentHistory, getDocumentActivity } from "@/lib/actions/case-file";
import { useQuery } from "@tanstack/react-query";
import { dateFormatter } from "@/lib/utils";
import { ActivityList } from "@/components/activity-list";

interface DocumentUpdatesProps {
  id: string;
}

interface DocumentItem {
  title: string;
  created_at: string;
  description: string;
  status: string;
}

export function DocumentUpdates({ id }: DocumentUpdatesProps) {
  const tabs = [
    { id: "recent", label: "Recent Activities" },
    { id: "history", label: "Document History" },
  ];

  const [activeTab, setActiveTab] = useState("recent");

  const {
    data: documentActivity,
    isLoading: isActivityLoading,
  } = useQuery({
    queryKey: ["documentActivity", id],
    queryFn: () => getDocumentActivity(id),
    enabled: !!id,
  });

  const isValidDate = (date: any) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  };


  const {
    data: documentHistory,
    isLoading: isHistoryLoading,
  } = useQuery({
    queryKey: ["documentHistory", id],
    queryFn: () => getDocumentHistory(id),
    enabled: !!id,
  });

  const timelineSteps = Array.isArray(documentHistory?.data.data)
    ? documentHistory.data.data.map((item: any) => ({
      title: item?.title,
      status: "completed",
      time: isValidDate(item?.created_at)
        ? dateFormatter(item.created_at).fullDate
        : "Invalid date",
    })) : [];

  const timelineStepsActivity = Array.isArray(documentActivity?.data.data)
    ? documentActivity.data.data.map((item: any) => ({
      description: item.title,
      status: "completed",
      created_at: isValidDate(item?.created_at)
        ? dateFormatter(item.created_at).fullDate
        : "Invalid date",
    })) : [];

  const isLoading = isActivityLoading || isHistoryLoading;

  return (
    <div className="bg-white space-y-4 w-full overflow-hidden p-4 rounded-lg shadow-sm">
      <div className="flex justify-between w-full items-center gap-4">
        <h2 className="flex items-center gap-3 font-semibold text-semibold">
          <Icons.recent /> DOCUMENT UPDATES
        </h2>
        <p className="text-xs font-medium">
          {timelineSteps.length} Updates available
        </p>
      </div>

      <ReusableTabs
        tablistClassName="text-xs"
        tabs={tabs}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      />

      <div className="py-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-10 text-gray-500 text-sm">
            Loading updates...
          </div>
        ) : (
          <>
            {activeTab === "recent" && (
              <ActivityList notifications={timelineStepsActivity ?? []} />
            )}
            {activeTab === "history" && (
              <CaseHistoryTimeline steps={timelineSteps} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
