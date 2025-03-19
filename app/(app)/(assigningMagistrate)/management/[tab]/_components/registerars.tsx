import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { CaseTypes, COURT_TYPE } from "@/types/files/case-type";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { createUserColumns, IUsersColumn } from "./table-column";
import InviteUser from "./invite-user";
import { useQuery } from "@tanstack/react-query";
import { getUserManagement } from "@/lib/actions/user-management";
import { DEFAULT_PAGE_SIZE } from "@/constants";


export default function Registerars() {
  const { data: user } = useAppSelector((state) => state.profile);
  const [searchTerm] = useState("");

  let headingText, descriptionText, buttonText;
  switch (user?.role) {
    case ROLES.ASSIGNING_MAGISTRATE:
      headingText = "Central Registerar";
      descriptionText =
        "Assign a Central Registrar to review and validate filed cases before they proceed to the next stage.";
      buttonText = "INVITE NEW Central Registrar";
      break;
  }

  const columns = useMemo(
    () => createUserColumns(user?.role!, "all"),
    [user?.role]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: ["central", currentPage],
    queryFn: async () => {
      return await getUserManagement({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        role: "CENTRAL_REGISTRAR",
      });
    },
    staleTime: 100000, // Move this inside the object correctly
  });

  // const filteredData = useMemo(() => {
  //   if (!data?.data) return [];
  //   return data.data.filter((magistrate: IUsersColumn) => {
  //     if (magistrate.role != ROLES.CENTRAL_REGISTRAR) return false;
  //     const searchLower = searchTerm.toLowerCase();
  //     return (
  //       magistrate.first_name.toLowerCase().includes(searchLower) ||
  //       magistrate.last_name.toLowerCase().includes(searchLower) ||
  //       magistrate.email.toLowerCase().includes(searchLower)
  //     );
  //   });
  // }, [data, searchTerm]);


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
          <InviteUser
            tab="central"
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
        loading={draftsLoading}
        data={data?.data}
      />
    </div>
  );
}
