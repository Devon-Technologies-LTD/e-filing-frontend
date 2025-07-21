import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/hooks/redux";
import React from "react";

export default function CaseOverviewAndType() {
  const {
    caseType: { case_type, sub_case_type },
  } = useAppSelector((state) => state.caseFileForm);
  return (
    <div className="space-y-10 overflow-y-scroll scrollbar-hide h-full">
      <div className="w-full space-y-8">
        <div className="w-full space-y-8">
          <div className=" space-y-8">
            <Select>
              <SelectTrigger lock disabled variant={"underlined"}>
                <SelectValue
                  className="text-neutral-700 text-xs"
                  placeholder={case_type}
                />
              </SelectTrigger>
              <SelectContent className="bg-white text-zinc-900"></SelectContent>
            </Select>
            {sub_case_type && (
              <Select>
                <SelectTrigger disabled variant={"underlined"}>
                  <SelectValue
                    className="text-neutral-700 text-xs"
                    placeholder={sub_case_type}
                  />
                </SelectTrigger>
                <SelectContent className="bg-white text-zinc-900"></SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
