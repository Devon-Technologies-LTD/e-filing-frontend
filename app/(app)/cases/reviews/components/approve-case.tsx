"use client";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import {
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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

export const ApproveCase = ({ record }: ConfirmationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const queryClient2 = useQueryClient();
  const router = useRouter();
  const changeStatusMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IChangeStatus }) =>
      changeCaseStatus(id, payload),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Case Successfullly Approved");
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["get_cases"] });
        queryClient2.invalidateQueries({ queryKey: ["get_single_case_by_id"] });
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

  return (
    <ConfirmationModal
      contentClassName="max-w-sm"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button size={"lg"} className="font-bold flex-end text-sm h-11">Approve Case</Button>
      }
    >
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-1 pt-2">
          <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
            <Icons.infocheck />
          </div>
          <div className="text-center text-primary space-y-2">
            <p className="font-bold text-xl capitalize">
              Approve this case file
            </p>
            <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
              This case will be approved and sent to the assigning magistrate
              for further actions
            </p>
          </div>
        </div>

        <AlertDialogFooter className="flex items-center sm:justify-center w-full">
          <Button
            className=" text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
            onClick={(e) => {
              e.stopPropagation();
              changeStatusMutation.mutate({
                id: record,
                payload: {
                  status: CaseStatus.Approved,
                },
              });
            }}
            disabled={changeStatusMutation.isPending}
          >
            {changeStatusMutation.isPending ? "Approving..." : "PROCEED"}
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
  );
};
