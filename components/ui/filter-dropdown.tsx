import {
  Select,
  SelectContent,
  SelectItem,
  selectItemVariants,
  SelectTrigger,
  selectTriggerVariants,
  SelectValue,
} from "./select";
import React from "react";
import { cn } from "@/lib/utils";

export const FilterDropdown = ({
  placeholder,
  options,
  value,
  triggerVariant,
  itemVariant,
  onChange,
  className, // Added className as a prop
}: {
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  triggerVariant?: keyof typeof selectTriggerVariants.variant;
  itemVariant?: keyof typeof selectItemVariants.variant;
  onChange: (value: string) => void;
  className?: string; // Allowing className to be passed
}) => (
  <Select onValueChange={onChange} value={value}>
    <SelectTrigger className={cn("h-11 min-w-fit", className)} variant={triggerVariant}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem
          className="min-w-fit"
          variant={itemVariant}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
