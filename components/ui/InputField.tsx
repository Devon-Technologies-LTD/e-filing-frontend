"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon, HelpCircle } from "lucide-react";
import clsx from "clsx";

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  showErrorInLabel?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  icon?: LucideIcon | undefined;
  tooltipText?: string;
  tooltipContent?: React.ReactNode;
  tooltipIcon?: LucideIcon;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bottomText?: React.ReactNode;
  onIconClick?: () => void;
  className?: string;
  autoFocus?: boolean;
  state?: {
    status?: any;
    message?: any;
    errors: any;
  };
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  showErrorInLabel = false,
  required = false,
  readonly = false,
  disabled = false,
  error,
  value,
  icon: Icon,
  tooltipText,
  tooltipContent,
  tooltipIcon: TooltipIcon = HelpCircle,
  onChange,
  bottomText,
  onIconClick,
  className = "",
  autoFocus = false,
  state,
}) => {
  return (
    <div className="relative w-full space-y-1">
      <div className="flex items-center gap-1">
        {(tooltipText || tooltipContent) && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <TooltipIcon
                  className="h-4 w-4 text-neutral-500 hover:text-neutral-700 cursor-help"
                  aria-label={tooltipText}
                />
              </TooltipTrigger>
              <TooltipContent className="mb-12 p-0">
                {tooltipContent ? (
                  tooltipContent
                ) : (
                  <p className="text-sm">{tooltipText}</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Label
          htmlFor={id}
          className={clsx(
            "flex items-center justify-between w-full text-sm font-bold",
            error ? "text-red-500" : "text-neutral-600"
          )}
        >
          <span className="flex items-center">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
          {showErrorInLabel && error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </Label>
      </div>

      <div className="relative">
        <Input
          variant="underlined"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          readOnly={readonly}
          disabled={disabled}
          value={value}
          onChange={onChange}
          autoComplete="off"
          autoFocus={autoFocus}
          className={clsx(
            "w-full p-2 m border-0 border-b-[1px] placeholder:text-lg text-lg placeholder:font-semibold placeholder:text-zinc-400 shadow-none focus:outline-none focus:border-b-2  border-app-secondary",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-neutral-200 ",
            disabled && "opacity-50 cursor-not-allowed",
            Icon && "pr-10",
            className
          )}
        />
        {Icon && (
          <div
            className={clsx(
              "absolute right-2 top-1/2 -translate-y-1/2",
              onIconClick && "cursor-pointer hover:opacity-70",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={!disabled && onIconClick ? onIconClick : undefined}
          >
            <Icon className="h-4 w-4 text-neutral-500" />
          </div>
        )}
      </div>
      {bottomText && <div>{bottomText}</div>}
      {!showErrorInLabel && error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
      {state?.errors && state.errors[name] && (
        <span className="h-1 text-xs text-red-500">{state.errors[name]}</span>
      )}
    </div>
  );
};

export default InputField;
