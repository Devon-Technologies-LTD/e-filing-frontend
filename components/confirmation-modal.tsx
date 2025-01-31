// components/confirmation-modal.tsx
"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

interface ConfirmationModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const ConfirmationModal = ({
  trigger,
  children,
}: ConfirmationModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
        asChild
      >
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white"
      >
        <AlertDialogHeader>{children}</AlertDialogHeader>
        
      </AlertDialogContent>
    </AlertDialog>
  );
};
