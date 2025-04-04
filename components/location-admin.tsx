import { getAdminDivision } from "@/lib/actions/division";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { cn } from "@/lib/utils";


export const LocationAdmin = ({
    placeholder,
    value,
    onChange,
    disabled,
    error,
    className, // Added className as a prop

}: {
    value: string;
    placeholder: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    error?: string;
    className?: string; // Allowing className to be passed

}) => {
    const { data, isLoading: loading } = useQuery({
        queryKey: ["divisions"],
        queryFn: async () => {
            return await getAdminDivision();
        },
        placeholderData: keepPreviousData,
        staleTime: 50000,
    });

    //   const { data: user } = useAppSelector((state) => state.profile);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedSubDivision, setSelectedSubDivision] = useState<string | null>(null);

    // Handle Division Selection
    const handleDivisionChange = (newValue: string) => {
        setSelectedTitle(newValue);
        setSelectedSubDivision(null); // Reset sub-division when main division changes
        onChange(newValue); // Pass division value to parent
    };

    return (
        <div className="w-full space-y-4">
            {/* Select Court Division */}
            <Select onValueChange={handleDivisionChange} value={selectedTitle ?? undefined}>
                <SelectTrigger className={cn("h-11", className)} loading={loading} disabled={loading || disabled} variant={error ? "error" : "underlined"}>
                    <SelectValue className="text-neutral-700 text-xs mx-4 " placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white text-zinc-900">
                    {data?.data?.length > 0 ? (
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
                    ) : null}
                </SelectContent>
            </Select>

        </div>
    );
};
