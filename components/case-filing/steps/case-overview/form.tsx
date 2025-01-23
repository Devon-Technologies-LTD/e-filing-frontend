"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILING_LOCATIONS, FORM_FIELDS } from "@/types/files/general";
import InputField from "@/components/ui/InputField";
import { useCaseFilingForm } from "@/context/file-case";
import { CaseOverViewData } from "@/types/file-case";

// Custom Select Component
const LocationSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Select onValueChange={onChange} value={value}>
    <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
      <SelectValue
        className="text-neutral-700 text-xs"
        placeholder="Select A Filing Location"
      />
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
  const { caseOverviewFormData, updateCaseOverViewFormData } =
    useCaseFilingForm();
  const handleInputChange = (name: string, value: string) => {
    updateCaseOverViewFormData({ [name]: value });
  };

  return (
    <div className="w-full space-y-8 ">
      <LocationSelect
        value={caseOverviewFormData.filingLocation}
        onChange={(value) => {
          handleInputChange("filingLocation", value);
        }}
      />

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
          value={
            caseOverviewFormData[field.name as keyof CaseOverViewData] || ""
          }
          onChange={(e) => handleInputChange(field.name, e.target.value)}
        />
      ))}
    </div>
  );
}
