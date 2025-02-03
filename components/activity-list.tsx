import { NotificationIcon } from "@/components/ui/notifications-icon";
import React from "react";
export interface INotification {
  id: string;
  icon: "check" | "scale" | "initials" | "hearings" | "pdf" | "shield";
  message: string;
  caseNumber: string;
  timestamp: string;
  initials?: string;
}

interface ActivityListProps {
  notifications: INotification[];
  showCaseNumberForCheck?: boolean;
}

export function ActivityList({
  notifications,
  showCaseNumberForCheck = true,
}: ActivityListProps) {
  return (
    <div className="space-y-6">
      <p className="text-xs font-extrabold text-stone-600">Recent</p>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="border-b py-3"
        >
          <div className="flex items-center gap-4">
            <NotificationIcon
              type={notification.icon}
              initials={notification.initials}
            />
            <div className="space-y-1 max-w-md">
              <p className="text-sm font-semibold">
                {showCaseNumberForCheck && notification.icon === "check" && (
                  <span className="font-extrabold">
                    {notification.caseNumber}{" "}
                  </span>
                )}
                {notification.message}
              </p>
              {(!showCaseNumberForCheck || notification.icon !== "check") && (
                <p className="text-sm font-extrabold">
                  {notification.caseNumber}
                </p>
              )}
            </div>
          </div>
          <span className="text-xs text-stone-600 font-bold opacity-60 flex justify-end">
            {notification.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
}
