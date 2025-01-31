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

interface Notification {
  id: string;
  icon: "check" | "scale" | "initials";
  message: string;
  caseNumber: string;
  timestamp: string;
  initials?: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    icon: "check",
    message:
      "has been submitted and filed successfully. You will be notified of any updates",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    icon: "scale",
    message: "A Magistrate court (Division A) has been assigned to your case",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    icon: "initials",
    initials: "AA",
    message: "Magistrate Adebayo Adekoya is now presiding over your case",
    caseNumber: "CV/Wuse/233456789/2024 Stay tuned for updates!",
    timestamp: "2 hours ago",
  },
  {
    id: "4",
    icon: "check",
    message:
      "has been submitted and filed successfully. You will be notified of any updates",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 weeks ago",
  },
  {
    id: "5",
    icon: "scale",
    message: "A Magistrate court (Division A) has been assigned to your case",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 weeks ago",
  },
];



export default function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icons.bell className="h-6 w-4 text-muted-foreground" />
          <Badge className="absolute -top-0 rounded-xl -right-1 h-4 w-4 flex items-center justify-center bg-neutral">
            4
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white min-h-[36rem]" align="end" forceMount>
        <div className="w-full min-w-[32rem] max-w-lg mx-auto  rounded-lg">
          <div className="p-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold ">Notifications</h1>
            <div className="flex items-center gap-2">
              <Checkbox
                id="unread"
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
              <TabsTrigger
                value="hearings"
                className="text-neutral-400 rounded-none border-b-2 font-bold border-transparent data-[state=active]:border-[#6B1D1D] data-[state=active]:text-[#6B1D1D] px-0 py-2 shadow-none"
              >
                Hearings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="p-6 py-2">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xs font-medium text-stone-600">Recent</h2>
                  <div className="py-4 px-2 space-y-4">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id}>
                        <div className="flex items-center gap-4">
                          <NotificationIcon
                            type={notification.icon}
                            initials={notification.initials}
                          />
                          <div className="space-y-1">
                            <p className="text-xs font-semibold">
                              {notification.icon === "check" && (
                                <span className="font-extrabold">
                                  {notification.caseNumber}{" "}
                                </span>
                              )}
                              {notification.message}
                            </p>
                            {notification.icon !== "check" && (
                              <p className="text-xs font-extrabold">
                                {notification.caseNumber}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-xs flex justify-end text-stone-600">
                          {notification.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xs font-medium text-stone-600">Older</h2>
                  <div className="space-y-4 px-2 py-4">
                    {notifications.slice(3).map((notification) => (
                      <div key={notification.id}>
                        <div className="flex items-center gap-4">
                          <NotificationIcon
                            type={notification.icon}
                            initials={notification.initials}
                          />
                          <div className="space-y-1">
                            <p className="text-xs font-semibold">
                              {notification.icon === "check" && (
                                <span className="font-extrabold">
                                  {notification.caseNumber}{" "}
                                </span>
                              )}
                              {notification.message}
                            </p>
                            {notification.icon !== "check" && (
                              <p className="text-xs font-extrabold">
                                {notification.caseNumber}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-xs flex justify-end text-stone-600">
                          {notification.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
