import * as React from "react";
import { cn } from "@/lib/utils";

type InputVariant = "default" | "search" | "bordered" | "underlined" | "ghost";
type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  error?: boolean;
}

const variantStyles: Record<InputVariant, string> = {
  default:
    "border border-input bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  search: "border border-input bg-zinc-100 pl-9",
  bordered: "border-2 border-input bg-transparent",
  underlined:
    "border-0 border-b-2 border-border bg-transparent rounded-none focus:outline-none focus-visible:ring-b focus-visible:ring-input font-medium text-zinc-600 placeholder:text-zinc-400",
  ghost: "border-b-2 border-zinc-400 opacity-60 bg-zinc-100 font-medium placeholder:text-neutral-700",
};

const sizeStyles: Record<InputSize, string> = {
  sm: "h-8 text-sm px-2",
  md: "h-10 text-base py-2",
  lg: "h-12 text-lg px-4",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, variant = "default", size = "md", error, ...props },
    ref
  ) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex w-full rounded-md shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Error styles
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
