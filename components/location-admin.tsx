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
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";

export const LocationAdmin = ({
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
        queryKey: ["divisions"],
        queryFn: async () => {
            return await getAdminDivision();
        },
        placeholderData: keepPreviousData,
        staleTime: 50000,
    });

      const { data: user } = useAppSelector((state) => state.profile);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedSubDivision, setSelectedSubDivision] = useState<string | null>(null);

    // Handle Division Selection
    const handleDivisionChange = (newValue: string) => {
        setSelectedTitle(newValue);
        setSelectedSubDivision(null); // Reset sub-division when main division changes
        onChange(newValue); // Pass division value to parent
    };

    // Handle Sub-Division Selection
    const handleSubDivisionChange = (newSubValue: string) => {
        setSelectedSubDivision(newSubValue);
        onChange(newSubValue); // Pass sub-division value to parent
    };

    const selectedDivision = data?.data?.find(
        (location: any) => location.ID === selectedTitle
    );

    return (
        <div className="w-full space-y-4">
            {/* Select Court Division */}
            <Select onValueChange={handleDivisionChange} value={selectedTitle ?? undefined}>
                <SelectTrigger loading={loading} disabled={loading || disabled} variant={error ? "error" : "underlined"}>
                    <SelectValue className="text-neutral-700 text-xs" placeholder="Select A Filing Location" />
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

            {/* Show Sub-Division Select Only for DIRECTOR_MAGISTRATE */}
            {/* {[ROLES.DIRECTOR_MAGISTRATE].includes(user?.role) &&
                selectedDivision &&
                selectedDivision.sub_division?.length > 0 && (
                    <Select onValueChange={handleSubDivisionChange} value={selectedSubDivision ?? undefined}>
                        <SelectTrigger loading={loading} disabled={loading || disabled} variant={error ? "error" : "underlined"}>
                            <SelectValue className="text-neutral-700 text-xs" placeholder="Select Sub-Division" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-zinc-900">
                            {selectedDivision.sub_division.map((sub: string, index: number) => (
                                <SelectItem key={index} value={sub} className="py-2">
                                    {sub}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )} */}
        </div>
    );
};
