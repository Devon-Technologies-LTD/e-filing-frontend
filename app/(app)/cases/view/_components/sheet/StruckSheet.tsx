

import React, { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import UploadPdf from "@/components/uploadPDF";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminCaseFilesById } from "@/lib/actions/case-file";
import { ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deliverJudgement } from "@/lib/actions/case-actions";
import { Label } from "@/components/ui/label";



interface StruckSheetProps {
  trigger: React.ReactNode;
  id: string,
}



export default function StruckSheet({ trigger, id }: StruckSheetProps) {
  const queryClient = useQueryClient();
  const [isOpen2, setIsOpen2] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null); // State for file
  const [reason, setReason] = useState("");

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
      const formData = new FormData();
      formData.append("casefile_id", data.id);
      formData.append("file", file);
      formData.append("reason", reason);
      formData.append("status", "STRUCK OUT");
      console.log("Submitting FormData:", formData);
      const response = await deliverJudgement(formData, data.id);
      console.log(response);
      if (response.success) {
        toast.success("casefile struck out successful");
        queryClient.invalidateQueries({ queryKey: ["get_single_case_by_id"] });
        setIsOpen2(false);
      } else {
        const errorMessage = response.data.message;
        const detailedError = response.data.error;
        toast.error(`${errorMessage}:  ${detailedError}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Sheet open={isOpen2} onOpenChange={setIsOpen2}>
      <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <div className="space-y-8 mx-auto">
          <div className="space-y-6 w-full">
            <form onSubmit={handleSubmit}>
              <div>
                <p className="font-bold text-xl">Strike Out Case</p>
                <div className="font-semibold text-sm">
                  This case will be marked as Strike out. All parties will be notified accordingly. No further actions can be taken unless refiled
                </div>
              </div>
              <div className="grid border-b-2 pb-3">
                <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
                <span className="text-app-primary font-bold text-sm">{data?.case_suit_number}</span>
                <span className="text-app-primary font-bold text-sm">{data?.case_type_name}</span>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-base">Upload Files (PDF)</p>
                <UploadPdf onFileSelect={setFile} />
              </div>


              <Label htmlFor="reason" className=" flex justify-between items-center text-base font-bold ">
                Give reasons here
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null} CONFIRM STRIKE OUT
              </Button>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


