import Link from "next/link";
import React from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import TransformingLineLink from "../ui/animation-link";
import { LoginAction } from "@/lib/actions/login";
import { useFormState } from "react-dom";
import InputField from "../ui/InputField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleSignInButton from "../GoogleSignInButton";
import { toast } from "sonner"
import { CLIENT_ERROR_STATUS } from "@/lib/_constants";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { isFieldErrorObject } from "@/types/auth";
import { LoginPasswordField } from "../passwordField";


const LoginComponent = () => {
  const [state, dispatch] = useFormState(LoginAction, undefined);
  // const errors = state?.errors && isFieldErrorObject(state.errors) ? state.errors : {};
  const errors = isFieldErrorObject(state?.errors) 
  ? state.errors 
  : {} as Record<string, string[]>;

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
  
  return (
    <>
      <div className="heading">
        <p className="font-bold text-3xl text-app-primary text-center">Log In</p>
        <p className="text-center text-xs space-x-2 mt-3">
          <span className="text-muted text-gray-400">
            DON&apos;T HAVE AN ACCOUNT?
          </span>
          <span>
            <Link
              href="/signup"
              className="text-sm font-extrabold text-app-primary hover:none"
            >
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
          required
        />
        {/* <LoginPasswordField /> */}
        <LoginPasswordField error={errors.password?.[0]} />
        <Select name="userType">
          <SelectTrigger className="border-0 border-b-[1px] text-neutral-700">
            <SelectValue className="text-neutral-700" placeholder="Please Select User type" />
          </SelectTrigger>
          <SelectContent className="bg-white w-[354px] text-zinc-900">
            <SelectItem value="USER" className="text-sm font-semibold text-zinc-900">USER</SelectItem>
            <SelectItem value="LAWYER" className="text-sm font-semibold text-zinc-900">LAWYER</SelectItem>
            <SelectItem value="ADMIN" className="text-sm font-semibold text-zinc-900">ADMIN</SelectItem>
            <SelectItem value="ASSIGNING_MAGISTRATES" className="text-sm font-semibold text-zinc-900">ASSIGNING MAGISTRATES</SelectItem>
            <SelectItem value="PRESIDING_MAGISTRATES" className="text-sm font-semibold text-zinc-900">PRESIDING MAGISTRATES</SelectItem>
            <SelectItem value="DIRECTOR_MAGISTRATES" className="text-sm font-semibold text-zinc-900">DIRECTOR MAGISTRATE</SelectItem>
            <SelectItem value="CHIEF_JUDGE" className="text-sm font-semibold text-zinc-900">CHIEF JUDGE</SelectItem>
            <SelectItem value="CENTRAL_REGISTRY" className="text-sm font-semibold text-zinc-900">CENTRAL REGISTRY</SelectItem>
          </SelectContent>
        </Select>
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
