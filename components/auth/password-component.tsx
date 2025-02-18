"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { CLIENT_ERROR_STATUS } from "@/lib/_constants";
import { useToast } from "@/hooks/use-toast";

export const LoginPasswordField = ({
  state,
  clearErrors,
  label = "PASSWORD",
  name = "password",
  id = "password",
  placeholder = "Input Password",
}: {
  state?: { status: any; message: any; errors: any };
  clearErrors?: () => void;
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  useEffectAfterMount(() => {
    if (state && CLIENT_ERROR_STATUS.includes(state?.status)) {
      toast({
        title: state?.message,
        description:
          typeof state.errors === "string"
            ? state.errors
            : state.errors?.error || "An error occurred.",
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px",
        },
      });
    }
  }, [state]);

  return (
    <div>
      {label && (
        <Label htmlFor={id} className="text-sm font-bold text-neutral-600">
          {label}
        </Label>
      )}
      <div className="grid grid-cols-1 grid-rows-0 place-items-center">
        <Input
          className="col-span-full placeholder:text-sm placeholder:font-semibold placeholder:text-zinc-500 text-sm border-0 border-app-secondary row-span-full bg-transparent border-none border-b-2 px-2 text-muted-foreground focus:ring-transparent focus-visible:ring-transparent peer"
          name={name}
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          onChange={clearErrors} // Clear error state when typing
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="col-span-full row-span-full justify-self-end mr-5 hover:cursor-pointer transition-all opacity-50 peer-focus-within:opacity-100 peer-focus:opacity-100"
        >
          {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
        </span>
      </div>

      <span className="h-1 text-xs text-destructive">
        {state?.errors?.[name]}
      </span>
    </div>
  );
};
