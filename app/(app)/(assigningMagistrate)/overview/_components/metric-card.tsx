import { Icons } from "@/components/svg/icons";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn, formatNumber } from "@/lib/utils";
import React, { useState } from "react";
import CountUp from "react-countup";
import Link from "next/link";
import { StatBreakdown } from "./stat-breakdown";

export interface ColorToVariant {
  [key: string]: string;
}

export const MetricCard: React.FC<{
  metric: any;
  metricKey: string;
  type: "case" | "magistrate" | "finances";
  rightModal: boolean | undefined;
  className?: string;
  description?: string;
  value?: string;
}> = ({ metric, description, className, rightModal, type, metricKey , value }) => {
  const bgColors: ColorToVariant = {
    total: "bg-neutral-200",
    active: "bg-green-50",
    assigned: "bg-sky-50",
    unassigned: "bg-orange-50",
    reassigned: "bg-red-50",
    concluded: "bg-purple-50",
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-4 pb-4 my-4 bg-white shadow-customTwo rounded-lg grid-cols-[repeat(auto-fit,minmax(250px,1fr))">
        <div className={cn(
            "p-4 sm:p-3 text-black font-semibold text-sm sm:text-base",
            className,
            bgColors[metricKey as keyof typeof bgColors] || "bg-neutral-100"
          )}>
          {value} 
        </div>
        <div className="p-4 sm:p-3 py-6 sm:py-4">
          <p className="text-3xl  text-app-primary font-bold flex items-center gap-1">
            {type === "finances" ? <Icons.naira /> : ""}
            <CountUp start={0} end={Number(metric?.total) || 0} separator="," />
          </p>
          <span className="flex items-center space-x-1">
            <Icons.arrowUp className="h-4 w-4 sm:h-3 sm:w-3" />
            <p className="text-base sm:text-sm font-medium text-app-primary">
              <span className="font-extrabold">
                {formatNumber(Number(metric?.difference) || 0)}
              </span>
              {" "}
              in the last year
            </p>
          </span>
        </div>

        {rightModal ? (
          <Link href="/cases/under-review">
            <div className="flex items-center space-x-2 cursor-pointer px-4 sm:px-3 py-2 sm:py-1">
              <span className="text-xs sm:text-[10px] font-bold">VIEW BREAKDOWN</span>
              <Icons.rightArrow className="h-4 w-4 sm:h-3 sm:w-3 text-neutral" />
            </div>
          </Link>
        ) : (
          <button
            className="py-2 p-4 sm:p-3 text-xs sm:text-[10px] text-black font-bold cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-[10px] font-bold">VIEW BREAKDOWN</span>
              <Icons.rightArrow className="h-4 w-4 sm:h-3 sm:w-3 text-neutral" />
            </div>
          </button>
        )}
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="bg-white w-full max-w-[90vw] md:w-[500px] md:!w-[613px] min-w-[300px] !max-w-none"
        >
          <StatBreakdown
            type={type}
            metricKey={metricKey}
            value={value}
            description={description}
            metric={metric}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
