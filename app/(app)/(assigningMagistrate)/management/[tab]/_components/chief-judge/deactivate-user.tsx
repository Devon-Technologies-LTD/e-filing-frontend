import React, { useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import { Input } from "@/components/ui/input";
import { IUsersColumn } from "./table-column";
import { USER_STATUS } from "@/types/auth";

export default function DeactivateUser({
  row,
  trigger,
}: {
  row: IUsersColumn;
  trigger: React.ReactNode;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonDisabled(value.toLowerCase() !== "deactivate");
  };

  const handleDelete = () => {
    // Your delete logic here
    console.log("Deleting user...");
  };

  return (
    <ConfirmationModal trigger={trigger}>
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-1 pt-2">
          <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
            {row.status === USER_STATUS.ACTIVE ? (
              <Icons.infocircle />
            ) : (
              <Icons.infocheck />
            )}
          </div>
          <div className="text-center text-primary space-y-2">
            <p className="font-bold text-xl">
              {" "}
              {row.status === USER_STATUS.ACTIVE ? "De-activate " : "Activate "}
              User
            </p>
            <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
              {row.status === USER_STATUS.ACTIVE
                ? "This will temporarily revoke their access to the platform. You can reactivate their account later if needed.To confirm, type DEACTIVATE in the field below. "
                : "Are you sure you want to activate this account? This will restore their access to the platform immediately."}
            </p>
          </div>
        </div>

        {row.status === USER_STATUS.ACTIVE && (
          <Input
            type="text"
            variant="ghost"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
            data-form-type="other"
            placeholder={`e.g type "DEACTIVATE"`}
            className="pl-2 h-12 text-sm max-w-sm mx-auto opacity-60"
          />
        )}

        <AlertDialogFooter className="flex items-center sm:justify-center w-full">
          <AlertDialogAction
            className="font-medium text-sm h-11 disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
            onClick={handleDelete}
            disabled={
              row.status === USER_STATUS.ACTIVE ? isButtonDisabled : false
            }
          >
            {row.status === USER_STATUS.ACTIVE ? "CONFIRM" : "ACTIVATE ACCOUNT"}
          </AlertDialogAction>

          <AlertDialogCancel
            className="font-extrabold text-red-500 text-xs uppercase"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </div>
    </ConfirmationModal>
  );
}
