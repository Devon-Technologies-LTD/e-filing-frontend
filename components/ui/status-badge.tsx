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

const VARIANT_STYLES = {
  draft: "bg-amber-50 text-amber-800 border-amber-200",
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  approved: "bg-green-50 text-green-800 opacity-60",
  ["to be assigned"]: "bg-red-50 text-red-800 border-red-200",
  ["judgement delivered"]: "bg-blue-50 text-blue-800 border-blue-200",
  ["struck out"]: "bg-green-50 text-green-700 opacity-60",
  ["under review"]: "bg-gray-50 text-gray-800 border-gray-200",
  denied: "bg-rose-50 text-rose-800 border-rose-200",
  assigned: "bg-lime-50 text-lime-800 border-lime-200",
  ["action required"]: "bg-red-50 text-red-500 border-red-200",
};

interface StatusBadgeProps {
  status: CaseStatus;
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
  const variantClass = VARIANT_STYLES[status] || "bg-gray-50 text-gray-800";
  console.log("status inside the view", status);
  const badgeElement = (
    <Badge
      variant="outline"
      className={cn(
        "whitespace-nowrap font-bold uppercase py-1 border-none text-xs rounded-2xl",
        variantClass,
        className
      )}
    >
      {children || (status ? String(status)?.toLowerCase() : "N/A")}
    </Badge>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip {...tooltipProps}>
          <TooltipTrigger>{badgeElement}</TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-zinc-700 font-medium text-xs"
          >
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeElement;
}
