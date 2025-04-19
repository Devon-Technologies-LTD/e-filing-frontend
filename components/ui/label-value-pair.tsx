"use client";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export default function LabelValuePair({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-2">
      <label className="text-sm font-bold break-words">{label}</label>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-sm whitespace-pre font-medium break-words truncate">
              {value || "N/A"}
            </div>
          </TooltipTrigger>
          <TooltipContent className="text-black break-all font-bold bg-white border-0 text-sm">
            <div className="text-sm whitespace-pre-line font-semibold break-words">
              {value || "N/A"}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
