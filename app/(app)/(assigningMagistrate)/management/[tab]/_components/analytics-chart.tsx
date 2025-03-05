"use client";
import { BarChart, ChevronDown, ChevronsDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface ChartData {
  label: string;
  value: number;
}

interface AnalyticsChartProps {
  data: ChartData[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between gap-2 p-4 w-full bg-[#FDF7F5] hover:bg-[#FDF7F5]/80"
      >
        <span className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          <span className="font-extrabold">Analytics</span>
        </span>
        <ChevronDown
          className={`transition-transform duration-200 h-4 w-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-6 space-y-6">
        <h3 className="font-semibold text-sm">Individual Performance Metric</h3>
        <div className="relative h-80">
          <div className="absolute left-0 bottom-0 top-8 flex flex-col justify-between text-sm text-gray-500">
            {[1000, 800, 600, 400, 200, 0].map((value) => (
              <span key={value} className="text-[#475367]">
                {value.toLocaleString()}
              </span>
            ))}
          </div>
          <div className="absolute left-12 right-0 bottom-0 top-8 flex items-end gap-8">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-0"
              >
                <div
                  className="w-full bg-[#E4A853] rounded-sm transition-all duration-500"
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                  }}
                />
                <span className="text-sm text-[#667185] font-semibold text-center whitespace-pre-wrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
