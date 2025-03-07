import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { useQuery } from "@tanstack/react-query";
import { getSingleCaseHistory } from "@/lib/actions/case-actions";
import ScheduleSheet from "./SchuduleSheet";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface HearingSheetProps {
  trigger: React.ReactNode;
  id: string;
}

export default function HearingSheet({ trigger, id }: HearingSheetProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["get_single_case_by_id", id],
    queryFn: async () => await getAdminCaseFilesById(id),
    enabled: !!id,
  });
  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["get_case_history", id],
    queryFn: async () => await getSingleCaseHistory(id),
    enabled: !!id,
  });

  return (
    <Sheet>
      <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <div className="space-y-8 mx-auto">
          <div className="space-y-10 w-full">
            <div>
              <p className="font-bold text-xl">Hearing History</p>
              <div className="font-semibold text-sm">
                Review the complete record of all scheduled hearings for this case, including dates, times, and any updates or changes made.
              </div>
            </div>
            <div className="grid border-b-2 pb-3">
              <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
              <p className="text-app-primary font-bold text-sm">{data?.case_suit_number}</p>
              <p className="text-app-primary font-bold text-sm">{data?.case_type_name}</p>
            </div>

            <div className="bg-zinc-100 p-4 justify-between text-sm flex">
              <p className="font-bold">DATE</p>
              <p>TIME</p>
            </div>

            {isLoadingHistory ? (
              <p>Loading...</p>
            ) : !history || !Array.isArray(history.data) || history.data.length === 0 ? (
              <div className="flex justify-between text-sm font-semibold pb-4 border-b-2 border-zinc-100">
                <p>-</p>
                <p>-</p>
              </div>
            ) : (
              <>
                {history.data.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm font-semibold pb-4 border-b-2 border-zinc-100">
                    <p>{item.hearing_date}</p>
                    <p>{item.hearing_time}</p>
                  </div>
                ))}
              </>
            )}
            <ScheduleSheet id={id}
              trigger={
                <DropdownMenuLabel className="w-full text-left">
                  <Button>SCHEDULE A HEARING</Button>
                </DropdownMenuLabel>
              }
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}