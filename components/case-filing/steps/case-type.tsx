"use client";
import { useState, useCallback } from "react";
import 'draft-js/dist/Draft.css';
import {
    CaseOption,
    CASE_TYPES,
    CASE_OPTIONS,
    CaseTypes,
    FileInputProps,
    WORTH_OPTIONS
} from "@/types/files/case-type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomSelect, DirectCriminalComplaintForm, FileInputField } from "./forms/civil";
import { FamilyComplaintForm } from "./forms/famil";


const WorthValue = ({ id, label }: FileInputProps) => (
    <Select>
        <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
            <SelectValue
                className="text-neutral-700 text-xs"
                placeholder="Select the Value (Worth) Of Recovery"
            />
        </SelectTrigger>
        <SelectContent className="bg-white w-[354px] text-zinc-900">
            {WORTH_OPTIONS.map((option) => (
                <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-xs font-semibold text-zinc-900 hover:text-gray-600"
                >
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

export function CaseType() {
    const [selectedCase, setSelectedCase] = useState<CaseTypes | ''>('');
    const [subCaseSelection, setSubCaseSelection] = useState<string>('');
    const [CivilCaseSelection, setCivilCaseSelection] = useState<string>('');
    const handleCaseTypeChange = (value: string) => {
        setSelectedCase(value as CaseTypes);
        setSubCaseSelection('');
        setCivilCaseSelection('');
    };

    const renderCaseContent = () => {
        if (!selectedCase || !subCaseSelection) return null;
        if (selectedCase === "criminal") {
            switch (subCaseSelection) {
                case "FIR":
                    return <FileInputField id="FIR" label="UPLOAD FIRST INFORMATION REPORT" />;
                case "EXPARTE":
                    return <FileInputField id="EXPARTE" label="UPLOAD REQUEST FOR REMAND ORDER" />;
                case "DCC":
                    return <DirectCriminalComplaintForm />;
                default:
                    return null;
            }
        }
        if (selectedCase === "civil") {
            switch (subCaseSelection) {
                case "recovery_premise":
                    return <CustomSelect
                        placeholder="Select the Value (Worth) Of Recovery"
                        options={WORTH_OPTIONS}
                        value={CivilCaseSelection}
                        onChange={handleCaseTypeChange}
                    />;
                // <WorthValue id={""} label={""} />;
                case "default_summon":
                    return <WorthValue id={""} label={""} />;
                case "specific_summon":
                    return <WorthValue id={""} label={""} />;
                default:
                    return null;
            }
        }
        if (selectedCase === "family") {
            switch (subCaseSelection) {
                case "less_equal_one_million":
                    return <FamilyComplaintForm />;
                case "between_one_three_million":
                    return <FamilyComplaintForm />;
                case "between_three_seven_million":
                    return <FamilyComplaintForm />;
                default:
                    return null;
            }
        }


        if (CivilCaseSelection === "recovery_premise") {
            switch (subCaseSelection) {
                case "less_equal_one_million":
                    return <FamilyComplaintForm />;
                case "between_one_three_million":
                    return <FamilyComplaintForm />;
                case "between_three_seven_million":
                    return <FamilyComplaintForm />;
                default:
                    return null;
            }
        }
        return null;
    };

    return (
        <div className="w-full mr-10 space-y-10 overflow-y-scroll scrollbar-hide h-[calc(100vh-220px)]">
            <div className="space-y-8">
                <p className="font-bold text-sm text-neutral-500">All Fields are required.</p>
                <div className="w-[354px] space-y-8">
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
                </div>
                {renderCaseContent()}
            </div>
        </div>
    );
}
