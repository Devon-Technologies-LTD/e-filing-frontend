"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import TransformingLineLink from "../ui/animation-link";
import { LoginAction } from "@/lib/actions/login";
import { useFormState } from "react-dom";
import InputField from "../ui/InputField";
import GoogleSignInButton from "../GoogleSignInButton";
import { toast } from "sonner";
import { CLIENT_ERROR_STATUS } from "@/lib/_constants";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { isFieldErrorObject } from "@/types/auth";
import { LoginPasswordField } from "../passwordField";
import { useRouter } from "next/navigation";


const LoginComponent = () => {
  const router = useRouter();

  const [state, dispatch] = useFormState(LoginAction, undefined);
  const [formDisabled, setFormDisabled] = useState(false);

  const errors = isFieldErrorObject(state?.errors)
    ? state.errors
    : {} as Record<string, string[]>;

  useEffect(() => {
    router.refresh(); // Forces Next.js to refresh the page
  }, []);
  // Handle errors
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

  // Reset form when logging out
  useEffect(() => {
    if (!state) {
      setFormDisabled(false);
    }
  }, [state]);

  return (
    <>
      <div className="heading">
        <p className="font-bold text-3xl text-app-primary text-center">Log In</p>
        <p className="text-center text-xs space-x-2 mt-3">
          <span className="text-muted text-gray-400">DON&apos;T HAVE AN ACCOUNT?</span>
          <span>
            <Link href="/signup" className="text-sm font-extrabold text-app-primary hover:none">
              Create One
            </Link>
          </span>
        </p>
      </div>
      <form action={dispatch} className="w-full space-y-6">
        <InputField
          id="email"
          type="email"
          label="EMAIL ADDRESS"
          name="email"
          placeholder="name@gmail.com"
          error={errors.email?.[0]}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\s/g, ''); // Remove spaces
          }}
          required
        />
        <LoginPasswordField error={errors.password?.[0]} />

        <SubmitButton
          value="LOG IN"
          pendingValue="Processing..."
          className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
        />

        <div className="text-center text-gray-400 my-6">OR</div>
        <GoogleSignInButton />
        <TransformingLineLink href="forgot" text="CAN'T LOG IN" />
      </form>
    </>
  );
};
export default LoginComponent;