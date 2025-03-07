// components/confirmation-modal.tsx
"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contentClassName?: string;
}

export const ConfirmationModal = ({
  trigger,
  children,
  isOpen,
  setIsOpen,
  contentClassName,
}: ConfirmationModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && (
        <AlertDialogTrigger
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          asChild
        >
          {trigger}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cn("bg-white", contentClassName)}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only"> modal open</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>{children}</AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};
