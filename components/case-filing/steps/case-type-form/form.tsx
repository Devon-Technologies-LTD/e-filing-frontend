"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/hooks/redux";
import {
  addCaseTypeError,
  clearCaseTypeError,
  updateCaseTypeName,
  updateStep,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { CaseTypeData } from "@/constants";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { getCaseTypes, getSubCaseTypes, getWorth } from "@/lib/actions/public";
import { useQuery } from "@tanstack/react-query";
import { ICaseTypesResponse } from "@/lib/_services/constants.service";
import { CivilCaseForm5 } from "./civil-form-5";
import { CivilCaseForm8 } from "./civil-form-8";
import { CivilCaseForm4 } from "./civil-form-4";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { ToolTipCard } from "@/components/ui/tool-tip-card";
import { DirectCriminalComplaintForm } from "./direct-complaint-form";

export default function CaseTypesForm() {
  const dispatch = useDispatch();
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const {
    caseType: { case_type, sub_case_type, recovery_amount },
    caseTypeErrors,
    current_step,
  } = useAppSelector((value) => value.caseFileForm);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["case_types"],
    queryFn: getCaseTypes,
    staleTime: 50000,
  });
  const { data: subcategory, isLoading: subcategoryLoading } = useQuery({
    queryKey: ["case_subcategory_types", case_type],
    queryFn: () => getSubCaseTypes(case_type.toLowerCase()),
    enabled: !!case_type,
    staleTime: 50000,
  });
  const hasWorth = subcategory?.data?.worth;
  const { data: worth, isLoading: worthLoading } = useQuery({
    queryKey: ["get_worth", sub_case_type],
    queryFn: () => getWorth({ type: sub_case_type }),
    enabled: hasWorth?.includes(sub_case_type),
    staleTime: 50000,
  });

  const FormType: { [key: string]: React.ComponentType<any> } = {
    ["CIVIL_FORM_5"]: CivilCaseForm5,
    ["CIVIL_FORM_4"]: CivilCaseForm4,
    ["CIVIL_FORM_8"]: CivilCaseForm8,
    ["DIRECT_CRIMINAL_FORM"]: DirectCriminalComplaintForm,
  };

  const renderCaseContent = (type: string, documents: any) => {
    if (!case_type) return null;
    const CaseComponent = FormType[type];
    if (CaseComponent) {
      return <CaseComponent documents={documents} />;
    }
    return null;
  };

  useEffect(() => {
    const filteredData = subcategory?.data?.result?.filter(
      (item: any) => item.Title.toLowerCase() === sub_case_type.toLowerCase()
    );
    if (filteredData) {
      setSelectedCase(filteredData);
    }
  }, [case_type, subcategory, sub_case_type]);

  return (
    <div className="w-full space-y-8">
      <div className="lg:w-1/2 space-y-8">
        {/* case type */}
        <Select
          onValueChange={(value) => {
            dispatch(
              updateCaseTypeName({
                case_type: value,
                sub_case_type: "",
                direct_complain: "",
              })
            );
            dispatch(clearCaseTypeError());
          
          }}
          value={case_type}
        >
          <SelectTrigger
            loading={loading}
            disabled={loading}
            variant={caseTypeErrors.case_type ? "error" : "underlined"}
          >
            <SelectValue
              className="text-neutral-700 text-xs"
              placeholder="Select a Case Type"
            />
          </SelectTrigger>
          <SelectContent className="bg-white text-zinc-900">
            {data?.data?.map((caseType: ICaseTypesResponse) => (
              <SelectItem
                variant="underlined"
                key={caseType?.Title}
                value={caseType?.Title}
                className="py-2"
              >
                {caseType?.Title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* subcase type */}
        {case_type && case_type !== CaseTypeData.FAMILY_CASE && (
          <Select
            onValueChange={(value) => {
              dispatch(
                updateCaseTypeName({
                  sub_case_type: value,
                  direct_complain: "",
                  recovery_amount: "",
                })
              );
              dispatch(clearCaseTypeError());
            }}
            value={sub_case_type}
          >
            <SelectTrigger
              loading={subcategoryLoading}
              disabled={subcategoryLoading}
              variant={caseTypeErrors.case_type ? "error" : "underlined"}
            >
              <SelectValue
                className="text-neutral-700 text-xs"
                placeholder="Select a Sub Case Type"
              />
            </SelectTrigger>
            <SelectContent className="bg-white text-zinc-900">
              {subcategory?.data?.result?.map(
                (caseType: ICaseTypesResponse) => (
                  <SelectItem
                    variant="underlined"
                    key={caseType?.Title}
                    value={caseType?.Title}
                    className="py-2"
                  >
                    {caseType?.Title}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        )}

        {/* document if required  */}
        {sub_case_type &&
          selectedCase &&
          selectedCase[0]?.Documents &&
          !selectedCase[0].FormType && (
            <DocumentUploadComponent
              required
              errorMessage={caseTypeErrors?.interpleader ?? ""}
              title={
                selectedCase[0]?.Documents[0]
                  ? (selectedCase[0]?.Documents[0] as any)?.title
                  : ""
              }
              subTitle={sub_case_type}
              caseType={case_type}
              subCase={sub_case_type}
            />
          )}

        {case_type && sub_case_type && hasWorth?.includes(sub_case_type) && (
          <Select
            onValueChange={(value) => {
              dispatch(
                updateCaseTypeName({
                  recovery_amount: value,
                  direct_complain: "",
                })
              );
              dispatch(
                addCaseTypeError({
                  recovery_amount: "",
                })
              );
            }}
            value={recovery_amount}
          >
            <SelectTrigger
              loading={worthLoading}
              tooltip={true}
              variant={caseTypeErrors.recovery_amount ? "error" : "underlined"}
            >
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
              {worth?.data?.map((worth: any) => (
                <SelectItem
                  variant="underlined"
                  key={worth?.Title}
                  value={worth?.Title}
                  className="py-2"
                >
                  {worth?.Title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {/* form if required */}
      {sub_case_type && selectedCase && selectedCase[0]?.FormType && (
        <>
          {renderCaseContent(
            selectedCase[0].FormType,
            selectedCase[0].Documents
          )}
        </>
      )}
    </div>
  );
}
