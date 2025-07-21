import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UploadPdf from "@/components/uploadPDF";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { toast } from "sonner";
import { deliverJudgement } from "@/lib/actions/case-actions";
import { ErrorResponse } from "@/types/auth";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DeliverJugdement {
  trigger: React.ReactNode;
  id: string;
}

export default function DeliverJugdementSheet({ trigger, id }: DeliverJugdement) {
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null); // State for file
  const [reason, setReason] = useState("");
  const [isOpen2, setIsOpen2] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["get_single_case_by_id"],
    queryFn: async () => {
      return await getAdminCaseFilesById(id);
    },
    enabled: !!id,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      toast.error("Please upload a PDF file before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("casefile_id", data.id);
      formData.append("file", file); // Append file to FormData
      formData.append("reason", reason);
      formData.append("status", "JUDGEMENT DELIVERED");

      const response = await deliverJudgement(formData, data.id);

      if (response.success) {
        toast.success("Judgement Delivered successful");
        queryClient.invalidateQueries({ queryKey: ["get_single_case_by_id"] });

        setIsOpen2(false);
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
    <Sheet open={isOpen2} onOpenChange={setIsOpen2}>
      <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <ScrollArea className="h-full w-full">
          <div className="space-y-8 mx-auto">
            <div className="space-y-6 w-full">
              <div>
                <p className="font-bold text-xl">Deliver Judgment</p>
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
                <p className="font-bold text-base">Upload Files (PDF) *</p>
                <UploadPdf onFileSelect={setFile} /> {/* Pass file selection function */}
              </div>

              <Label htmlFor="reason" className=" flex justify-between items-center text-base font-bold ">
                Give reasons here *
              </Label>
              <Textarea
                id="reason"
                name="reason"
                placeholder="Type here"
                className="placeholder:text-neutral-400  pb-3 text-base font-semibold min-h-[200px] border-0 outline-none shadow-none focus-visible:ring-0 border-b-2 border-b-app-tertiary bg-neutral-100 resize-none"
                onChange={({ target }) => {
                  setReason(target.value);
                }}
              />

              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "SUBMIT"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
