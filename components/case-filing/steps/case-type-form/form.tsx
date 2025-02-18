"use client";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/hooks/redux";
import {
  removeAllCriminalCaseDocument,
  updateCaseTypeName,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import CriminalCaseForm from "./criminal-case-form";
import {
  CaseTypeData,
  CivilCaseSubType,
  CivilCaseSubTypeValueWorth,
  CriminalCaseSubType,
  FamilyCaseSubType,
} from "@/constants";
import CivilCaseForm from "./civil-case-form";
import FamilyCaseForm from "./family-case-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToolTipCard } from "@/components/ui/tool-tip-card";
import { HelpCircle } from "lucide-react";
import CaseTypeTooltip from "./case-type-tooltip";

export default function CaseTypesForm() {
  const dispatch = useDispatch();

  const caseTypeComponentMap: { [key: string]: React.ComponentType<any> } = {
    [CaseTypeData.CIVIL_CASE]: CivilCaseForm,
    [CaseTypeData.FAMILY_CASE]: FamilyCaseForm,
    [CaseTypeData.CRIMINAL_CASE]: CriminalCaseForm,
  };
  const {
    caseType: { case_type, sub_case_type, recovery_amount },
  } = useAppSelector((value) => value.caseFileForm) as {
    caseType: {
      case_type: keyof typeof caseSubTypesMap;
      sub_case_type: string;
      recovery_amount: string;
    };
  };
  const caseSubTypesMap = {
    [CaseTypeData.CIVIL_CASE]: Object.values(CivilCaseSubType),
    [CaseTypeData.FAMILY_CASE]: Object.values(FamilyCaseSubType),
    [CaseTypeData.CRIMINAL_CASE]: Object.values(CriminalCaseSubType),
  };

  const renderCaseContent = useCallback(() => {
    if (!case_type) return null;
    const CaseComponent = caseTypeComponentMap[case_type];
    if (CaseComponent) {
      return <CaseComponent />;
    }

    return null;
  }, [case_type, sub_case_type]);

  return (
    <div className="w-full space-y-8">
      <div className="lg:w-1/2 space-y-8">
        <Select
          onValueChange={(value) => {
            dispatch(
              updateCaseTypeName({
                case_type: value,
                sub_case_type: "",
                direct_complain: "",
              })
            );
          }}
          value={case_type}
        >
          <SelectTrigger variant={"underlined"}>
            <SelectValue
              className="text-neutral-700 text-xs"
              placeholder="Select a Case Type"
            />
          </SelectTrigger>
          <SelectContent className="bg-white text-zinc-900">
            {Object.values(CaseTypeData).map((caseType) => (
              <SelectItem
                variant="underlined"
                key={caseType}
                value={caseType}
                className="py-2"
              >
                {caseType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {case_type && case_type !== CaseTypeData.FAMILY_CASE && (
          <Select
            onValueChange={(value) => {
              dispatch(
                updateCaseTypeName({
                  sub_case_type: value,
                  recovery_amount: "",
                  direct_complain: "",
                })
              );
              dispatch(removeAllCriminalCaseDocument());
            }}
            value={sub_case_type}
          >
            <SelectTrigger
              tooltip={
                sub_case_type === CriminalCaseSubType.DIRECT_COMPLAIN ||
                case_type === CaseTypeData.CIVIL_CASE
              }
              variant={"underlined"}
            >
              <SelectValue
                className="text-neutral-700 text-xs"
                placeholder={`Select the Type of ${case_type
                  ?.split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}`}
              />
              <CaseTypeTooltip
                caseType={case_type}
                subCaseType={sub_case_type}
              />
            </SelectTrigger>
            <SelectContent className="bg-white text-zinc-900">
              {caseSubTypesMap[case_type]?.map((subCase) => (
                <SelectItem
                  variant="underlined"
                  key={subCase}
                  value={subCase}
                  className="py-2"
                >
                  {subCase}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {case_type === CaseTypeData.CIVIL_CASE && sub_case_type && (
          <Select
            onValueChange={(value) => {
              dispatch(
                updateCaseTypeName({
                  recovery_amount: value,
                  direct_complain: "",
                })
              );
            }}
            value={recovery_amount}
          >
            <SelectTrigger tooltip={true} variant={"underlined"}>
              <SelectValue
                className="text-neutral-700 text-xs"
                placeholder={`Select the Value (Worth) Of Recovery`}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle
                      className="h-4 w-4 text-neutral-500 hover:text-neutral-700 cursor-help"
                      aria-label="tooltipText"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="mb-12 justify-start p-0">
                    <ToolTipCard
                      className="justify-start text-start"
                      title="VALUE OF RECOVERY"
                      description="This refers to the total amount or worth of what is being claimed in the case. It could be money owed, property value, or compensation being sought. The value helps determine the appropriate legal process for the case."
                    />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SelectTrigger>
            <SelectContent className="bg-white text-zinc-900">
              {Object.values(CivilCaseSubTypeValueWorth)?.map((worth) => (
                <SelectItem
                  variant="underlined"
                  key={worth}
                  value={worth}
                  className="py-2"
                >
                  {worth}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {renderCaseContent()}
    </div>
  );
}
