import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { changeReassignmentStatus, getAdminCaseFilesById, getReassignmentHistory } from "@/lib/actions/case-file";
import { Loader2 } from "lucide-react";
import { getInitials } from "@/constants";
import { format } from "date-fns";
import { toast } from "sonner";
import { isValid } from "date-fns";

interface SubmittedRequestSheetProps {
    trigger: React.ReactNode;
    id: string;
}

export default function SubmittedRequestSheet({ trigger, id }: SubmittedRequestSheetProps) {
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reason, setReason] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [isOpen2, setIsOpen2] = useState(false);

    // Fetch case details
    const { data, isLoading } = useQuery({
        queryKey: ["get_single_case_by_id", id],
        queryFn: async () => getAdminCaseFilesById(id),
        enabled: !!id,
    });

    // Fetch reassignment history only when sheet is open
    useEffect(() => {
        if (!isOpen2) return;
        const fetchHistory = async () => {
            try {
                console.log("Fetching reassignment history for case ID:", id);
                const history = await getReassignmentHistory(id);
                console.log(history);
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
            const data = await changeReassignmentStatus(id, status);
            console.log(data);
            if (data) {
                toast.success(`Case Reassignment ${status} successful`);
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


    return (
        <Sheet open={isOpen2} onOpenChange={setIsOpen2}>
            <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
            <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
                <div className="space-y-10 mx-auto">
                    <div className="space-y-6 w-full">
                        <div>
                            <p className="font-bold text-xl">Submitted Re-assignment Request</p>
                            <div className="font-semibold text-xs">
                                {isValid(new Date(date)) ? format(new Date(date), "EEE, MMM dd, yyyy") : "-"}
                            </div>
                        </div>
                        <div className="flex justify-between bg-neutral-300 px-4 py-6 border-b-2 border-neutral-400">
                            <div className="grid">
                                <p className="text-stone-600 text-sm">Requested From</p>
                                <p className="text-app-primary font-extrabold">{data?.division_name}</p>
                            </div>
                            <div className="flex gap-2">
                                <Avatar>
                                    <AvatarFallback className="text-app-primary bg-[#FDF5EC] border-app-primary border-2">
                                        {getInitials(data?.assigned_to_data?.first_name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-stone-600 text-sm">{data?.assigned_to_data?.name}</p>
                                    <p className="font-bold">{data?.assigned_to_data?.email_address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid border-b-2 pb-3">
                            <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
                            <span className="text-app-primary font-bold text-sm">{data?.case_suit_number}</span>
                            <span className="text-app-primary font-bold text-sm">{data?.case_type_name}</span>
                            <div className="pt-3 font-semibold text-sm text-right text-app-primary">
                                View Case Details
                            </div>
                        </div>

                        <p className="text-stone-600 text-sm font-bold mb-2">Reason for Re-assignment Request</p>
                        <div className="border-b-2 bg-zinc-300 pb-3">
                            {loading ? (
                                <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
                            ) : (
                                <p className="p-2 text-sm font-semibold">{reason}</p>
                            )}
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
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
