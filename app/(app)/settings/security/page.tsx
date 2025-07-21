"use client";
import { useState } from "react";
import { LoginPasswordField } from "@/components/passwordField";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFormState } from "react-dom";
import { resetPassword } from "@/lib/actions/user-management";
import { useAppSelector } from "@/hooks/redux";
import { CLIENT_ERROR_STATUS, SUCCESS_STATUS } from "@/lib/_constants";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { toast } from "sonner";


export default function AccountSecurity() {
  const [state, dispatch] = useFormState(resetPassword, undefined);
  const { data: user } = useAppSelector((state) => state.profile);
  useEffectAfterMount(() => {
    if (state && CLIENT_ERROR_STATUS.includes(state?.status)) {
      toast.error(state?.message, {
        description: typeof state?.errors === "string"
          ? state.errors
          : state?.errors
            ? Object.values(state.errors).flat().join(", ")
            : "An Error Occured",
      });
    }
    if (state && state?.success && SUCCESS_STATUS.includes(state?.status)) {
      toast.success(state?.message);
    }
  }, [state]);

  return (
    <div className="mx-auto p-6">
      <h2 className="text-lg font-bold mb-6">Account and Security</h2>

      <div className="space-y-12">
        <form action={dispatch} autoComplete="off">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-800">Change Password</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="hidden" name="email" value={user?.email} />
                <LoginPasswordField showStrength={false} label="CURRENT PASSWORD" name="old_password" placeholder="Password" />
                <LoginPasswordField showStrength={true} label="NEW PASSWORD" name="new_password" placeholder="Password" />
              </div>
            </div>
            {state?.success === false && (
              <p className="text-red-500 text-sm">{state?.message}</p>
            )}
            <SubmitButton
              value="UPDATE"
              pendingValue="Processing..."
              className="bg-app-primary w-28 hover:bg-app-secondary/90 text-white h-11 rounded mt-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}