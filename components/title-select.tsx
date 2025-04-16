import { getTitles, getUserDivision } from "@/lib/actions/division";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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
