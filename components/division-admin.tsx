import { getAdminSubDivision } from "@/lib/actions/division";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const DivisionAdmin = ({
    placeholder,
    value,
    id,
    onChange,
    disabled,
    error,
    className,
}: {
    value: string;
    id: string | null;
    placeholder: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    error?: string;
    className?: string;
}) => {
    const { data, isLoading: loading } = useQuery({
        queryKey: ["sub-division"],
        queryFn: async () => (id ? await getAdminSubDivision(id) : null),
        enabled: !!id, // Prevent execution if id is null
        placeholderData: keepPreviousData,
        staleTime: 50000,
    });

    console.log(data);

    const [selectedSubDivision, setSelectedSubDivision] = useState<string | null>(value ?? null);

    useEffect(() => {
        setSelectedSubDivision(value);
    }, [value]);

    const handleSubDivisionChange = (newSubValue: string) => {
        setSelectedSubDivision(newSubValue);
        onChange(newSubValue);
    };

    // Handle different API response structures
    const subDivisions: string[] = Array.isArray(data)
        ? data
        : data?.data && Array.isArray(data.data)
            ? data.data
            : [];
    return (
        <div className="w-full space-y-4">
            <Select onValueChange={handleSubDivisionChange} value={selectedSubDivision || value}>
                <SelectTrigger
                    className={cn("h-11", className)}
                    loading={loading}
                    disabled={loading || disabled}
                    variant={error ? "error" : "underlined"}
                >
                    <SelectValue className="text-neutral-700 text-xs" placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white text-zinc-900">
                    {subDivisions.length > 0 && (
                        <>
                            {subDivisions.map((sub: string, index: number) => (
                                <SelectItem key={index} value={sub} className="py-2">
                                    {sub}
                                </SelectItem>
                            ))
                            }
                        </>

                    )}
                </SelectContent>
            </Select>
        </div>
    );
};
