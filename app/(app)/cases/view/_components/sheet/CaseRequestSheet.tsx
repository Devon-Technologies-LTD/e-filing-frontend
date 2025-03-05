


import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
interface CaseRequestSheetProps {
    trigger: React.ReactNode;
    id: string;
}

export default function CaseRequestSheet({ trigger, id }: CaseRequestSheetProps) {

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

    return (
        <Sheet>
            <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
            <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
                <div className="space-y-8 mx-auto">
                    <div>
                        <p className="font-bold text-xl">Case Request</p>
                        <div className="font-semibold text-sm">
                            This Case will be submitted to the assigning magisterate for review. You will get notified on the decision
                        </div>
                    </div>

                    <div className="flex justify-between bg-neutral-300 px-4 py-6 border-b-2 border-neutral-400">
                        <div className="">
                            <p className="text-stone-600 text-sm">Case Assigning Magistrate</p>
                            <p className="text-app-primary font-extrabold">{data?.division_name}</p>
                        </div>
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarFallback className="text-app-primary bg-[#FDF5EC] border-app-primary border-2  ">  {getInitials(data?.claimant?.name)}</AvatarFallback>
                            </Avatar>
                            <div className="">
                                <p className="text-stone-600 text-sm">{data?.claimant?.name}</p>
                                <p className="font-bold text-xs">{data?.claimant?.email_address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b-2 pb-3">
                        <p className="text-stone-600 text-sm font-bold mb-2">Request for Re-assignment Case Suit Number</p>
                        <p className="text-app-primary font-bold text-sm">{data?.case_suit_number}</p>
                        <p className="text-app-primary font-bold text-sm">{data?.case_type_name}</p>
                        <StatusBadge status={data?.status}>{data?.status}</StatusBadge>
                    </div>

                    <p className="text-stone-600 text-sm font-bold mb-2">Request for Denial</p>
                    <div className="border-b-2 bg-zinc-300 pb-3">
                        <p>-</p>
                    </div>

                </div>
            </SheetContent>
        </Sheet>
    );
}
