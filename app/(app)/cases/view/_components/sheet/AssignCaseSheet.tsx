

import React, { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ALL_DISTRICT, CaseTypes } from "@/types/files/case-type";
import {
    Select,
    SelectContent,
    SelectItem,
    selectItemVariants,
    SelectTrigger,
    selectTriggerVariants,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


export default function AssignCaseSheet({ trigger }: any) {
    const caseFilter = [{ value: 'all', label: 'ALL DISTRICTS' }, ...ALL_DISTRICT];
    const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
    const handleCaseTypeChange = (value: string) => {
        setSelectedCase(value as CaseTypes);
    };
    return (
        <Sheet>
            <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
            <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-4/5">
                <div className="space-y-10 mx-auto">
                    <div className="space-y-6 w-full">
                        <div>
                            <p className="font-bold text-xl">Assign Case to a Presiding Magistrate</p>
                            <div className="font-semibold text-sm">
                                This case will be under the perview of this new presiding magistrate once set
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
                                <Input
                                    type="search"
                                    variant="ghost"
                                    autoComplete="off"
                                    data-form-type="other"
                                    placeholder="e.g magisterate name"
                                    className="pl-9 h10 w-full"
                                />
                            </div>
                            {/* <AllDistrictFilter /> */}
                            <Select onValueChange={handleCaseTypeChange} value={selectedCase}>
                                <SelectTrigger className="bg-zinc-100 h-full border-b-2 border-input border-zinc-400 " variant='ghost'>
                                    <SelectValue placeholder="ALL DISTRICTS" />
                                </SelectTrigger>
                                <SelectContent>
                                    {caseFilter.map((option) => (
                                        <SelectItem
                                            className="min-w-40"
                                            variant="outline"
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid border-b-2 pb-3">
                            <p className="text-stone-600 text-sm font-bold mb-2">Recommended Presiding Magistrate</p>
                        </div>

                        <p className="text-base font-semibold">Based on Divisions Workload</p>

                        <div className="flex justify-between items-center px-4 py-6">
                            <div className="flex gap-2">
                                <Avatar>
                                    <AvatarFallback className="text-app-primary bg-[#FDF5EC] border-app-primary border-2  ">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid">
                                    <p className="text-stone-600 text-sm">John Doe</p>
                                    <p className="font-bold text-xs">Email@gmail.com</p>
                                    <p className="text-xs">Wuse zone 1</p>
                                </div>
                            </div>
                            <div className="text-sm items-center font-bold text-app-primary">
                                120 Cases
                            </div>
                        </div>

                    </div>
                </div>
                <Button className="w-full mx-[-10px] bottom-0">SUBMIT REQUEST</Button>
            </SheetContent>
        </Sheet>
    );
}