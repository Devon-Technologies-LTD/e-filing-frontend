import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { CaseTypes, COURT_TYPE } from "@/types/files/case-type";
import React, { useMemo, useState } from "react";
import { createUserColumns, IUsersColumn } from "./table-column";
import InviteUser from "./invite-user";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/ui/pagination";
import { getUserManagement } from "@/lib/actions/user-management";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react";

export default function AllMagistrates() {
  const { data: user } = useAppSelector((state) => state.profile);
  const [currentPage, setCurrentPage] = useState(1);
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
    case ROLES.DIRECTOR_MAGISTRATE:
      headingText = "All Assigning Magistrates";
      descriptionText =
        "View and manage all assigning magistrates responsible for case allocations. Monitor their activity and administrative roles across divisions";
      buttonText = "INVITE ASSIGNING MAGISTRATE";
      break;
    case ROLES.ASSIGNING_MAGISTRATE:
      headingText = "Presiding Magistrates";
      descriptionText = "View and manage all presiding magistrates responsible for presiding over cases.  Monitor their activity, case request anf re-assignment request across different districts";
      buttonText = "INVITE PRESIDING MAGISTRATE";
      break;
    default:
      headingText = "Magistrate Information";
      descriptionText = "View general information about magistrates.";
      buttonText = "INVITE NEW MAGISTRATE";
  }
  const courtFilter = [
    { value: "all", label: "ALL COURT TYPE" },
    ...COURT_TYPE,
  ];

  const columns = useMemo(
    () => createUserColumns(user?.role!, "all"),
    [user?.role]
  );

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: ["userManagement", currentPage],
    queryFn: async () => {
      return await getUserManagement({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
      });
    },
    staleTime: 100000, // Move this inside the object correctly
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((magistrate: IUsersColumn) => {
      // Exclude "pending" records
      if (magistrate.status.toLowerCase() === "pending") return false;
      const searchLower = searchTerm.toLowerCase();
      return (
        magistrate.first_name.toLowerCase().includes(searchLower) ||
        magistrate.last_name.toLowerCase().includes(searchLower) ||
        magistrate.email.toLowerCase().includes(searchLower)
      );
    });
  }, [data, searchTerm]);



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
          {[ROLES.DIRECTOR_MAGISTRATE, ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[600px] w-full p-4">
        <DataTable columns={columns} loading={draftsLoading} data={filteredData} />
      </ScrollArea>
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
