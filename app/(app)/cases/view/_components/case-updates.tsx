/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react"; // Import React
import ReusableTabs from "@/components/ui/reusable-tabs";
import { useState } from "react";
import { Icons } from "@/components/svg/icons";
import { ActivityList } from "@/components/activity-list";
import { notifications } from "@/lib/dummy-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import CaseHistoryTimeline from "./case-history";
import { useQuery } from "@tanstack/react-query";
import { getCaseActivity } from "@/lib/actions/case-file";
import { NotificationIcon } from "@/components/ui/notifications-icon";
import { dateFormatter, formatDate } from "@/lib/utils";
import NotificationSkeleton from "./activity-skeleton";

interface INotification {
  id: string;
  initials: string;
  title: string;
  created_at: string;
}
export function CaseUpdates({ id }: { id: string }) {

  // useEffect(() => {
  //   const fetchNotification = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await getNotification();
  //       if (response.success) {
  //         setNotification(response.data || []);
  //       } else {
  //         throw new Error(response.message || "Failed to fetch Notification");
  //       }
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "An error occurred");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNotification(); // Load only once on component mount
  // }, []);

  const tabs: { id: any; label: string }[] = [
    { id: "recent", label: "Recent Activities" },
    { id: "history", label: "Case History" },
    { id: "hearings", label: "Hearings" },
  ];
  const [activeTab, setActiveTab] = useState("recent");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const { data, isLoading: activityLoading } = useQuery({
    queryKey: ["get_case_activity", id],
    queryFn: async () => {
      return await getCaseActivity(id);
    },
    staleTime: 50000,
  });
  const { data: hearingData, isLoading: hearingLoading } = useQuery({
    queryKey: ["get_case_hearing"],
    queryFn: async () => {
      return await getCaseActivity(id);
    },
    staleTime: 50000,
  });

  const timelineSteps = data?.history?.map((item: any) => ({
    title: "Case Filed Successfully",
    description: item?.title,
    status: "completed",
    time: dateFormatter(item?.created_at).fullDate,
  }));
  return (
    <div className="bg-white space-y-4 w-full overflow-hidden p-4 px-2 rounded-lg shadow-sm">
      <div className="flex justify-between w-full items-center gap-4">
        <h2 className="flex items-center gap-3 font-semibold text-semibold">
          <Icons.recent /> CASE UPDATES
        </h2>
        <p className="text-xs font-medium"> Updates available</p>
      </div>

      <ReusableTabs
        tablistClassName="text-xs"
        tabs={tabs}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
      <ScrollArea className="h-[calc(100dvh-300px)] max-h-[calc(100dvh-300px)] overflow-y-auto rounded-md px-2">
        <div className="py-4">
          {activeTab === "recent" && (
            <>
              {activityLoading ? (
                <NotificationSkeleton />
              ) : (
                <div className="space-y-6">
                  <p className="text-xs font-extrabold text-stone-600">
                    Recent
                  </p>
                  {data?.activity?.map((notification: INotification) => (
                    <div key={notification.id} className="border-b py-3">
                      <div className="flex items-center gap-4">
                        <NotificationIcon
                          type={"check"}
                          initials={notification.initials}
                        />
                        <div className="space-y-1 max-w-md">
                          <p className="text-sm font-semibold">
                            {notification.title}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-stone-600 font-bold opacity-60 flex justify-end">
                        {dateFormatter(notification.created_at).relativeTime}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {activeTab === "history" && (
            <>
              {activityLoading ? (
                <NotificationSkeleton />
              ) : (
                <CaseHistoryTimeline steps={timelineSteps} />
              )}
            </>
          )}
          {activeTab === "hearings" && (
            <>
              {hearingLoading ? (
                <NotificationSkeleton />
              ) : (
                <ActivityList
                  notifications={notifications.filter(
                    (n) => n.icon === "hearings"
                  )}
                />
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
