"use client";


import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { parse, format } from "date-fns";
import { createCaseFile } from "@/lib/actions/case-actions";
import { ErrorResponse } from "@/types/auth";

interface ScheduleSheetProps {
  trigger: React.ReactNode;
  id: string;
}

export default function ScheduleSheet({ trigger, id }: ScheduleSheetProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["get_single_case_by_id"],
    queryFn: async () => {
      return await getAdminCaseFilesById(id);
    },
    enabled: !!id,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!date) return toast.error("Please select a hearing date.");
    if (!time) return toast.error("Please select a time.");

    setIsSubmitting(true);
    const parsedTime = parse(time, "hh:mm a", new Date());
    try {
      const formData = {
        hearing_date: format(date, "yyyy-MM-dd"),
        hearing_time: format(parsedTime, "HH:mm:ss"),
        other_details: details,
        casefile_id: data.id,
      };
      const response = await createCaseFile(formData, data.id);
      if (response.success) {
        toast.success("Schedule confirmed successfully.");
      } else {
        toast.error(`${response.data.message}: ${response.data.error}`);
      }
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <div className="space-y-8 mx-auto">
          <div>
            <p className="font-bold text-xl">Schedule Case Hearings</p>
            <div className="font-semibold text-sm">
              Set the date, time, and details for the hearing. All parties will be notified once confirmed.
            </div>
          </div>
          <div className="grid border-b-2 pb-3">
            <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
            <span className="text-app-primary font-bold text-sm">{data?.case_suit_number}</span>
            <span className="text-app-primary font-bold text-sm">{data?.case_type_name}</span>
          </div>
          <div className="flex justify-between gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
                  {date ? format(date, "LLL dd, y") : "HEARING DATE"}
                  <ChevronDown className="ml-auto h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" forceMount className="pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setIsOpen(false); // Close popover on selection
                  }}
                  className="cursor-pointer"
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("h-11 w-full text-left border-2", !time && "text-muted-foreground")}>
                  {time ?? "TIME"} <ChevronDown className="ml-auto h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" forceMount className="pointer-events-auto">
                <div className="flex flex-col space-y-1">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        setTime(slot);
                      }}
                      className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded w-full text-left cursor-pointer"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>


          </div>
          <div className="space-y-2">
            <p className="font-bold text-base">Other details (Optional)</p>
            <Textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Type here." className="bg-neutral-100 border-b-2 h-52 border-gray-300" />
          </div>
          <form onSubmit={handleSubmit}>
            <Button type="submit" disabled={isSubmitting || !date || !time}>
              {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              CONFIRM SCHEDULE
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
