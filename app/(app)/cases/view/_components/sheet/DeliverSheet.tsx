

import React, { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UploadPdf from "@/components/uploadPDF";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";

import { toast } from "sonner";


interface DeliverJugdement {
  trigger: React.ReactNode;
  id: string,
}



export default function DeliverJugdementSheet({ trigger, id }: DeliverJugdement) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["get_single_case_by_id"],
    queryFn: async () => {
      return await getAdminCaseFilesById(id);
    },
    enabled: !!id,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      const formData = {
        casefile_id: data.id,
      };
      console.log(formData);

      const response = await fetch("/api/schedule-case", { method: "POST", body: JSON.stringify(formData) });
      if (response.ok) toast.success("Hearing scheduled successfully!");
      else toast.error("Failed to schedule hearing. Please try again.");
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Sheet>
      <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <div className="space-y-8 mx-auto">
          <div className="space-y-6 w-full">

            <div>
              <p className="font-bold text-xl">Delivery Judgment</p>
              <div className="font-semibold text-sm">
                Upload your judgment file to finalize the case. Parties involved will be notified upon submission. Ensure all details are accurate, as this action cannot be undone.
              </div>
            </div>
            <div className="grid border-b-2 pb-3">
              <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
              <span className="text-app-primary font-bold text-sm">{data?.case_suit_number}</span>
              <span className="text-app-primary font-bold text-sm">{data?.case_type_name}</span>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-base">Upload Files (PDF)</p>
              <UploadPdf />
            </div>
            <Button>SUBMIT</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


