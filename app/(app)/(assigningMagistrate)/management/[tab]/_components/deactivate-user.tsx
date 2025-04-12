import React, { useState } from "react";
import axios from "axios";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import { Input } from "@/components/ui/input";
import { IUsersColumn } from "./table-column";
import { USER_STATUS } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function DeactivateUser({
  row,
  trigger,
}: {
  row: IUsersColumn;
  trigger: React.ReactNode;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonDisabled(value.toLowerCase() !== "deactivate");
  };

  const queryClient = useQueryClient();


  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessages([]);

    try {

      const response = await axios.post("/api/user-action", {
        userId: row.id,
        action: row.status === "ACTIVE" ? "deactivate" : "activate",
      });

      toast.success(`User ${row.status === "ACTIVE" ? "deactivated" : "activated"} successfully!`);
      // ✅ Refresh the table after success
      queryClient.invalidateQueries({ queryKey: ["userManagement"] });

      setIsOpen(false);
    } catch (error: any) {
      console.error("Error updating user status:", error);

      if (error.response?.data?.errors) {
        const errors = Object.entries(error.response.data.errors).map(
          ([field, message]) => `${field}: ${message}`
        );
        setErrorMessages(errors);
        toast.error("Validation failed. Please check the errors below.");
      } else {
        toast.error("Failed to update user status. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} trigger={trigger}>
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-1 pt-2">
          <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
            {row.status === "ACTIVE" ? <Icons.infocircle /> : <Icons.infocheck />}
          </div>
          <div className="text-center text-primary space-y-2">
            <p className="font-bold text-xl">
              {row.status === "ACTIVE" ? "Deactivate" : "Activate"} User
            </p>
            <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
              {row.status === "ACTIVE"
                ? "This will temporarily revoke their access to the platform. You can reactivate their account later if needed. To confirm, type DEACTIVATE in the field below."
                : "Are you sure you want to activate this account? This will restore their access to the platform immediately."}
            </p>
          </div>
        </div>

        {row.status === "ACTIVE" && (
          <Input
            type="text"
            variant="ghost"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder='e.g type "DEACTIVATE"'
            className="pl-2 h-12 text-sm max-w-sm mx-auto opacity-60"
          />
        )}

        {errorMessages.length > 0 && (
          <div className="text-red-500 text-sm text-center">
            {errorMessages.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <AlertDialogFooter className="flex items-center sm:justify-center w-full">
          <Button
            className="text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500"
            onClick={handleDelete}
            disabled={loading || (row.status === "ACTIVE" && isButtonDisabled)}
          >
            {loading ? "Processing..." : row.status === "ACTIVE" ? "Deactivate" : "Activate"}
          </Button>

          <AlertDialogCancel className="font-extrabold text-red-500 text-xs uppercase"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </div>
    </ConfirmationModal>
  );
}
