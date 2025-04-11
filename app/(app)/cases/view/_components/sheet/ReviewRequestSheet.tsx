

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query";
import { getAdminCaseFilesById, getReassignmentHistory } from "@/lib/actions/case-file";
import { getInitials } from "@/constants";
import { StatusBadge } from "@/components/ui/status-badge";



export default function ReviewRequestSheet({ trigger, id }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reason, setReason] = useState("");
    const [isOpen2, setIsOpen2] = useState(false);
    const [date, setDate] = useState<string>("");
    const [loading, setLoading] = useState(true);


    const { data, isLoading } = useQuery({
        queryKey: ["get_single_case_by_id"],
        queryFn: async () => {
            return await getAdminCaseFilesById(id);
        },
        enabled: !!id,
    });

    // Fetch reassignment history only when sheet is open
    useEffect(() => {
        if (!isOpen2) return;
        const fetchHistory = async () => {
            try {
                const history = await getReassignmentHistory(id);
                setReason(history?.request_reason || "No reason provided");
                setDate(history?.created_at || "-");
            } catch (error) {
                console.error("Failed to fetch reassignment history:", error);
                setReason("Failed to load reason");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [id, isOpen2]);

    return (
        <Sheet open={isOpen2} onOpenChange={setIsOpen2}>
            <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
            <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
                <div className="space-y-10 mx-auto">
                    <div className="space-y-6 w-full">
                        <div>
                            <p className="font-bold text-xl">Re-assignment Status</p>
                            <div className="font-semibold text-sm">stay updated on the status of your submitted request</div>
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
                                    <p className="text-stone-600 text-sm">{data?.assigned_by.first_name} {data?.assigned_by.last_name} </p>
                                    <p className="font-bold text-xs">{data?.assigned_by.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid border-b-2 pb-3">
                            <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
                            <span className="text-app-primary font-bold text-sm">{data?.case_suit_number}</span>
                            <span className="text-app-primary font-bold text-sm">{data?.case_type_name}</span>
                        </div>
                        {data?.reassignment_status.toUpperCase() == "DENIED" ? (
                            <>
                                <p className="text-stone-600 text-sm font-bold mb-2">Reason for denial</p>
                                <div className="border-b-2 bg-zinc-300 pb-3">
                                    <p className="p-2 text-sm font-semibold">{reason}</p>
                                </div>
                            </>
                        ) :
                            <>
                                {data?.reassignment_status && <StatusBadge status={data.reassignment_status}>{data.reassignment_status}</StatusBadge>}
                            </>
                        }
                    </div>
                </div>
            </SheetContent>
        </Sheet >
    );
}


