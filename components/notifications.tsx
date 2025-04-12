"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Icons } from "./svg/icons";
import { Badge } from "./ui/badge";
import { NotificationIcon } from "./ui/notifications-icon";
import { getNotification, updateNotification } from "@/lib/actions/admin-file";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { format } from "date-fns";
import { Notifications } from "@/types/case";




export default function getNotifications() {

  const [notifications, setNotification] = useState<Notifications[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      setLoading(true);
      try {
        const response = await getNotification();
        if (response.success) {
          setNotification(response.data || []);
        } else {
          throw new Error(response.message || "Failed to fetch Notification");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchNotification(); // Load only once on component mount
  }, []);

  const markAsRead = async (id: string, status: string) => {
    try {
      if (status != "read") {
        const response = await updateNotification(id);
        if (response.success) {
          setNotification(response.data || []);
        } else {
          throw new Error(response.message || "Failed to fetch Notification");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };


  if (loading) {
    return (
      <div className="space-y-1 p-4 flex justify-between items-center">
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
      </div>
    );
  }

  if (error) return <><Icons.bell className="h-6 w-4 text-muted-foreground" /></>;
  // if (notifications.length === 0) return <p>No Notification yet.</p>;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icons.bell className="h-6 w-4 text-muted-foreground" />
          <Badge className="absolute -top-0 rounded-xl -right-1 h-4 w-4 flex items-center justify-center bg-neutral">
            {notifications.filter((n) => n.status !== "read").length}
          </Badge>

        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white min-h-[36rem]"
        align="end"
        forceMount
      >
        <div className="w-full min-w-[32rem] max-w-lg mx-auto  rounded-lg">
          <div className="p-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold ">Notifications</h1>
            <div className="flex items-center gap-2">
              <Checkbox
                id="unread"
                checked={showUnreadOnly}
                onCheckedChange={() => setShowUnreadOnly((prev) => !prev)}
                className="border-[#010005] border-2 rounded-sm"
              />
              <label
                htmlFor="unread"
                className="text-sm text-black font-semibold"
              >
                Only show unread
              </label>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full ">
            <TabsList className="w-full justify-start rounded-none border-b h-auto space-x-6 px-6 py-0">
              <TabsTrigger
                value="all"
                className="text-neutral-400 rounded-none border-b-2 font-bold border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-2 shadow-none"
              >
                All Notification
              </TabsTrigger>
              {/* <TabsTrigger value="hearings" className="text-neutral-400 rounded-none border-b-2 font-bold border-transparent data-[state=active]:border-[#6B1D1D] data-[state=active]:text-[#6B1D1D] px-0 py-2 shadow-none">
                Hearings
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="all" className="p-6 py-2">
              <ScrollArea className="max-h-[calc(100dvh-300px)] overflow-y-auto rounded-md px-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xs font-medium text-stone-600">Recent</h2>
                    <div className="py-4 px-2 space-y-4">
                      {(showUnreadOnly ? notifications.filter(n => n.status !== "read") : notifications).map((notification) => (
                        <div key={notification.id} onClick={() => markAsRead(notification.id!, notification.status!)}>
                          <div className="flex items-center gap-4">
                            <NotificationIcon
                              type={notification.title === "Hearing scheduled" ? "scale" : "check"}
                              initials="initials"
                            />
                            <div className="space-y-1">
                              <p className="text-xs font-semibold">
                                {notification.title === "Hearing scheduled" && (
                                  <span className="font-extrabold">
                                    {notification.case_id}
                                  </span>
                                )}{" "}
                                {notification.description}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs flex justify-end text-stone-600">
                            {format(new Date(notification.created_at ?? ""), "MMM dd, yyyy")}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="hearings" className="p-6">
              <div className="relative w-full flex flex-col items-center justify-center rounded-lg">
                <Icons.empty />
                <p className="absolute bottom-2 font-semibold max-w-44 text-sm text-center">
                  You have no notifications from the last 30 days.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


// const notifications: Notification[] = [
//   {
//     id: "1",
//     icon: "check",
//     message:
//       "has been submitted and filed successfully. You will be notified of any updates",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "2",
//     icon: "scale",
//     message: "A Magistrate court (Division A) has been assigned to your case",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "3",
//     icon: "initials",
//     initials: "AA",
//     message: "Magistrate Adebayo Adekoya is now presiding over your case",
//     caseNumber: "CV/WZ2/001e/Year Stay tuned for updates!",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "4",
//     icon: "check",
//     message:
//       "has been submitted and filed successfully. You will be notified of any updates",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 weeks ago",
//   },
//   {
//     id: "5",
//     icon: "scale",
//     message: "A Magistrate court (Division A) has been assigned to your case",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 weeks ago",
//   },
// ];