import React, { useCallback, useMemo, useState, useContext, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { createUserColumns } from "./table-columns";
import { useAppSelector } from "@/hooks/redux";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { getOversight } from "@/lib/actions/user-management";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { MagistrateTypes, MAGISTERATE_TYPE, MAGISTERATE_TYPE2, COURT_TYPE, MAGISTERATE_STATUS, CaseTypes } from "@/types/files/case-type";
import { ROLES } from "@/types/auth";
import Pagination from "@/components/ui/pagination";
import { MagistrateContext } from "@/context/MagistrateContext";

export default function MagistratesTable() {
  const magistrateContext = useContext(MagistrateContext);
  const setTotalMagistrates = magistrateContext?.setTotalMagistrates || (() => { });
  const courtDivision = magistrateContext?.courtDivision || "";
  const { data: user } = useAppSelector((state) => state.profile);

  const [selectedMagisterate, setSelectedMagisterate] = useState<MagistrateTypes | "all">("all");
  const [selectedCourt, setSelectedCase] = useState<CaseTypes | "all">("all");
  const [status, setStatus] = useState<string | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const magisterateFilterOptions = [{ value: "all", label: "ALL MAGISTERATE TYPE" }, ...MAGISTERATE_TYPE];
  const magisterateFilterOptions2 = [{ value: "all", label: "ALL MAGISTERATE TYPE" }, ...MAGISTERATE_TYPE2];
  const courtTypeOptions = [{ value: "all", label: "ALL COURT TYPE" }, ...COURT_TYPE];
  const statusOptions = [{ value: "all", label: "ALL STATUS" }, ...MAGISTERATE_STATUS];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectedMagisterate = useCallback((value: string) => {
    setSelectedMagisterate(value as MagistrateTypes);
  }, []);

  const handleSelectedCaseType = useCallback((value: string) => {
    setSelectedCase(value as CaseTypes);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
  }, []);

  const [role] = useState<string>(() => {
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
    queryKey: [
      "magistrate-oversight",
      { searchQuery, courtDivision, selectedCourt, status, currentPage, selectedMagisterate, role, division_id: user?.court_division_id },
    ],
    queryFn: async () =>
      await getOversight({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        division_id: courtDivision,
        search: searchQuery,
        status: status === "all" ? "" : status,
        courtype: selectedCourt === "all" ? "" : selectedCourt,
        usertype: selectedMagisterate === "all" ? "" : selectedMagisterate,
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
      <div className="flex items-center justify-between">
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
          {user?.role === ROLES.CHIEF_JUDGE && (
            <FilterDropdown
              triggerVariant="outline"
              itemVariant="outline"
              placeholder="ALL MAGISTERATE TYPE"
              options={magisterateFilterOptions}
              value={selectedMagisterate}
              onChange={handleSelectedMagisterate}
            />
          )}

          {user?.role === ROLES.DIRECTOR_MAGISTRATE && (
            <>
              <FilterDropdown
                triggerVariant="outline"
                itemVariant="outline"
                placeholder="ALL MAGISTERATE TYPE"
                options={magisterateFilterOptions2}
                value={selectedMagisterate}
                onChange={handleSelectedMagisterate}
              />
              <FilterDropdown
                triggerVariant="outline"
                itemVariant="outline"
                placeholder="ALL CPURT TYPE"
                options={courtTypeOptions}
                value={selectedCourt}
                onChange={handleSelectedCaseType}
              />
              <FilterDropdown
                triggerVariant="outline"
                itemVariant="outline"
                placeholder="ALL STATUS"
                options={statusOptions}
                value={status}
                onChange={handleStatusChange}
              />
            </>
          )}
        </div>
      </div>

      <DataTable columns={columns} data={data?.data} loading={draftsLoading} />

      {data?.data?.length > 0 && (
        <div className="fixed bottom-0 container left-0 right-0 py-2">
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              total={data?.total_rows ?? 0}
              rowsPerPage={DEFAULT_PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
