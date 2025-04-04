"use client"; // Ensure this is a client component

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { caseRequestHistory, changeCaseRequestStatus, getAdminCaseFilesById } from "@/lib/actions/case-file";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ErrorResponse } from "@/types/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { caseRequest } from "@/lib/actions/case-actions";
import { getInitials } from "@/constants";
// import { getInitials } from "@/constants";

interface CaseRequestStatusSheetProps {
    trigger: React.ReactNode;
    id: string;
}

export default function CaseRequestStatusSheet({ trigger, id }: CaseRequestStatusSheetProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();
    const [reason, setReason] = useState<string>("");
    const [isOpen2, setIsOpen2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<string>("");

    const { data, isLoading } = useQuery({
        queryKey: ["get_single_case_by_id", id], // Ensure proper caching
        queryFn: () => getAdminCaseFilesById(id),
        enabled: !!id,
    });

    // Fetch reassignment history only when sheet is open
    useEffect(() => {
        if (!isOpen2) return;
        const fetchHistory = async () => {
            try {
                console.log("Fetching reassignment history for case ID:", id);
                const history = await caseRequestHistory(id);
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

    const changeCaseStatus = async (status: string) => {
        setIsSubmitting(true);
        try {
            console.log(id, status);
            const data = await changeCaseRequestStatus(id, status);
            console.log(data);

            console.log(data);
            if (data) {
                toast.success(`Case Request ${status} successful`);
                queryClient.invalidateQueries({ queryKey: ["get_single_case_by_id"] });
                setIsOpen2(false);
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!data?.id) {
            toast.error("Error: Case data is not available.");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = { reason };
            console.log(formData);
            const response = await caseRequest(formData, data.id);
            console.log(response);
            if (response.success) {
                toast.success("Case Request successful");
                queryClient.invalidateQueries({ queryKey: ["get_single_case_by_id"] });
                setIsOpen2(false);
                setReason(""); // Reset reason after successful submission
            } else {
                toast.error(`${response.data.message}: ${response.data.error}`);
            }
        } catch (err: unknown) {
            const error = err as ErrorResponse;
            toast.error(error.message);
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Sheet open={isOpen2} onOpenChange={setIsOpen2}>
            <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
            <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
                <div className="space-y-8 mx-auto">
                    <div>
                        <p className="font-bold text-xl">Submitted Case Request</p>
                        <p className="font-semibold text-sm">
                            Requested on -
                        </p>
                    </div>
                    <div className="flex justify-between bg-neutral-300 px-4 py-6 border-b-2 border-neutral-400">
                        <div>
                            <p className="text-stone-600 text-sm">Requested From</p>
                            <p className="text-app-primary font-extrabold">{data?.division_name ?? "N/A"}</p>
                        </div>
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarFallback className="text-app-primary bg-[#FDF5EC] border-app-primary border-2">
                                    {getInitials(data?.claimant?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-stone-600 text-sm">{data?.claimant?.name ?? "N/A"}</p>
                                <p className="font-bold text-xs">{data?.claimant?.email_address ?? "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b-2 pb-3">
                        <p className="text-stone-600 text-sm font-bold mb-2">Request for Resignment Case Suit Number</p>
                        <p className="text-app-primary font-bold text-sm">{data?.case_suit_number ?? "N/A"}</p>
                        <p className="text-app-primary font-bold text-sm">{data?.case_type_name ?? "N/A"}</p>
                        <div className="pt-3 font-semibold text-sm text-right text-app-primary">
                            View Case Details
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="space-y-2">
                            <p className="font-bold text-base">Reason for Case Request</p>
                            <div className="border-b-2 bg-zinc-300 pb-3">
                                {loading ? (
                                    <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
                                ) : (
                                    <p className="p-2 text-sm font-semibold">{reason}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button className="w-full" onClick={() => changeCaseStatus("Approved")} disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                APPROVE REQUEST
                            </Button>
                            <Button variant="outline" onClick={() => changeCaseStatus("Denied")} className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                DENY REQUEST
                            </Button>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
