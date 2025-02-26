import { getUserDivision } from "@/lib/actions/division";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const LocationSelect = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      return await getUserDivision();
    },
    placeholderData: keepPreviousData,
    staleTime: 50000,
  });

  console.log("response from location", data);
  return (
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
          {data?.data?.length ?? 0 > 0 ? (
            <>
              {data?.data?.map((location: any) => (
                <SelectItem
                  variant="underlined"
                  key={location.ID}
                  value={location.ID}
                  className="py-2"
                >
                  {location.Title}
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
