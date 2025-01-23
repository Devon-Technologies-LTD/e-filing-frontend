"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILING_LOCATIONS, FORM_FIELDS } from "@/types/files/general";
import InputField from "@/components/ui/InputField";




// Custom Select Component
const LocationSelect = ({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Select onValueChange={onChange} value={value}>
    <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
      <SelectValue className="text-neutral-700 text-xs" placeholder="Select A Filing Location" />
    </SelectTrigger>
    <SelectContent className="bg-white w-[354px] text-zinc-900">
      {FILING_LOCATIONS.map((location) => (
        <SelectItem
          key={location.value}
          value={location.value}
          className="text-xs font-semibold text-zinc-900 hover:text-gray-600"
        >
          {location.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);


export default function CaseOverviewForm() {
const [selectedLocation, setSelectedLocation] = useState<string>("");
const [formData, setFormData] = useState<Record<string, string>>({});

const handleInputChange = (name: string, value: string) => {
  setFormData((prev) => ({ ...prev, [name]: value }));
};

  return (
    <div className="w-full space-y-8 ">
      <LocationSelect value={selectedLocation} onChange={setSelectedLocation} />

      {FORM_FIELDS.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          name={field.name}
          label={field.label}
          tooltipText={field.tooltipText}
          tooltipIcon={field.tooltipIcon}
          placeholder={field.placeholder}
          icon={field.icon}
          value={formData[field.name] || ""}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
        />
      ))}
    </div>
  );
}
