"use client";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import {
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CaseStatus } from "@/constants";
import { IChangeStatus } from "@/lib/_services/case-file";
import { changeCaseStatus } from "@/lib/actions/case-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ConfirmationModalProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  isOpen?: boolean;
  record: string;
  setIsOpen?: (open: boolean) => void;
}
const ReasonsModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (reason: string) => void;
}) => {
  const [reason, setReason] = useState("");
  const [isReasonValid, setIsReasonValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim() === "") {
      setIsReasonValid(false);
      return;
    }
    onSubmit(reason);
  };

  return (
    <ConfirmationModal
      contentClassName="max-w-lg"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <section>
            <p className="font-bold text-xl">Reason for Denial</p>
            <p className="text-sm font-semibold">
              Please provide a clear and concise reason for denying this case
              file. Please provide clear details of outstanding price to ensure
              proper understanding
            </p>
          </section>
          <section className="space-y-1">
            <Label
              htmlFor="denial-reason"
              className=" flex justify-between items-center text-base font-bold">
              Give reasons here
              {!isReasonValid && (
                <p className="text-red-600 text-sm">Reason is required. *</p>
              )}
            </Label>
            <Textarea
              id="denial-reason"
              value={reason}
              placeholder="Type here"
              className="placeholder:text-neutral-400 text-base font-semibold min-h-[200px] border-0 outline-none shadow-none focus-visible:ring-0 border-b-2 border-b-app-tertiary bg-neutral-100 resize-none"
              onChange={({ target }) => {
                setReason(target.value);
                setIsReasonValid(true);
              }}
            />
          </section>
        </div>
        <AlertDialogFooter className="flex items-center sm:justify-start w-full">
          <Button
            type="submit"
            size={"medium"}
            className="text-sm bg-primary font-bold  disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
          >
            SUBMIT
          </Button>

          <AlertDialogCancel
            className="font-extrabold text-red-800 text-xs uppercase"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            CANCEL
          </AlertDialogCancel>
        </AlertDialogFooter>
      </form>
    </ConfirmationModal>
  );
};

export const DenyCase = ({ record }: ConfirmationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReasonsModalOpen, setIsReasonsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const changeStatusMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IChangeStatus }) =>
      changeCaseStatus(id, payload),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Case Successfully Denied");
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["get_single_case_by_id"] });
        router.back();
      } else {
        toast.error(
          `${data?.message}: ${data.errors ? data.errors.error : ""}` ||
            "An error occurred while saving the form."
        );
        setIsOpen(false);
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleProceedClick = () => {
    setIsReasonsModalOpen(true);
  };

  const handleReasonSubmit = (reason: string) => {
    setIsReasonsModalOpen(false);
    changeStatusMutation.mutate({
      id: record,
      payload: { status: CaseStatus.Denied, reason },
    });
  };

  return (
    <>
      <ConfirmationModal
        contentClassName="max-w-sm"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        trigger={
          <Button
            size={"lg"}
            variant={"outline"}
            className="font-bold border-2 flex-end text-sm h-11"
          >
            Deny Case{" "}
          </Button>
        }
      >
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-1 pt-2">
            <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
              <Icons.infoMultiply />
            </div>
            <div className="text-center text-primary space-y-2">
              <p className="font-bold text-xl capitalize">
                Deny this case file
              </p>
              <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
                This case will be denied and sent to the counsel/claimant of
                this case for further actions
              </p>
            </div>
          </div>

          <AlertDialogFooter className="flex items-center sm:justify-center w-full">
            <Button
              className="text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
              onClick={handleProceedClick}
              disabled={changeStatusMutation.isPending}
            >
              PROCEED
            </Button>

            <AlertDialogCancel
              className="font-extrabold text-red-800 text-xs uppercase"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              CANCEL
            </AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </ConfirmationModal>

      <ReasonsModal
        isOpen={isReasonsModalOpen}
        setIsOpen={setIsReasonsModalOpen}
        onSubmit={handleReasonSubmit}
      />
    </>
  );
};
