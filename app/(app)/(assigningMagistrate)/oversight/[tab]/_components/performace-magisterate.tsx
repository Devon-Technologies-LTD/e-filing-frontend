import { DataTable } from "@/components/data-table";
import { useAppSelector } from "@/hooks/redux";
import React, { useCallback, useMemo, useState } from "react";
// import { mainColumns } from "./table-columns";
import { ROLES, USER_STATUS } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { getPerformance } from "@/lib/actions/user-management";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { createPerformanceColumns } from "./table-column-performace";
import Pagination from "@/components/ui/pagination";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Search } from "lucide-react";
import { COURT_TYPE, CaseTypes } from "@/types/files/case-type";

export interface IUsersColumn {
  id?: string;
  name: string;
  total: string;
  status: USER_STATUS;
  active?: string;
  reassigned?: string;
  close?: string;
  courtType?: string;
  resolutionTime?: string;
}

export default function PerformanceMagisterate() {
  const { data: user } = useAppSelector((state) => state.profile);

  const [selectedCourt, setSelectedCourt] = useState<CaseTypes | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const courtFilterOptions = [{ value: "all", label: "ALL COURT TYPE" }, ...COURT_TYPE];
  const handleCourtTypeChange = useCallback((value: string) => {
    setSelectedCourt(value as CaseTypes);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  // const courtFilterOptions = [{ value: "all", label: "ALL COURT TYPE" }, ...COURT_TYPE];
  const [role, setRole] = useState<string>(() => {
    switch (user?.role) {
      case ROLES.CHIEF_JUDGE:
        return "DIRECTOR_MAGISTRATE";
      case ROLES.DIRECTOR_MAGISTRATE:
        return "ASSIGNING_MAGISTRATE";
      case ROLES.ASSIGNING_MAGISTRATE:
        return "PRESIDING_MAGISTRATE";
      default:
        return "";
    }
  });

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: ["magistrate-performance", { searchQuery, currentPage, role, division_id: user?.court_division_id }],
    queryFn: async () =>
      await getPerformance({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        division_id: user?.court_division_id,
        search: searchQuery,
        usertype: role,
      }),
    staleTime: 50000,
  });

  const handleRowClick = (row: any) => {
    console.log(row);
  };
  const columns = useMemo(() => createPerformanceColumns(user?.role!, "all"), [user?.role]);

  return (
    <div className="bg-white h-screen overflow-hidden flex flex-col space-y-4">
      <div className="flex items-center justify-between ">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
          <Input
            type="search"
            variant="ghost"
            autoComplete="off"
            placeholder="Search Magistrate Name"
            className="pl-9 h-12 md:w-[100px] lg:w-[400px]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-3">
          {[ROLES.DIRECTOR_MAGISTRATE, ROLES.CHIEF_JUDGE].includes(user?.role as ROLES) && (
            <FilterDropdown
              triggerVariant="outline"
              itemVariant="outline"
              placeholder="SELECT COURT TYPE"
              options={courtFilterOptions}
              value={selectedCourt}
              onChange={handleCourtTypeChange}
            />
          )}
        </div>
      </div>
      <DataTable
        onRowClick={handleRowClick}
        columns={columns}
        loading={false}
        data={data?.data}
      />

      {data?.data?.length > 0 && (
        <div className="fixed bottom-0 container left-0 right-0">
          <div className="flex justify-center">
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
      )}
    </div>
  );
}

// import { DataTable } from "@/components/data-table";
// import { useAppSelector } from "@/hooks/redux";
// import React, { useMemo, useState } from "react";
// // import { mainColumns } from "./table-columns";
// import { USER_STATUS } from "@/types/auth";

// export interface IUsersColumn {
//   id?: string;
//   name: string;
//   total: string;
//   status: USER_STATUS;
//   active?: string;
//   reassigned?: string;
//   close?: string;
//   courtType?: string;
//   resolutionTime?: string;
// }

// export const mockUsers: IUsersColumn[] = [
//   {
//     id: "1",
//     name: "Bayo Adetola",
//     total: "1000 cases",
//     status: USER_STATUS.ACTIVE,
//     active: "100 case",
//     close: "20 cases",
//     reassigned: "20 cases",
//     courtType: "Magistrate Court",
//     resolutionTime: "Magistrate Court",
//   },
//   {
//     id: "1",
//     name: "Bayo Adetola",
//     total: "3000",
//     status: USER_STATUS.INACTIVE,
//     active: "100 case",
//     close: "20 cases",
//     reassigned: "20 cases",
//     courtType: "Family Court",
//     resolutionTime: "Family Court",
//   },
// ];

// export default function PerformanceMagisterate() {
//   const { data: user } = useAppSelector((state) => state.profile);
//   const handleRowClick = (row: any) => {
//     console.log(row);
//   };

//   // const columns = useMemo(
//   //   () => mainColumns(user?.role!, "performance"),
//   //   [user?.role]
//   // );
//   return (
//     <div className="bg-white  space-y-6">
//       {/* <DataTable
//         onRowClick={handleRowClick}
//         columns={columns}
//         loading={false}
//         data={mockUsers}
//       /> */}
//     </div>
//   );
// }
