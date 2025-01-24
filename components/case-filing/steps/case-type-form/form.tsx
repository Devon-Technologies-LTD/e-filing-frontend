"use client";

import { useCallback, useState } from "react";
import { CustomSelect, DirectCriminalComplaintForm } from "../forms/civil";
import { CASE_OPTIONS, CASE_TYPES, CaseTypes, WORTH_OPTIONS } from "@/types/files/case-type";
import { FamilyComplaintForm } from "../forms/family";
import { CivlDefault } from "../forms/civil-default";
import { CivilSpecific } from "../forms/civil-specific";
import { FileInputField } from "@/components/FileInputField";

export default function CaseTypesForm() {
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "">("");
  const [subCaseSelection, setSubCaseSelection] = useState<string>("");
  const [CivilCaseWorthSelection, setCivilCaseWorthSelection] = useState<string>("");

  const handleFileChange = (id: string, files: FileList | null) => {
    if (!files || files.length === 0) {
      console.log(`No file selected for ${id}`);
      return;
    }
    console.log(`File selected for ${id}:`, files[0].name);
    // Add logic to handle the uploaded file, e.g., sending it to an API
  };

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
            <FileInputField
              id="FIR"
              label="UPLOAD FIRST INFORMATION REPORT"
              exhibit={{ id: "FIR", fileName: null }}
              handleFileChange={handleFileChange}
            />
          );
        case "EXPARTE":
          return (
            <FileInputField
              id="EXPARTE"
              label="UPLOAD REQUEST FOR REMAND ORDER"
              exhibit={{ id: "EXPARTE", fileName: null }}
              handleFileChange={handleFileChange}
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
    <div className="w-full space-y-8">
      <CustomSelect
        placeholder="Select A Case Type"
        options={CASE_TYPES}
        value={selectedCase}
        onChange={handleCaseTypeChange}
      />
      {selectedCase && (
        <CustomSelect
          placeholder={`Select the type of ${selectedCase.charAt(0).toUpperCase() + selectedCase.slice(1)} Case`}
          options={CASE_OPTIONS[selectedCase]}
          value={subCaseSelection}
          onChange={setSubCaseSelection}
        />
      )}
      {renderCaseContent()}
      {CivilCaseWorthSelection && renderCivilCaseForm()}
    </div>
  );
}
