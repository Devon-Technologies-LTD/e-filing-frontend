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
export const FilterDropdown = ({
  placeholder,
  options,
  value,
  triggerVariant,
  itemVariant,
  onChange,
}: {
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  triggerVariant?: keyof typeof selectTriggerVariants.variant;
  itemVariant?: keyof typeof selectItemVariants.variant;
  onChange: (value: string) => void;
}) => (
  <Select onValueChange={onChange} value={value}>
    <SelectTrigger className="h-12" variant={triggerVariant}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem
          className="min-w-40 "
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
