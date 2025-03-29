

import React, { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/svg/icons";

import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { useQuery } from "@tanstack/react-query";
import { reassignmentHistory } from "@/lib/actions/case-actions";

interface ReAssignmentSheetProps {
  trigger: React.ReactNode;
  id: string,
}


export default function ReAssignmentSheet({ trigger, id }: ReAssignmentSheetProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["get_single_case_by_id"],
    queryFn: async () => {
      return await getAdminCaseFilesById(id);
    },
    enabled: !!id,
  });

  const getInitials = (name: string | undefined) => {
    if (!name) return "CN";
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["get_case_reassignment_history", id],
    queryFn: async () => await reassignmentHistory(id),
    enabled: !!id,
  });


  return (
    <Sheet>
      <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <div className="space-y-10 mx-auto">
          <div className="space-y-6 w-full">
            <div>
              <p className="font-bold text-xl">Re-assignment History</p>
              <div className="font-semibold text-sm">
                Review the complete log of case re-assignments, including reasons, dates, and the magistrates involved for full transparency
              </div>
            </div>

            <div className="flex justify-between bg-neutral-300 px-4 py-6 border-b-2 border-neutral-400">
              <div className="grid">
                <p className="text-stone-600 text-sm">Case Assigning Magistrate</p>
                <p className="text-app-primary font-extrabold">{data?.division_name}</p>
              </div>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarFallback className="text-app-primary bg-[#FDF5EC] border-app-primary border-2  ">  {getInitials(data?.claimant?.name)}</AvatarFallback>
                </Avatar>
                <div className="">
                  <p className="text-stone-600 text-sm">{data?.claimant?.name}</p>
                  <p className="font-bold">{data?.claimant?.email_address}</p>
                </div>
              </div>
            </div>

            <div className="border-b-2 pb-3">
              <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
              <p className="text-app-primary font-bold text-sm">{data?.case_suit_number}</p>
              <p className="text-app-primary font-bold text-sm">{data?.case_type_name}</p>
            </div>

            {isLoadingHistory ? (
              <p>Loading...</p>
            ) : !history || !Array.isArray(history.data) || history.data.length === 0 ? (
              <div className="space-y-6">
                <div className="gap-2 border-b-[1px] space-y-2 border-app-primary py-4">
                  <div className="flex justify-start">
                    <div className="text-sm">
                      <p className="font-bold">-</p>
                      <p className="font-semibold">-</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-[600px] w-full p-4">
                <div className="space-y-6">
                  {history.data.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="gap-2 border-b-[1px] space-y-2 border-app-primary py-4"
                    >
                      {/* Timestamp */}
                      <p className="text-xs font-bold text-stone-600">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })}
                      </p>


                      {/* Status and Request Reason */}
                      <div className="flex justify-start">
                        {item.status === "PENDING" ? (
                          <Icons.Redcross className="size-8 h-6 w-6" />
                        ) : (
                          <Icons.check />
                        )}
                        <div className="text-sm ml-2">
                          <p className="font-bold">{item.status}</p>
                          <p className="font-semibold">{item.request_reason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


