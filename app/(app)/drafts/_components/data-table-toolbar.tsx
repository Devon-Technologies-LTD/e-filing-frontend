"use client";
import { CalendarIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export function DraftsDataTableToolbar({ date, setDate }: any) {
 
  return (
    <div className="flex items-center justify-between">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
        <Input
          type="search"
          variant="ghost"
          autoComplete="off"
          data-form-type="other"
          placeholder="e.g search case name"
          className="pl-9 h-12 md:w-[100px] opacity-30 lg:w-[400px]"
        />
      </div>

      <section className="flex gap-3">
        {/* <FilterDropdown
          triggerVariant="outline"
          itemVariant="outline"
          placeholder="LAST EDITED: MOST RECENT"
          options={caseFilter}
          value={selectedCase}
          onChange={handleCaseTypeChange}
        /> */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                " h-11 focus:bg-secondary-foreground py-1.5 pl-2 pr-2 justify-start text-left border-2 border-app-tertiary bg-background hover:border-primary text-neutral-600 font-bold text-sm",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </section>
    </div>
  );
}
