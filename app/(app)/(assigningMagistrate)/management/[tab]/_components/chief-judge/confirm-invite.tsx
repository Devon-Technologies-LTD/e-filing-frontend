import React, { useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "./invite-user";

interface props {
  trigger: React.ReactNode;
  formValues: z.infer<typeof formSchema>;
}
function ConfirmInvite({ trigger, formValues }: props) {
  const handleDelete = () => {};
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} trigger={trigger}>
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-1 pt-2">
          <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
            <Icons.infocircle />
          </div>
          <div className="text-center text-primary space-y-2">
            <p className="font-bold text-xl">Invite this User?</p>
            <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
              Invite{" "}
              <span className="font-extrabold">
                {formValues.firstName} {formValues.lastName}
              </span>{" "}
              at <span className="font-extrabold"> {formValues.email}</span>?
              This action can’t be undone, but the invitation can be revoked
              later
            </p>
          </div>
        </div>

        <AlertDialogFooter className="flex items-center sm:justify-center w-full">
          <AlertDialogAction
            className=" text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
            onClick={handleDelete}
          >
            CONFIRM INVITE
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

        <p className="text-xs font-extrabold text-center">
          NB: An email invitation will be sent to this user to activate their
          account
        </p>
      </div>
    </ConfirmationModal>
  );
}

export default ConfirmInvite;
