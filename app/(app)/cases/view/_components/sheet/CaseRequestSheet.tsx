"use client"; // Ensure this is a client component

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ErrorResponse } from "@/types/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { caseRequest } from "@/lib/actions/case-actions";
import { getInitials } from "@/constants";

interface CaseRequestSheetProps {
    trigger: React.ReactNode;
    id: string;
}

export default function CaseRequestSheet({ trigger, id }: CaseRequestSheetProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();
    const [reason, setReason] = useState("");
    const [isOpen2, setIsOpen2] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["get_single_case_by_id", id], // Ensure proper caching
        queryFn: () => getAdminCaseFilesById(id),
        enabled: !!id,
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!data?.id) {
            toast.error("Error: Case data is not available.");
            return;
        }
        setIsSubmitting(true);
        try {
            const formData = { reason };
            const response = await caseRequest(formData, data.id);
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
                        <p className="font-bold text-xl">Case Request</p>
                        <p className="font-semibold text-sm">
                            This case will be submitted to the assigning magistrate for review. You will be notified of the decision.
                        </p>
                    </div>

                    <div className="flex justify-between bg-neutral-300 px-4 py-6 border-b-2 border-neutral-400">
                        <div>
                            <p className="text-stone-600 text-sm">Case Assigning Magistrate</p>
                            <p className="text-app-primary font-extrabold">{data?.division_name ?? "N/A"}</p>
                        </div>
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarFallback className="text-app-primary bg-[#FDF5EC] border-app-primary border-2">
                                    {getInitials(data?.claimant?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-stone-600 text-sm">{data?.assigned_by?.first_name ?? "N/A"} {data?.assigned_by?.last_name ?? "N/A"}</p>
                                <p className="font-bold text-xs">{data?.assigned_by?.email ?? "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b-2 pb-3">
                        <p className="text-stone-600 text-sm font-bold mb-2">Request for Re-assignment Case Suit Number</p>
                        <p className="text-app-primary font-bold text-sm">{data?.case_suit_number ?? "N/A"}</p>
                        <p className="text-app-primary font-bold text-sm">{data?.case_type_name ?? "N/A"}</p>
                        {data?.status && <StatusBadge status={data.status}>{data.status}</StatusBadge>}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="space-y-2">
                            <p className="font-bold text-base">Reason for Request</p>
                            <Textarea
                                placeholder="Type here."
                                required
                                name="reason"
                                className="bg-neutral-100 border-b-2 h-52 border-gray-300"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                            SUBMIT REQUEST
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
