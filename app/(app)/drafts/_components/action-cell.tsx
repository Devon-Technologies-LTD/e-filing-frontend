import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";
import React from "react";

interface ActionCellProps {
  row: any; // You can replace 'any' with a more specific type if needed
}

const DraftTableActionCell: React.FC<ActionCellProps> = ({ row }) => {
  const handleDelete = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div>
      <ConfirmationModal trigger={<Icons.bin />}>
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
            <AlertDialogAction className="font-medium text-sm bg-red-600 h-12" onClick={() => {}}>
              DELETE THIS DRAFT
            </AlertDialogAction>

            <AlertDialogCancel
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
