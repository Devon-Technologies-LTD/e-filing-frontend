import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { CaseTypes, COURT_TYPE } from "@/types/files/case-type";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { createUserColumns, IUsersColumn } from "./table-column";
import InviteUser from "./invite-user";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/ui/pagination";
import { getPendingUser } from "@/lib/actions/user-management";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PendingInvites() {
  const { data: user } = useAppSelector((state) => state.profile);
  const [selectedCourt, setSelectedCourt] = useState<CaseTypes | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCourtTypeChange = (value: string) => {
    setSelectedCourt(value as CaseTypes);
  };

  const handleRowClick = (row: any) => {
    console.log(row);
  };

  let headingText, descriptionText, buttonText;
  switch (user?.role) {
    case ROLES.CHIEF_JUDGE:
      headingText = "Pending Invitations";
      descriptionText =
        "Review and manage pending invitations sent to magistrates. Track invitation statuses and resend or revoke invitations as needed.";
      buttonText = "INVITE NEW DIRECTOR MAGISTRATE";
      break;
    case ROLES.DIRECTOR_MAGISTRATES:
      headingText = "All Assigning Magistrates";
      descriptionText =
        "Review and manage pending invitations sent to magistrates. Track invitation statuses and resend or revoke invitations as needed.";
      buttonText = "INVITE NEW MAGISTRATE";
      break;
    case ROLES.ASSIGNING_MAGISTRATES:
      headingText = "Magistrate Information";
      descriptionText =
        "Review and manage pending invitations sent to magistrates and central registrars. Track invitation statuses and resend or revoke invitations as needed.";
      buttonText = "LEARN MORE";
      break;
    default:
      headingText = "Magistrate Information";
      descriptionText =
        "Review and manage pending invitations sent to magistrates and central registrars. Track invitation statuses and resend or revoke invitations as needed.";
      buttonText = "INVITE NEW MAGISTRATE";
  }

  const courtFilter = [{ value: "all", label: "ALL COURT TYPE" }, ...COURT_TYPE];

  const columns = useMemo(() => {
    if (!user?.role) return [];
    return createUserColumns(user.role, "pending");
  }, [user?.role]);

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: ["pendingUsers"],
    queryFn: async () => {
      console.log("Fetching user management data...");
      return await getPendingUser();
    },
    staleTime: 100000,
  });

  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((magistrate: IUsersColumn) => {
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
          {[ROLES.DIRECTOR_MAGISTRATES].includes(user?.role as ROLES) && (
            <FilterDropdown
              triggerVariant="outline"
              itemVariant="outline"
              placeholder="ALL COURT TYPE"
              options={courtFilter}
              value={selectedCourt}
              onChange={handleCourtTypeChange}
            />
          )}
          {/* <InviteUser
            trigger={
              <Button size={"medium"} className="h-11">
                {buttonText}
              </Button>
            }
          /> */}
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
        <DataTable
          onRowClick={handleRowClick}
          columns={columns}
          loading={draftsLoading}
          data={filteredData}
        />
      </ScrollArea>

    </div>
  );
}
