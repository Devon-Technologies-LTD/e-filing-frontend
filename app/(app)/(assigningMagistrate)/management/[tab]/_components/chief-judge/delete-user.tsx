import React, { useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import { Input } from "@/components/ui/input";

interface props {
  trigger: React.ReactNode;
}
function DeleteUser({ trigger }: props) {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonDisabled(value.toLowerCase() !== "delete");
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
            <Icons.infocircle />
          </div>
          <div className="text-center text-primary space-y-2">
            <p className="font-bold text-xl">Delete User?</p>
            <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
              Are you sure you want to delete this user. This action is
              irreversible and will permanently remove their access to the
              platform. To confirm, type DELETE in the field below
            </p>
          </div>
        </div>

        <Input
          type="text"
          variant="ghost"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          data-form-type="other"
          placeholder={`e.g type "DELETE"`}
          className="pl-2 h-12 text-sm max-w-sm mx-auto opacity-60"
        />

        <AlertDialogFooter className="flex items-center sm:justify-center w-full">
          <AlertDialogAction
            className="font-medium text-sm bg-red-600 h-12 disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
            onClick={handleDelete}
            disabled={isButtonDisabled}
          >
            DELETE USER
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

export default DeleteUser;
