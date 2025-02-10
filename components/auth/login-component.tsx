"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const LoginPasswordField = (props: {
  state?: { status: any; message: any; errors: any };
}) => {
  const [showPassword, setShowPassword] = useState(false);
  console.log(props.state?.errors?.password);
  return (
    <div>
      <Label htmlFor="password" className="text-sm font-bold text-neutral-600">
        PASSWORD
      </Label>
      <div className="grid grid-cols-1 grid-rows-0 place-items-center">
        <Input
          className="col-span-full placeholder:text-sm placeholder:font-semibold placeholder:text-zinc-500 text-sm border-0 border-app-secondary row-span-full bg-transparent border-none border-b-2 px-2 text-muted-foreground focus:ring-transparent focus-visible:ring-transparent placeholder:text-[10px] peer"
          name="password"
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Input Password"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className={`col-span-full row-span-full justify-self-end mr-5 hover:cursor-pointer transition-all opacity-50 peer-focus-within:opacity-100 peer-focus:opacity-100`}
        >
          {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
        </span>
      </div>

      <span className="h-1 text-xs text-destructive">
        {props.state?.errors?.password}
      </span>
    </div>
  );
};
