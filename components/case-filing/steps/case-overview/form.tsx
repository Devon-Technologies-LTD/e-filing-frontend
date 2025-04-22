"use client";
import InputField from "@/components/ui/InputField";
import { useAppSelector } from "@/hooks/redux";
import {
  addCaseTypeError,
  updateCaseTypeName,
  updateMultipleCaseTypeFields,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { LocationSelect } from "@/components/location-select";
import { Claimant } from "../../hooks";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/svg/icons";
import { PlusCircle } from "lucide-react";
import { TitlesSelect } from "@/components/title-select";
import { generateCaseTitle } from "@/lib/utils";

interface PartyFieldProps {
  partType: "claimant" | "defendant";
  list: Partial<Claimant>[];
  onChange: (updatedList: Partial<Claimant>[]) => void;
  errors?: string[];
}

const PartField: React.FC<PartyFieldProps> = ({ partType, list, onChange }) => {
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
      ...(Array.isArray(list) ? list : []),
      {
        tempId: crypto.randomUUID(),
        last_name: "",
        first_name: "",
        middle_name: "",
        honorific: "",
      },
    ]);
  };

  const handleRemove = (id: string) => {
    if (list.length === 1) return;
    const updated = list.filter(
      (item) => (item.id || item.tempId) !== id
    );
    onChange(updated);
  };

  const dispatch = useDispatch();
  return (
    <div>
      <div className="space-y-6">
        {Array.isArray(list) &&
          list.length > 0 &&
          list?.map((item, index) => (
            <div key={item.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex uppercase text-sm text-neutral-600 font-semibold items-center">
                  {partType} {index + 1}
                  <span className="text-red-500 ml-1 text-lg">*</span>
                </span>
                {index > 0 && (
                  <button
                    onClick={() => handleRemove(item.id || item.tempId!)}
                    className="w-auto text-red-500 text-sm"
                  >
                    <Icons.bin />
                  </button>
                )}
              </div>
              <div className="space-y-8">
                <div key={index} className="grid grid-cols-4 items-end gap-4">
                  <div className="w-auto">
                    <TitlesSelect
                      value={item.honorific!}
                      onChange={(value) => {
                        handleFieldChange(index, "honorific", value);
                        dispatch(
                          addCaseTypeError({
                            [`${partType}.${index}.honorific`]: "",
                          })
                        );
                      }}
                      error={caseTypeErrors[`${partType}.${index}.honorific`]}
                    />
                  </div>
                  <InputField
                    showErrorInLabel={true}
                    name={`${partType}[${index}].last_name`}
                    id={`${partType}[${index}].last_name`}
                    label="Last Name"
                    placeholder="Last Name"
                    className="text-sm"
                    value={item.last_name}
                    required={true}
                    onChange={(e) => {
                      handleFieldChange(index, "last_name", e.target.value);
                      dispatch(
                        addCaseTypeError({
                          [`${partType}.${index}.last_name`]: "",
                        })
                      );
                    }}
                    error={caseTypeErrors[`${partType}.${index}.last_name`]}
                  />
                  <InputField
                    showErrorInLabel={true}
                    name={`${partType}[${index}].first_name`}
                    id={`${partType}[${index}].first_name`}
                    label="First Name"
                    placeholder="First Name"
                    className="text-sm"
                    value={item.first_name}
                    required={true}
                    onChange={(e) => {
                      handleFieldChange(index, "first_name", e.target.value);
                      dispatch(
                        addCaseTypeError({
                          [`${partType}.${index}.first_name`]: "",
                        })
                      );
                    }}
                    error={caseTypeErrors[`${partType}.${index}.first_name`]}
                  />
                  <InputField
                    showErrorInLabel={true}
                    name={`${partType}[${index}].middle_name`}
                    id={`${partType}[${index}].middle_name`}
                    label="Middle Name"
                    placeholder="Middle Name"
                    className="text-sm"
                    value={item.middle_name}
                    onChange={(e) => {
                      handleFieldChange(index, "middle_name", e.target.value);
                      dispatch(
                        addCaseTypeError({
                          [`${partType}.${index}.middle_name`]: "",
                        })
                      );
                    }}
                    error={caseTypeErrors[`${partType}.${index}.middle_name`]}
                  />
                </div>

                <div className=" grid grid-cols-4 items-end gap-4 ">
                  <InputField
                    showErrorInLabel={true}
                    name={`${partType}[${index}].phone_number`}
                    id={`${partType}[${index}].phone_number`}
                    label="Phone Number"
                    placeholder="Phone Number"
                    required={partType === "claimant"}
                    className="text-sm"
                    value={item.phone_number}
                    onChange={(e) => {
                      handleFieldChange(index, "phone_number", e.target.value);
                      dispatch(
                        addCaseTypeError({
                          [`${partType}.${index}.phone_number`]: "",
                        })
                      );
                    }}
                    error={caseTypeErrors[`${partType}.${index}.phone_number`]}
                  />
                  <InputField
                    showErrorInLabel={true}
                    name={`${partType}[${index}].whatsapp`}
                    id={`${partType}[${index}].whatsapp`}
                    label="Whatsapp Number"
                    placeholder="Whatsapp Number"
                    className="text-sm"
                    value={item.whatsapp}
                    onChange={(e) => {
                      handleFieldChange(index, "whatsapp", e.target.value);
                      dispatch(
                        addCaseTypeError({
                          [`${partType}.${index}.whatsapp`]: "",
                        })
                      );
                    }}
                    error={caseTypeErrors[`${partType}.${index}.whatsapp`]}
                  />
                  <InputField
                    showErrorInLabel={true}
                    name={`${partType}[${index}].email_address`}
                    id={`${partType}[${index}].email_address`}
                    label="Email Address"
                    placeholder="Email Address"
                    required={partType === "claimant"}
                    className="text-sm"
                    value={item.email_address}
                    onChange={(e) => {
                      handleFieldChange(index, "email_address", e.target.value);

                      dispatch(
                        addCaseTypeError({
                          [`${partType}.${index}.email_address`]: "",
                        })
                      );
                    }}
                    error={caseTypeErrors[`${partType}.${index}.email_address`]}
                  />
                  <InputField
                    showErrorInLabel={true}
                    name={`${partType}[${index}].address`}
                    id={`${partType}[${index}].address`}
                    label="Address"
                    required={true}
                    placeholder="Address"
                    className="text-sm"
                    value={item.address}
                    onChange={(e) => {
                      handleFieldChange(index, "address", e.target.value);
                      dispatch(
                        addCaseTypeError({
                          [`${partType}.${index}.address`]: "",
                        })
                      );
                    }}
                    error={caseTypeErrors[`${partType}.${index}.address`]}
                  />
                </div>
              </div>
            </div>
          ))}
        <div className="flex justify-end">
          <Button
            type="button"
            variant={"link"}
            onClick={handleAdd}
            className="no-underline px-4 py-1 rounded"
          >
            <PlusCircle />
            Add another {partType}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CaseOverviewForm() {
  const { caseType, caseTypeErrors } = useAppSelector(
    (data) => data.caseFileForm
  );
  const dispatch = useDispatch();

  return (
    <div className="w-full space-y-8 ">
      <div className="lg:w-1/2">
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
      </div>

      <PartField
        partType="claimant"
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

      <PartField
        partType="defendant"
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

      <div className="lg:w-1/2">
        <InputField
          disabled
          labelclassName="text-sm"
          className="text-sm"
          id={"case title"}
          name={"case title"}
          label={"Case Title"}
          showErrorInLabel={false}
          value={generateCaseTitle(caseType.claimant, caseType.defendant)}
        />
      </div>
    </div>
  );
}
