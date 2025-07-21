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

interface ConfirmCaseAssignmentProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const ConfirmCaseAssignment = ({
  trigger,
  children,
  isOpen,
  setIsOpen,
}: ConfirmCaseAssignmentProps) => {
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
        className="bg-white"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">
            Are you absolutely sure you want to save as draft?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>{children}</AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};
