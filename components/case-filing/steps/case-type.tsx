"use client";
import { useState, useCallback } from "react";
import "draft-js/dist/Draft.css";
import {
  CASE_TYPES,
  CASE_OPTIONS,
  WORTH_OPTIONS,
  CaseTypes,
} from "@/types/files/case-type";

import {
  CustomSelect,
  DirectCriminalComplaintForm,
  FileInputField,
} from "./forms/civil";
import { FamilyComplaintForm } from "./forms/family";
import { CivilSpecific } from "./forms/civil-specific";
import { CivlDefault } from "./forms/civil-default";

// const WorthValue = ({ id, label }: FileInputProps) => (
//     <Select>
//         <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
//             <SelectValue
//                 className="text-neutral-700 text-xs"
//                 placeholder="Select the Value (Worth) Of Recovery"
//             />
//         </SelectTrigger>
//         <SelectContent className="bg-white w-[354px] text-zinc-900">
//             {WORTH_OPTIONS.map((option) => (
//                 <SelectItem
//                     key={option.value}
//                     value={option.value}
//                     className="text-xs font-semibold text-zinc-900 hover:text-gray-600"
//                 >
//                     {option.label}
//                 </SelectItem>
//             ))}
//         </SelectContent>
//     </Select>
// );

export function CaseType() {
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "">("");
  const [subCaseSelection, setSubCaseSelection] = useState<string>("");
  const [CivilCaseWorthSelection, setCivilCaseWorthSelection] =
    useState<string>("");

  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value as CaseTypes);
    setSubCaseSelection("");
    setCivilCaseWorthSelection("");
  };

  const renderCivilCaseContent = useCallback(() => {
    switch (subCaseSelection) {
      case "recovery_premise":
      case "default_summon":
      case "specific_summon":
        return (
          <CustomSelect
            placeholder="Select the Value (Worth) Of Recovery"
            options={WORTH_OPTIONS}
            value={CivilCaseWorthSelection}
            onChange={setCivilCaseWorthSelection}
          />
        );
      default:
        return null;
    }
  }, [subCaseSelection, CivilCaseWorthSelection]);

  const renderCaseContent = useCallback(() => {
    if (!selectedCase || !subCaseSelection) return null;

    if (selectedCase === "criminal") {
      switch (subCaseSelection) {
        case "FIR":
          return (
            <FileInputField id="FIR" label="UPLOAD FIRST INFORMATION REPORT" />
          );
        case "EXPARTE":
          return (
            <FileInputField
              id="EXPARTE"
              label="UPLOAD REQUEST FOR REMAND ORDER"
            />
          );
        case "DCC":
          return <DirectCriminalComplaintForm />;
        default:
          return null;
      }
    } else if (selectedCase === "civil") {
      return renderCivilCaseContent();
    } else if (selectedCase === "family") {
      switch (subCaseSelection) {
        case "less_equal_one_million":
        case "between_one_three_million":
        case "between_three_seven_million":
          return <FamilyComplaintForm />;
        default:
          return null;
      }
    }

    return null;
  }, [selectedCase, subCaseSelection, renderCivilCaseContent]);

  const renderCivilCaseForm = useCallback(() => {
    switch (subCaseSelection) {
      case "recovery_premise":
        return <FamilyComplaintForm />;
      case "default_summon":
        return <CivlDefault />;
      case "specific_summon":
        return <CivilSpecific />;
      default:
        return null;
    }
  }, [subCaseSelection]);

  return (
    <div className="w-full mr-10 space-y-10 overflow-y-scroll scrollbar-hide h-[calc(100vh-220px)]">
      <div className="space-y-8">
        <p className="font-bold text-sm text-neutral-500">
          All Fields are required.
        </p>
        <div className="w-[354px] space-y-8">
          <CustomSelect
            placeholder="Select A Case Type"
            options={CASE_TYPES}
            value={selectedCase}
            onChange={handleCaseTypeChange}
          />
          {selectedCase && (
            <CustomSelect
              placeholder={`Select the type of ${
                selectedCase.charAt(0).toUpperCase() + selectedCase.slice(1)
              } Case`}
              options={CASE_OPTIONS[selectedCase]}
              value={subCaseSelection}
              onChange={setSubCaseSelection}
            />
          )}
        </div>
        {renderCaseContent()}
        {CivilCaseWorthSelection && renderCivilCaseForm()}
      </div>
    </div>
  );
}
