"use client";

import { useState, useMemo } from "react";
import { EyeIcon, EyeOffIcon, CircleCheck, XCircle } from "lucide-react";
import zxcvbn from "zxcvbn";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import clsx from "clsx";

interface LoginPasswordFieldProps {
  state?: { status: any; message: any; errors: any };
  clearErrors?: () => void;
  label?: string;
  name?: string;
  id?: string;
  error?: string;
  placeholder?: string;
  showStrength?: boolean;
}

export const LoginPasswordField: React.FC<LoginPasswordFieldProps> = ({
  state,
  clearErrors,
  label = "PASSWORD",
  name = "password",
  id = "password",
  error,
  placeholder = "Input Password",
  showStrength = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // Optimize strength calculation with useMemo
  const result = useMemo(() => (showStrength ? zxcvbn(password) : null), [password, showStrength]);

  // Password requirements checklist
  const passwordChecks = [
    { label: "At least 8 characters", check: password.length >= 8 },
    { label: "Contains a number", check: /\d/.test(password) },
    { label: "Contains an uppercase letter", check: /[A-Z]/.test(password) },
    { label: "Contains a lowercase letter", check: /[a-z]/.test(password) },
    { label: "Contains a special character", check: /[\W_]/.test(password) },
  ];

  return (
    <div>
      {label && (
        <Label
          htmlFor={id}
          className={clsx("text-xs font-bold", error ? "text-red-500" : "text-neutral-600")}
        >
          {label}
          <span className="text-red-500 ml-1 text-lg">*</span>
        </Label>
      )}

      <div className="grid grid-cols-1 grid-rows-0 place-items-center relative">
        <Input
          className={clsx("col-span-full text-2xl leading-relaxed font-sans border-0 border-b-2 px-2 text-muted-foreground focus:ring-transparent focus-visible:ring-transparent peer  placeholder:text-md placeholder:font-semibold placeholder:text-zinc-400 text-md border-app-secondary row-span-full bg-transparent border-none peer",
            error ? "border-red-500 focus:border-red-500" : "border-neutral-200"
          )}
          name={name}
          type={showPassword ? "text" : "password"}
          id={id}
          autoComplete="off"
          placeholder={placeholder}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearErrors?.();
          }}
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="col-span-full row-span-full justify-self-end mr-5 hover:cursor-pointer transition-all opacity-50 peer-focus-within:opacity-100 peer-focus:opacity-100"
        >
          {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
        </span>
      </div>

      {/* Password Strength Checker */}
      {showStrength && password && (
        <div className="mt-2 p-2 rounded-lg">
          <ul className="mt-1 space-y-1">
            {passwordChecks.map((item, index) => (
              <li key={index} className="flex items-center text-sm font-semibold">
                {item.check ? (
                  <CircleCheck className="text-green-500 w-5 h-5 mr-1" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5 mr-1" />
                )}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Message */}
      {error && <span className="h-1 text-xs text-red-500">{error}</span>}
    </div>
  );
};
