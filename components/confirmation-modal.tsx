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

interface ConfirmationModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const ConfirmationModal = ({
  trigger,
  children,
  isOpen,
  setIsOpen,
}: ConfirmationModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
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
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">
            Are you absolutely sure you want to save as draft?
          </AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
