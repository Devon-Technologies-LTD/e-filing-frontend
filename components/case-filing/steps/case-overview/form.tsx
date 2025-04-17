"use client";
import { FORM_FIELDS } from "@/types/files/general";
import InputField from "@/components/ui/InputField";
import { useAppSelector } from "@/hooks/redux";
import {
  addCaseTypeError,
  ICaseTypes,
  updateCaseTypeName,
  updateMultipleCaseTypeFields,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { ToolTipCard } from "@/components/ui/tool-tip-card";
import { LocationSelect } from "@/components/location-select";
import { Claimant } from "../../hooks";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/svg/icons";
import { PlusCircle } from "lucide-react";
import { TitlesSelect } from "@/components/title-select";

interface PartyFieldProps {
  partyType: "claimant" | "defendant";
  list: Partial<Claimant>[];
  onChange: (updatedList: Partial<Claimant>[]) => void;
  errors?: string[];
}

const PartyField: React.FC<PartyFieldProps> = ({
  partyType,
  list,
  onChange,
  errors = [],
}) => {
  const handleFieldChange = (
    index: number,
    key: keyof Partial<Claimant>,
    value: string
  ) => {
    const updated = list.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    onChange(updated);
  };
  const { caseTypeErrors } = useAppSelector((data) => data.caseFileForm);

  const handleAdd = () => {
    onChange([
      ...list,
      { last_name: "", first_name: "", middle_name: "", honorific: "" },
    ]);
  };

  const handleRemove = (index: number) => {
    if (list.length === 1) return;
    const updated = [...list];
    updated.splice(index, 1);
    onChange(updated);
  };

  const dispatch = useDispatch();
  return (
    <div>
      <h3 className="text-xs flex justify-between text-neutral-600 items-center font-semibold uppercase">
        <span className="flex items-center">
          {partyType}
          <span className="text-red-500 ml-1 text-lg">*</span>
        </span>
        <Button
          type="button"
          variant={"link"}
          onClick={handleAdd}
          className="no-underline px-4 py-1 rounded"
        >
          <PlusCircle />
          Add another {partyType}
        </Button>
      </h3>
      <div className="space-y-5">
        {list.map((item, index) => (
          <div key={index} className="space-y-3">
            {/* <div className="flex justify-between items-center">
             
            </div> */}
            <div key={index} className="grid grid-cols-5 items-end gap-4">
              <div className="w-auto">
                <TitlesSelect
                  value={item.honorific!}
                  onChange={(value) => {
                    handleFieldChange(index, "honorific", value);
                    dispatch(
                      addCaseTypeError({
                        [`${partyType}_title`]: "",
                      })
                    );
                  }}
                  // error={errors[index]}
                  error={caseTypeErrors[`${partyType}_title`] ?? ""}
                />
              </div>
              <InputField
                name={`${partyType}[${index}].last_name`}
                id={`${partyType}[${index}].last_name`}
                label="Last Name"
                placeholder="Last Name"
                value={item.last_name}
                required={index === 0}
                onChange={(e) => {
                  handleFieldChange(index, "last_name", e.target.value);
                  dispatch(
                    addCaseTypeError({
                      [`${partyType}_lastname`]: "",
                    })
                  );
                }}
                error={caseTypeErrors[`${partyType}_lastname`] ?? ""}
              />
              <InputField
                name={`${partyType}[${index}].first_name`}
                id={`${partyType}[${index}].first_name`}
                label="First Name"
                placeholder="First Name"
                value={item.first_name}
                required={index === 0}
                onChange={(e) => {
                  handleFieldChange(index, "first_name", e.target.value);
                  dispatch(
                    addCaseTypeError({
                      [`${partyType}_firstname`]: "",
                    })
                  );
                }}
                error={caseTypeErrors[`${partyType}_firstname`] ?? ""}
              />
              <InputField
                name={`${partyType}[${index}].middle_name`}
                id={`${partyType}[${index}].middle_name`}
                label="Middle Name"
                placeholder="Middle Name"
                value={item.middle_name}
                onChange={(e) =>
                  handleFieldChange(index, "middle_name", e.target.value)
                }
                error={errors[index] ?? ""}
              />
              {index > 0 && (
                <button
                  onClick={() => handleRemove(index)}
                  className="w-auto text-red-500 text-sm"
                >
                  <Icons.bin />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CaseOverviewForm() {
  const { caseType, caseTypeErrors } = useAppSelector(
    (data) => data.caseFileForm
  );
  const dispatch = useDispatch();
  const handleChange = (name: keyof ICaseTypes, value: string) => {
    const updatedClaimants = caseType.claimant.map((claimant) => ({
      ...claimant,
      [name]: value,
    }));

    dispatch(
      updateMultipleCaseTypeFields({
        fields: { claimant: updatedClaimants },
      })
    );
  };

  return (
    <div className="w-full space-y-8 ">
      <LocationSelect
        value={caseType.court_division}
        onChange={(value) => {
          dispatch(updateCaseTypeName({ ["court_division"]: value }));
          dispatch(
            addCaseTypeError({
              court_division: "",
            })
          );
        }}
        error={caseTypeErrors?.court_division}
      />

      <PartyField
        partyType="claimant"
        list={caseType.claimant}
        onChange={(updatedClaimants) => {
          dispatch(
            updateMultipleCaseTypeFields({
              fields: { claimant: updatedClaimants },
            })
          );
          dispatch(addCaseTypeError({ claimant: "" }));
        }}
      />

      <PartyField
        partyType="defendant"
        list={caseType.defendant}
        onChange={(updatedDefendants) => {
          dispatch(
            updateMultipleCaseTypeFields({
              fields: { defendant: updatedDefendants },
            })
          );
          dispatch(addCaseTypeError({ defendant: "" }));
        }}
      />

      <InputField
        disabled
        id={"case title"}
        name={"case title"}
        label={"Case Title"}
        value={`${
          caseType.claimant.length > 1
            ? `${caseType.claimant[0].last_name} and ${
                caseType.claimant.length - 1
              } ORS`
            : caseType.claimant[0].last_name ?? ""
        } vs ${
          caseType.defendant.length > 1
            ? `${caseType.defendant[0].last_name} and ${
                caseType.defendant.length - 1
              } ORS`
            : caseType.defendant[0].last_name ?? ""
        }`}
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
          value={caseType.claimant[0]?.[field.name as keyof Claimant] || ""}
          onChange={(e) => {
            handleChange(field.name as any, e.target.value);
            dispatch(
              addCaseTypeError({
                [field.id]: "",
              })
            );
          }}
          required={field.required}
          error={caseTypeErrors[field.id] ?? ""}
        />
      ))}
    </div>
  );
}
