"use client";

import { useContext, useEffect, useState } from "react";
import { toast } from "sonner"
import InputField from "@/components/ui/InputField";
import { useFormState } from "react-dom";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { SignupAction } from "@/lib/actions/signup";
import { CLIENT_ERROR_STATUS } from "@/lib/_constants";
import { LoginPasswordField } from "@/components/passwordField";
import DragDropUploaderNIN from "./DragDropUploaderNIN";
import { isFieldErrorObject } from "@/types/auth";
import { OnboardingContext } from '@/context/OnboardingContext';
import { Checkbox } from "@/components/ui/checkbox";

const LawyerComponent = () => {

  const [state, dispatch] = useFormState(SignupAction, undefined);
  const [email, setEmail] = useState("");
  const { loading, setLoading, active, setActive } = useContext(OnboardingContext);
  const errors = state?.errors && isFieldErrorObject(state.errors) ? state.errors : {};
  useEffectAfterMount(() => {
    if (state && CLIENT_ERROR_STATUS.includes(state?.status)) {
      toast.error(state?.message, {
        description: typeof state?.errors === "string"
          ? state.errors
          : state?.errors
            ? Object.values(state.errors).flat().join(", ")
            : undefined,
      });
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    dispatch(formData);
  };

  useEffect(() => {
    if (state) {
      setLoading(false);
    }
  }, [state]);
  return (
    // <div className="flex flex-col md:flex-row w-full md:space-y-0 md:space-x-6">
    <div
      className="w-full flex-1 space-y-6 overflow-y-auto scroll-smooth scrollbar-hide px-4 md:px-0"
      style={{ height: "calc(100vh - 200px)", scrollBehavior: "smooth" }}
    >

      <form id="lawyer-form" onSubmit={handleSubmit} className="md:w-3/4 space-y-10" autoComplete="off">
        <input type="hidden" name="role" value="LAWYER" />
        <input type="hidden" name="gender" value="male" />
        <div
          className="w-full flex-1 space-y-6 overflow-y-auto scrollbar-hide px-4 md:px-0"
          style={{ height: "calc(100vh - 300px)" }}>
          <div>
            <p className="font-bold text-sm text-neutral-500">
              Fields marked with an asterisk (*) are required.
            </p>
            <br />
            <InputField
              id="first"
              type="text"
              label="First Name"
              name="first_name"
              placeholder="John"
              required
              error={errors.first_name?.[0]}
            />
          </div>
          <div>
            <InputField
              id="lastName"
              type="text"
              label="Last Name"
              name="last_name"
              placeholder="Doe"
              required
              error={errors.last_name?.[0]}
            />
          </div>
          <div>
            <InputField
              id="email"
              type="email"
              label="EMAIL ADDRESS"
              name="email"
              placeholder="name@gmail.com"
              required
              error={errors.email?.[0]}
              value={email}
              onChange={(e) => setEmail(e.target.value.trimStart().replace(/\s+/g, ""))
              }
            />
          </div>
          <div className="space-y-6">
            <div>
              <InputField
                id="nin"
                type="text"
                label="National Identity Number (NIN)"
                name="nin"
                placeholder="09876543211"
                required
                error={errors.nin?.[0]}
              />
              <p className="text-sm font-bold mt-4 text-neutral-600">
                UPLOAD NATIONAL IDENTITY CARD <span className="text-red-500  ml-1">*</span>
              </p>
            </div>
            <DragDropUploaderNIN />
          </div>
          <div className="space-y-6">
            <InputField
              id="court"
              type="text"
              label="SUPREME COURT NUMBER (SCN)"
              name="scn"
              placeholder="SCN123456"
              required
              error={errors.scn?.[0]}
            />
            <InputField
              id="phone"
              type="text"
              label="PHONE NUMBER"
              name="phone_number"
              placeholder="07030338024"
              required
              error={errors.phone_number?.[0]}
            />
            <LoginPasswordField error={errors.password?.[0]} showStrength={true} label="PASSWORD" name="password" placeholder="********" />
            <LoginPasswordField label="CONFIRM PASSWORD" name="confirm_password" placeholder="********" />
            <div className="items-top flex space-x-2">
              <Checkbox
                id="terms1"
                checked={active}
                name = "is_disclaimer"
                onCheckedChange={(checked) => setActive(!!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <p className="text-sm font-semibold text-muted-foreground">
                  I confirm that the information I have provided is true and accurate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export { LawyerComponent };
