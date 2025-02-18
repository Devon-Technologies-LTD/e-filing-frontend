import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteCase } from "@/lib/actions/case-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface ActionCellProps {
  row: any;
}

const DraftTableActionCell: React.FC<ActionCellProps> = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCase(id),
    onSuccess: (data) => {
      console.log("first", data);
      if (data?.success) {
        toast.success(data.message);
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["get_case_drafts"] });
      } else {
        toast.error(data.message);
        setIsOpen(false);
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleDelete = () => {
    console.log("first", row.original);
    deleteMutation.mutate(row.original.id);
  };

  return (
    <div>
      <ConfirmationModal
        trigger={<Icons.bin />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-1 pt-2">
            <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
              <Icons.infocircle />
            </div>
            <div className="text-center text-primary space-y-2">
              <p className="font-bold text-xl">Delete this Draft? </p>
              <p className="text-black font-semibold text-sm text-center mx-auto">
                This action will permanently remove the draft, and any unsaved
                progress will be lost. You cannot recover the draft after
                deletion.{" "}
              </p>
            </div>
          </div>
          <AlertDialogFooter className="flex items-center sm:justify-center w-full">
            <Button
              type="button"
              className="font-medium text-sm bg-red-600 h-12"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "loading..." : " DELETE THIS DRAFT"}
            </Button>

            <AlertDialogCancel
              disabled={deleteMutation.isPending}
              className="font-extrabold text-red-800 text-xs uppercase"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default DraftTableActionCell;
