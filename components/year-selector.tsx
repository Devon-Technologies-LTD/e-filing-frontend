"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function YearSelector() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = React.useState<string>("All Year");
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );
  const allYears = ["All year", ...years];

  return (
    <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 h-12 border-app-tertiary border-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select Year">
          <span
            className={cn("ml-2 uppercase text-neutral-600 font-bold text-xs")}
          >
            YEAR FILLED: {selectedYear}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-52">
        {allYears.map((year) => (
          <SelectItem
            variant="outline"
            className="uppercase min-w-40 "
            key={year}
            value={year.toString()}
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
