import { NotificationIcon } from "@/components/ui/notifications-icon";
import React from "react";
import { Icons } from "./svg/icons";
import { format } from "date-fns";

interface Hearing {
  id: string;
  casefile_id: string;
  hearing_date: string;
  description: string;
  hearing_time: string;
  other_details: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ActivityListProps {
  notifications: Hearing[];
  showCaseNumberForCheck?: boolean;
}

export function ActivityList({
  notifications,
  showCaseNumberForCheck = true,
}: ActivityListProps) {
  return (
    <div className="space-y-6">
      <p className="text-xs font-extrabold text-stone-600">Recent</p>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-stone-500 py-10">
          <Icons.empty className="w-20 h-20 mb-2" />
          <p className="text-sm font-medium">No recent Hearing</p>
          <p className="text-xs opacity-70">You're all caught up for now!</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div key={notification.id} className="border-b py-3">
            <div className="flex items-center gap-4">
              <div className="flex space-x-2 w-2/3 items-center">
                <Icons.calender className="h-1- w-10 flex-shrink-0" />
                <span className="text-sm font-semibold">{notification.description}</span>
              </div>
            </div>
            <span className="text-xs text-stone-600 font-bold opacity-60 flex justify-end">
              {format(new Date(notification.created_at ?? ""), "MMM dd, yyyy")}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
