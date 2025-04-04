"use client";
import { useState } from "react";
import { LoginPasswordField } from "@/components/passwordField";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFormState } from "react-dom";
import { resetPassword } from "@/lib/actions/user-management";
import { useAppSelector } from "@/hooks/redux";

export default function AccountSecurity() {
  // ✅ Ensure the initial state uses `false` instead of `null` for `success`
  const [state, dispatch] = useFormState(resetPassword, { success: false, message: "", errors: {} });

  const [loading, setLoading] = useState(false);
  const { data: user } = useAppSelector((state) => state.profile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    await dispatch(formData); // ✅ Dispatch correctly
    setLoading(false);
  };

  return (
    <div className="mx-auto p-6">
      <h2 className="text-lg font-bold mb-6">Account and Security</h2>

      <div className="space-y-12">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-neutral-800">Change Password</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="hidden" name="email" value={user?.email} />
                <LoginPasswordField showStrength={false} label="CURRENT PASSWORD" name="old_password" placeholder="Password" />
                <LoginPasswordField showStrength={true} label="NEW PASSWORD" name="new_password" placeholder="Password" />
              </div>
            </div>
            {state.success === false && (
              <p className="text-red-500 text-sm">{state.message}</p>
            )}
            <SubmitButton
              value="UPDATE"
              loading={loading}
              pendingValue="Processing..."
              className="bg-app-primary w-28 hover:bg-app-secondary/90 text-white h-11 rounded mt-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}