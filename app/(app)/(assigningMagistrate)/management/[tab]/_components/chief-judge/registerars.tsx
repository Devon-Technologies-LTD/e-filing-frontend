import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { CaseTypes, COURT_TYPE } from "@/types/files/case-type";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { createUserColumns } from "./table-column";
import InviteUser from "./invite-user";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/ui/pagination";
import { getUserManagement } from "@/lib/actions/user-management";
import { CaseStatus, DEFAULT_PAGE_SIZE } from "@/constants";


export default function Registerars() {
  const { data: user } = useAppSelector((state) => state.profile);
  const [selectedCourt, setSelectedCourt] = useState<CaseTypes | "all">("all");
  const handleCourtTypeChange = (value: string) => {
    setSelectedCourt(value as CaseTypes);
  };
  let headingText, descriptionText, buttonText;
  switch (user?.role) {
    case ROLES.ASSIGNING_MAGISTRATES:
      headingText = "Central Registerar";
      descriptionText =
        "Assign a Central Registrar to review and validate filed cases before they proceed to the next stage.";
      buttonText = "INVITE NEW MAGISTRATE";
      break;
  }
  const courtFilter = [
    { value: "all", label: "ALL COURT TYPE" },
    ...COURT_TYPE,
  ];

  const columns = useMemo(
    () => createUserColumns(user?.role!, "all"),
    [user?.role]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: [
      "get_cases",
      {
        search: "",
        currentPage,
      },
    ],
    queryFn: async () => {
      return await getUserManagement();
    },
    staleTime: 50000,
  });

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
          {[ROLES.DIRECTOR_MAGISTRATES, ROLES.ASSIGNING_MAGISTRATES].includes(user?.role as ROLES) && (
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
        data={data?.data}
      />
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          total={data?.total_rows ?? 0}
          rowsPerPage={DEFAULT_PAGE_SIZE}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
}
