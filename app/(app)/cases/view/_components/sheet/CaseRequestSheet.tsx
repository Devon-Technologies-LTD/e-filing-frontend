


import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ErrorResponse } from "@/types/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


interface CaseRequestSheetProps {
    trigger: React.ReactNode;
    id: string;
}

export default function CaseRequestSheet({ trigger, id }: CaseRequestSheetProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reason, setReason] = useState("");
  const [isOpen2, setIsOpen2] = useState(false);
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
        // setIsSubmitting(true);
        try {
            // const formData = {
            //     casefile_id: data.id,
            //     reason: reason,
            // };
            // console.log(formData);
            // const response = await requestReAssigment(formData, data.id);
            setIsOpen2(false);
            // console.log(response);
            // if (response.success) {
            //     toast.success(response.message);
            // } else {
            //     const errorMessage = response.data.message;
            //     const detailedError = response.data.error;
            //     toast.error(`${errorMessage}:  ${detailedError}`);
            // }

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

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="space-y-2">
                            <p className="font-bold text-base">Reason for Request</p>
                            <Textarea placeholder="Type here." required name="reason" className="bg-neutral-100 border-b-2 h-52 border-gray-300" onChange={(e) => setReason(e.target.value)} />
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
