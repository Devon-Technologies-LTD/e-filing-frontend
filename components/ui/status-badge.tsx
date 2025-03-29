import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import React from "react";
import { CaseStatus } from "@/constants";


const VARIANT_STYLES: Record<CaseStatus, string> = {
  draft: "bg-amber-100 text-amber-900 border-amber-300",
  pending: "bg-amber-100 text-amber-900 border-amber-300",
  approved: "bg-green-100 text-green-900 border-green-300",
  "to be assigned": "bg-red-100 text-red-900 border-red-300",
  "judgement delivered": "bg-gray-100 text-gray-900 border-gray-300",
  "struck out": "bg-gray-100 text-gray-900 border-gray-300",
  "under review": "bg-rose-100 text-rose-900 border-rose-300",
  denied: "bg-rose-100 text-rose-900 border-rose-300",
  assigned: "bg-lime-100 text-lime-900 border-lime-300",
  "IsHearing": "bg-lime-100 text-lime-900 border-lime-300",
  "action required": "bg-red-100 text-red-900 border-red-300",
};

interface StatusBadgeProps {
  status: CaseStatus | string;
  className?: string;
  children?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
}

export function StatusBadge({
  status,
  className,
  children,
  tooltip,
  tooltipProps,
}: StatusBadgeProps) {
  const variantClass =
    status in VARIANT_STYLES
      ? VARIANT_STYLES[status as CaseStatus]
      : "bg-gray-100 text-green-900 border-green-300";

  const badgeElement = (
    <Badge
      variant="outline"
      className={cn(
        "whitespace-nowrap font-semibold uppercase py-1 px-2 border text-xs rounded-full",
        variantClass,
        className
      )}
    >
      {children || status.toLowerCase() || "N/A"}
    </Badge>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip {...tooltipProps}>
          <TooltipTrigger>{badgeElement}</TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="bg-white text-gray-700 font-medium text-xs shadow-md border border-gray-200 rounded-md p-2"
          >
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeElement;
}
