import { getTitles, getUserDivision } from "@/lib/actions/division";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Label } from "./ui/label";
import clsx from "clsx";

export const TitlesSelect = ({
  value,
  onChange,
  disabled,
  error,
}: {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  error?: string;
}) => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ["titles"],
    queryFn: async () => {
      return await getTitles();
    },
    placeholderData: keepPreviousData,
    staleTime: 50000,
  });

  console.log("titles", data);

  return (
    <div className="w-full">
      <Label
        // htmlFor={id}
        className={clsx(
          "flex items-center justify-between w-full text-xs font-bold",
          error ? "text-red-500" : "text-neutral-600"
        )}
      >
        <span className="flex items-center">
          Title
          {/* <span className="text-red-500 ml-1 text-xs">*</span> */}
        </span>

        {/* {showErrorInLabel && error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )} */}
      </Label>

      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          loading={loading}
          disabled={loading || disabled}
          variant={error ? "error" : "underlined"}
        >
          <SelectValue
            className="text-neutral-700 text-xs"
            placeholder="Title"
          />
        </SelectTrigger>
        <SelectContent className="bg-white text-zinc-900">
          {data?.data?.length ?? 0 > 0 ? (
            <>
              {data?.data?.map((title: any) => (
                <SelectItem
                  variant="underlined"
                  key={title}
                  value={title}
                  className="py-2"
                >
                  {title}
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
};
