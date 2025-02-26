"use client";
import { FORM_FIELDS } from "@/types/files/general";
import InputField from "@/components/ui/InputField";
import { useAppSelector } from "@/hooks/redux";
import {
  addCaseTypeError,
  ICaseTypes,
  updateCaseTypeName,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { ToolTipCard } from "@/components/ui/tool-tip-card";
import { LocationSelect } from "@/components/location-select";

export default function CaseOverviewForm() {
  const { caseType, caseTypeErrors } = useAppSelector(
    (data) => data.caseFileForm
  );
  const dispatch = useDispatch();
  const handleChange = (name: keyof ICaseTypes, value: string) => {
    dispatch(updateCaseTypeName({ [name]: value }));
  };

  return (
    <div className="w-full space-y-8 ">
      <LocationSelect
        value={caseType.court_division}
        onChange={(value) => {
          handleChange("court_division", value);
          dispatch(
            addCaseTypeError({
              court_division: "",
            })
          );
        }}
        error={caseTypeErrors?.court_division}
      />

      {FORM_FIELDS.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          name={field.name}
          label={field.label}
          tooltipIcon={field.tooltipIcon}
          tooltipContent={
            <ToolTipCard
              title={field.tooltipTitle ?? ""}
              description={field.tooltipText ?? ""}
            />
          }
          placeholder={field.placeholder}
          icon={undefined}
          value={(caseType[field.name as keyof ICaseTypes] as any) || ""}
          onChange={(e) => {
            handleChange(field.name, e.target.value);
            dispatch(
              addCaseTypeError({
                [field.name]: "",
              })
            );
          }}
          required={field.required}
          error={caseTypeErrors[field.name] ?? ""}
        />
      ))}
    </div>
  );
}
