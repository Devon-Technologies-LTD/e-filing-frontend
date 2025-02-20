"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORM_FIELDS } from "@/types/files/general";
import InputField from "@/components/ui/InputField";
import { getUserDivision } from "@/lib/actions/division";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IDivision } from "@/lib/_services/divisions-service";
import { useAppSelector } from "@/hooks/redux";
import {
  addCaseTypeError,
  ICaseTypes,
  updateCaseTypeName,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { ToolTipCard } from "@/components/ui/tool-tip-card";

export const LocationSelect = ({
  value,
  onChange,
  error,
  data,
  loading,
}: {
  data: IDivision[] | any;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  loading: boolean;
}) => (
  <div className="w-full">
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        loading={loading}
        disabled={loading}
        variant={error ? "error" : "underlined"}
      >
        <SelectValue
          className="text-neutral-700 text-xs"
          placeholder="Select A Filing Location"
        />
      </SelectTrigger>
      <SelectContent className="bg-white text-zinc-900">
        {data?.length > 0 ? (
          <>
            {data?.map((location: any) => (
              <SelectItem
                variant="underlined"
                key={location.id}
                value={location.id}
                className="py-2"
              >
                {location.title}
              </SelectItem>
            ))}
          </>
        ) : (
          ""
        )}
      </SelectContent>
    </Select>
  </div>
);

export default function CaseOverviewForm() {
  const { caseType, caseTypeErrors } = useAppSelector(
    (data) => data.caseFileForm
  );
  const dispatch = useDispatch();
  const handleChange = (name: keyof ICaseTypes, value: string) => {
    dispatch(updateCaseTypeName({ [name]: value }));
  };

  const { data, isLoading: divisionFetching } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      return await getUserDivision();
    },
    placeholderData: keepPreviousData,
    staleTime: 50000,
  });

  const divisions: any = data?.data || [];

  return (
    <div className="w-full space-y-8 ">
      <LocationSelect
        loading={divisionFetching}
        data={divisions?.data}
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
