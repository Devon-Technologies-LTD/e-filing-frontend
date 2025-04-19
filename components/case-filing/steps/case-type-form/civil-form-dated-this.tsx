import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";
import { useAppSelector } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

export default function CivilFormDatedThis() {
  const { data: user } = useAppSelector((state) => state.profile);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <p className="text-lg font-bold">
          This plaint was taken out by claimant/counsel as the case may be
        </p>
        <p className=" flex items-center gap-3 text-base font-bold text-neutral-600">
          <span className="flex ">
            DATED THIS <span className="text-red-500 ml-1">*</span>
          </span>
        </p>
        <div className="flex items-end justify-start text-center">
          <Button
            disabled
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11",
              "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {format(new Date(), "PPP")}{" "}
          </Button>
        </div>
      </div>
      <InputField
        required
        showErrorInLabel
        id="counsel_name"
        disabled
        name="counsel_name"
        type="text"
        label="NAME"
        placeholder="e.g claimant/counsel name"
        value={`${user?.last_name} ${user?.first_name}`}
      />
    </div>
  );
}
