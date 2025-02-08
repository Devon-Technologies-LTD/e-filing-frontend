import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/redux";
import { mockUsers } from "@/lib/dummy-data";
import { ROLES } from "@/types/auth";
import { CaseTypes, COURT_TYPE } from "@/types/files/case-type";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { createUserColumns } from "./table-column";
import InviteUser from "./invite-user";

export default function AllMagistrates() {
  const { data: user } = useAppSelector((state) => state.profile);
  const [selectedCourt, setSelectedCourt] = useState<CaseTypes | "all">("all");
  const handleCourtTypeChange = (value: string) => {
    setSelectedCourt(value as CaseTypes);
  };

  let headingText, descriptionText, buttonText;
  switch (user?.role) {
    case ROLES.CHIEF_JUDGE:
      headingText = "Director Magistrates";
      descriptionText =
        "View and manage the director magistrates responsible for overseeing all divisions. Monitor their activity and administrative roles across divisions.";
      buttonText = "INVITE NEW DIRECTOR MAGISTRATE";
      break;
    case ROLES.DIRECTOR_MAGISTRATES:
      headingText = "All Assigning Magistrates";
      descriptionText =
        "View and manage all assigning magistrates responsible for case allocations. Monitor their activity and administrative roles across divisions";
      buttonText = "INVITE NEW MAGISTRATE";
      break;

    default:
      headingText = "Magistrate Information";
      descriptionText = "View general information about magistrates.";
      buttonText = "LEARN MORE";
  }
  const courtFilter = [
    { value: "all", label: "ALL COURT TYPE" },
    ...COURT_TYPE,
  ];

  const columns = useMemo(
    () => createUserColumns(user?.role!, "all"),
    [user?.role]
  );

  return (
    <div className="bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-base font-bold">{headingText}</h2>
          <p className="text-black font-medium text-sm max-w-lg">
            {descriptionText}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[ROLES.DIRECTOR_MAGISTRATES].includes(user?.role as ROLES) && (
            <>
              <FilterDropdown
                triggerVariant="outline"
                itemVariant="outline"
                placeholder="ALL COURT TYPE"
                options={courtFilter}
                value={selectedCourt}
                onChange={handleCourtTypeChange}
              />
            </>
          )}
          <InviteUser
            trigger={
              <Button size={"medium"} className="h-11">
                {buttonText}
              </Button>
            }
          />
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
        <Input
          type="search"
          variant="ghost"
          autoComplete="off"
          data-form-type="other"
          placeholder="e.g Search Magistrate Name"
          className="pl-9 h-12 md:w-[100px] lg:w-[500px]"
        />
      </div>
      <DataTable
        columns={columns}
        loading={false}
        data={mockUsers}
      />
    </div>
  );
}
