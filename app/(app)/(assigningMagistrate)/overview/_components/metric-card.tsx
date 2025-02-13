import { Icons } from "@/components/svg/icons";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn, formatNumber } from "@/lib/utils";
import { IMetric } from "@/types/case";
import React, { useState } from "react";
import { StatBreakdown } from "./stat-breakdown";
import CountUp from "react-countup";

export interface ColorToVariant {
  [key: string]: string;
}

export const MetricCard: React.FC<{
  metric: IMetric;
  type: "case" | "magistrate" | "finances";
  className?: string;
}> = ({ metric, className, type }) => {
  const bgColors: ColorToVariant = {
    total: "bg-neutral-200",
    active: "bg-green-50",
    activedir: "bg-sky-50",
    unassigned: "bg-orange-50",
    reassigned: "bg-red-50",
    concluded: "bg-purple-50",
  };
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 bg-white shadow-customTwo rounded-lg">
        <div
          className={cn(
            `p-4 text-black font-bold`,
            className,
            bgColors[metric?.variant as keyof typeof bgColors]
          )}
        >
          {metric.title}
        </div>
        <div className="p-4 py-6">
          <p className="text-3xl text-app-primary font-bold flex items-center gap-1">
            {type === "finances" ? <Icons.naira /> : ""}
            <CountUp start={0} end={+metric.total} separator="," />
          </p>
          <span className="flex items-center space-x-1">
            <Icons.arrowUp className="h-4 w-4" />
            <p className="text-base font-medium text-app-primary">
              <span className="font-extrabold">
                {formatNumber(+metric.lastYear)}
              </span>{" "}
              in the last year
            </p>
          </span>
        </div>
        <button
          className="py-2 p-4 text-xs text-black font-bold cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold"> VIEW BREAKDOWN</span>
            <Icons.rightArrow className="h-4 w-4 text-neutral" />
          </div>
        </button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="bg-white w-[500px] md:!w-[613px] min-w-[613px] !max-w-none"
        >
          <StatBreakdown
            type={type}
            title={metric.title}
            value={+metric.total}
            change={+metric.lastYear}
            description={metric.description}
            divisions={metric.districts}
            variant={metric.variant}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
