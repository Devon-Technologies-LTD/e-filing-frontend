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
  addCaseFileError,
  CaseFileState,
  updateCaseFileField,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";

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
  const { caseFile, caseFileErrors } = useAppSelector(
    (data) => data.caseFileForm
  );
  const dispatch = useDispatch();
  const handleInputChange = (name: keyof CaseFileState, value: string) => {
    dispatch(updateCaseFileField({ field: name, value: value }));
  };

  const handleSelectChange = (name: keyof CaseFileState, value: string) => {
    dispatch(updateCaseFileField({ field: name, value: value }));
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
        value={caseFile.court_division}
        onChange={(value) => {
          handleSelectChange("court_division", value);
          dispatch(
            addCaseFileError({
              court_division: "",
            })
          );
        }}
        error={caseFileErrors?.court_division}
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
          value={caseFile[field.name as keyof CaseFileState] || ""}
          onChange={(e) => {
            handleInputChange(field.name, e.target.value);
            dispatch(
              addCaseFileError({
                [field.name]: "",
              })
            );
          }}
          error={caseFileErrors[field.name] ?? ""}
        />
      ))}
    </div>
  );
}
