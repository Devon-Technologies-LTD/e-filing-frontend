import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IUsersColumn } from "./table-column";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AnalyticsChart } from "./analytics-chart";
import DeleteUser from "./delete-user";
import DeactivateUser from "./deactivate-user";
import { format } from "date-fns";

interface StatsCardProps {
  label: string;
  value: string | number;
  className?: string;
}

function StatsCard({ label, value, className }: StatsCardProps) {
  return (
    <div className={cn("", className)}>
      <p className="text-stone-600 font-bold opacity-60 text-sm">{label}</p>
      <p className="text-zinc-900 text-xs font-extrabold">{value}</p>
    </div>
  );
}
const chartData = [
  { label: "Total Assigned Case", value: 800 },
  { label: "Active Cases", value: 500 },
  { label: "Closed Cases", value: 400 },
  { label: "Re-Assigned Case", value: 300 },
];

export default function MagistrateProfile({ row }: { row: IUsersColumn }) {
  const initials = row.name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return (
    <>
      <Sheet>
        <SheetTrigger
          onClick={(e) => e.stopPropagation()}
          className="uppercase w-full text-left px-2 py-1.5 "
        >
          View profile
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-white !w-[500px] md:!w-[832px] min-w-[832px] !max-w-none"
        >
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-secondary-foreground font-bold text-black">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h1 className="text-xl font-bold">{row.name}</h1>
                  <p className="text-sm font-medium">{row.email}</p>
                </div>
                {/* <StatusBadge
                  tooltip={""}
                  tooltipProps={{ delayDuration: 200 }}
                  status={row.status as any}
                /> */}
              </div>
              <div className="flex items-center divide-x-2 gap-3">
                <div>
                  <p className="text-stone-700 opacity-60 font-bold text-sm">
                    {row?.role}
                  </p>
                  <p className="text-sm text-primary font-extrabold uppercase">
                    {row?.court_division ?? "-"}

                  </p>
                </div>
                <div className="px-3">
                  <p className="text-stone-700 opacity-60 font-bold text-sm">
                    Date Invited
                  </p>
                  <p className="text-sm text-primary font-extrabold uppercase">
                    {format(new Date(row?.created_at ?? ""), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex divide-x- justify-between py-6 border-b-2 items-center">
              <StatsCard label="Total Assigned Case" value={`2,345 Cases`} />
              <div className="border-l-2 h-12" />
              <StatsCard label="Active Cases" value={`5 Cases`} />
              <div className="border-l-2 h-12" />
              <StatsCard label="Closed Cases" value={`2,309 Cases`} />
              <div className="border-l-2 h-12" />
              <StatsCard label="Re-assigned Case" value={`11 Cases`} />
              <div className="border-l-2 h-12" />
              <StatsCard label="Avg. Resolution Time(Days)" value={`4 Days`} />
            </div>

            {/* Analytics */}
            <div className="border rounded-lg overflow-hidden">
              <AnalyticsChart data={chartData} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <DeleteUser
                trigger={<Button
                  variant="danger"
                  size={"medium"}
                  className="h-12 px-5"
                  onClick={() => { }}
                >
                  DELETE USER
                </Button>} userId={undefined} email={undefined} />
              <DeactivateUser
                row={row}
                trigger={
                  <Button
                    variant="ghost"
                    className="font-semibold"
                    onClick={() => { }}
                  >
                    {
                      // row.status === "ACTIVE"
                      row.status === "true"
                        ? "DE-ACTIVATE USER"
                        : "ACTIVATE USER"
                    }
                  </Button>
                }
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
