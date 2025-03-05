import React, { useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  court_type?: string;
  court_division?: string;

}

interface Props {
  trigger: React.ReactNode;
  formValues: FormValues;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ConfirmInvite: React.FC<Props> = ({ trigger, formValues, isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleInvite = async () => {
    setLoading(true);
    setErrorMessages([]);

    try {
      const { data } = await axios.post("/api/invite-user", formValues, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("User invited successfully!");
      console.log("User invited successfully:", data);
      setIsOpen(false);
    } catch (error: any) {
      console.error("Error inviting user:", error);

      if (error.response?.data?.errors) {
        const errors = Object.entries(error.response.data.errors).map(
          ([field, message]) => `${field}: ${message}`
        );

        setErrorMessages(errors);
        toast.error("Validation failed. Please check the errors below.");
      } else {
        toast.error("Failed to send invite. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} trigger={trigger}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-1 pt-2">
          <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
            <Icons.infocircle />
          </div>
          <div className="text-center text-primary space-y-2">
            <p className="font-bold text-xl">Invite this User?</p>
            <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
              Invite <span className="font-extrabold">{formValues.first_name} {formValues.last_name} </span>
              at <span className="font-extrabold">{formValues.email}</span>? This action can’t be undone, but the invitation can be revoked later.
            </p>
            {/* {formValues.court_type && (
              <p className="text-sm text-center">Court: <span className="font-bold">{formValues.court_type}</span></p>
            )}
            {formValues.court_division && (
              <p className="text-sm text-center">Court Division: <span className="font-bold">{formValues.court_division}</span></p>
            )} */}
          </div>
        </div>

        {/* Validation Errors Display */}
        {errorMessages.length > 0 && (
          <div className="bg-red-100 p-3 rounded-md text-red-600 text-sm">
            <p className="font-bold">Validation Errors:</p>
            <ul className="list-disc pl-4">
              {errorMessages.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <AlertDialogFooter className="flex items-center sm:justify-center w-full">
          <Button
            className="text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
            onClick={handleInvite}
            disabled={loading}
          >
            {loading ? "SENDING..." : "CONFIRM INVITE"}
          </Button>

          <AlertDialogCancel
            className="font-extrabold text-red-500 text-xs uppercase"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>

        <p className="text-xs font-extrabold text-center">
          NB: An email invitation will be sent to this user to activate their account.
        </p>
      </div>
    </ConfirmationModal>
  );
};

export default ConfirmInvite;
