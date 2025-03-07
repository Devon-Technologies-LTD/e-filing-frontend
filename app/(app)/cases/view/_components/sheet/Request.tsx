

import React, { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { Loader2 } from "lucide-react";
import { ErrorResponse } from "@/types/auth";
import { requestReAssigment } from "@/lib/actions/case-actions";

interface ScheduleSheetProps {
    trigger: React.ReactNode;
    id: string;
}


export default function RequestSheet({ trigger, id }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reason, setReason] = useState("");


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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = {
                casefile_id: data.id,
                reason: reason,
            };
            console.log(formData);
            const response = await requestReAssigment(formData, data.id);
            console.log(response);
            if (response.success) {
                toast.success(response.message);
            } else {
                const errorMessage = response.data.message;
                const detailedError = response.data.error;
                toast.error(`${errorMessage}:  ${detailedError}`);
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
        <Sheet>
            <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
            <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
                <div className="space-y-10 mx-auto">
                    <div className="space-y-6 w-full">
                        <div>
                            <p className="font-bold text-xl">Re-assignment Request</p>
                            <div className="font-semibold text-sm">
                                This case will be submitted to the assigning magisterate for review. You will ge notified on the decision
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

                        <div className="grid border-b-2 pb-3">
                            <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
                            <span className="text-app-primary font-bold text-sm">{data?.case_suit_number}</span>
                            <span className="text-app-primary font-bold text-sm">{data?.case_type_name}</span>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <div className="space-y-2">
                                <p className="font-bold text-base">Reason for Re-assignment *</p>
                                <Textarea placeholder="Type here." required name="reason" className="bg-neutral-100 border-b-2 h-52 border-gray-300" onChange={(e) => setReason(e.target.value)} />
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                SUBMIT REQUEST
                            </Button>
                        </form>
                    </div>
                </div>
            </SheetContent>
        </Sheet >
    );
}


