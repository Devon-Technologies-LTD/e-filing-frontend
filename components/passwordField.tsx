"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import zxcvbn from "zxcvbn";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import clsx from "clsx"; // Import clsx for conditional class names

interface LoginPasswordFieldProps {
  state?: { status: any; message: any; errors: any };
  clearErrors?: () => void;
  label?: string;
  name?: string;
  id?: string;
  error?: string;
  placeholder?: string;
  showStrength?: boolean; // Optional prop (default is false)
}

export const LoginPasswordField: React.FC<LoginPasswordFieldProps> = ({
  state,
  clearErrors,
  label = "PASSWORD",
  name = "password",
  id = "password",
  error,
  placeholder = "Input Password",
  showStrength = false, // <-- New prop to toggle strength indicator
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // Calculate password strength only if showStrength is enabled
  const strength = showStrength ? zxcvbn(password).score : 0;

  const strengthColors = ["bg-red-500", "bg-orange-400", "bg-yellow-300", "bg-green-400", "bg-green-600"];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div>
      {label && (
        <Label
          htmlFor={id}
          className={clsx("text-sm font-bold", error ? "text-red-500" : "text-neutral-600")}
        >
          {label}
        </Label>
      )}
      <div className="grid grid-cols-1 grid-rows-0 place-items-center relative">
        <Input
          className={clsx(
            "col-span-full placeholder:text-sm placeholder:font-semibold placeholder:text-zinc-500 text-sm border-0 border-app-secondary row-span-full bg-transparent border-none border-b-2 px-2 text-muted-foreground focus:ring-transparent focus-visible:ring-transparent peer",
            error ? "border-red-500 focus:border-red-500" : "border-neutral-200"
          )}
          name={name}
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearErrors && clearErrors();
          }}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="col-span-full row-span-full justify-self-end mr-5 hover:cursor-pointer transition-all opacity-50 peer-focus-within:opacity-100 peer-focus:opacity-100"
        >
          {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
        </span>
      </div>

      {/* Password Strength Indicator - Only show if enabled */}
      {showStrength && password && (
        <div className="mt-2 flex flex-col">
          <div className="h-2 w-full bg-gray-200 rounded">
            <div
              className={`h-full ${strengthColors[strength]} rounded`}
              style={{ width: `${(strength + 1) * 20}%` }}
            ></div>
          </div>
          <span className={`text-xs font-semibold mt-1 ${strengthColors[strength]}`}>
            {strengthLabels[strength]}
          </span>
        </div>
      )}

      {/* Display error message if error exists */}
      {error && <span className="h-1 text-xs text-red-500">{error}</span>}
    </div>
  );
};