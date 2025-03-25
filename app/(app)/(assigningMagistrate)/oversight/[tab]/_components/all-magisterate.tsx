import React, { useCallback, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { createUserColumns } from "./table-columns";
import { useAppSelector } from "@/hooks/redux";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { getOversight } from "@/lib/actions/user-management";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { CaseTypes, COURT_TYPE } from "@/types/files/case-type";
import { ROLES } from "@/types/auth";
import Pagination from "@/components/ui/pagination";
import { useContext, useEffect } from "react";
import { MagistrateContext } from "@/context/MagistrateContext";

export default function MagistratesTable() {
  const magistrateContext = useContext(MagistrateContext);
  const setTotalMagistrates = magistrateContext?.setTotalMagistrates || (() => { });

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

  const [role, setRole] = useState<string>(() => {
    switch (user?.role) {
      // case ROLES.CHIEF_JUDGE:
      //   return "DIRECTOR_MAGISTRATE";
      // case ROLES.DIRECTOR_MAGISTRATE:
      //   return "ASSIGNING_MAGISTRATE";
      case ROLES.ASSIGNING_MAGISTRATE:
        return "PRESIDING_MAGISTRATE";
      default:
        return "";
    }
  });

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: ["magistrate-oversight", { searchQuery, currentPage, role, division_id: user?.court_division_id }],
    queryFn: async () =>
      await getOversight({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        division_id: user?.court_division_id,
        search: searchQuery,
        usertype: role,
      }),
    staleTime: 50000,
  });

  useEffect(() => {
    if (data?.total_rows !== undefined) {
      setTotalMagistrates(data.total_rows);
    }
  }, [data, setTotalMagistrates]);

  const columns = useMemo(() => createUserColumns(user?.role!, "all"), [user?.role]);
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

          <Select>
            <SelectTrigger variant="outline" className="h-11">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">ACTIVE MAGISTRATE</SelectItem>
              <SelectItem value="INACTIVE">INACTIVE MAGISTRATE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <div className="flex-1 overflow-auto p-4"> */}
      <DataTable columns={columns} data={data?.data} loading={draftsLoading} />
      {/* </div> */}
      {data?.data?.length > 0 && (
        <div className="fixed bottom-0 container left-0 right-0 py-2">
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
