"use client";

import {
  createUserColumns,
  UnassignedColumns,
  UnderReviewColumns,
} from "@/app/(app)/cases/[tab]/_components/table-columns";
import { DataTable } from "@/components/data-table";
import { TCaseFilterType } from "@/types/case";
import { useParams, useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/case-file";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { getExcludedStatus, getStatusByTab2 } from "@/lib/utils";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { Search } from "lucide-react";
import { CASE_TYPES, CASE_TYPES2, CaseTypes } from "@/types/files/case-type";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as TCaseFilterType;
  const router = useRouter();
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const { data: user } = useAppSelector((state) => state.profile);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<string>("All Year");
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const formattedStartDate = selectedRange?.from
    ? format(selectedRange.from, "yyyy-MM-dd")
    : "";
  const formattedEndDate = selectedRange?.to
    ? format(selectedRange.to, "yyyy-MM-dd")
    : "";
  const handleApplyFilter = () => {
    refetch();
    setIsOpen(false);
  };
  const [searchTerm, setSearchTerm] = useState<string>("");

  const caseFilter = useMemo(
    () => [{ value: "all", label: "ALL CASE TYPE" }, ...CASE_TYPES2],
    []
  );
  let status = {
    status: getStatusByTab2(tab),
    casetype: selectedCase === "all" ? null : selectedCase,
    role: user?.role,
    year: selectedYear === "All Year" ? "" : selectedYear,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    assignee_id: user?.id,
    is_hearing: false,
    request_reassignment: false,
    is_active: false,
    exclude_status: getExcludedStatus(tab),
    case_name: searchTerm,
    review_status: ""
  };
  // [CaseStatus.Draft, CaseStatus.JudgementDelivered, CaseStatus.Denied, CaseStatus.StruckOut]

  switch (user?.role) {
    case ROLES.DIRECTOR_MAGISTRATE:
      if (tab === "submitted") {
        status = {
          ...status, request_reassignment: true, status: [], assignee_id: "",
        };
      } else if (tab === "assigned") {
        status = { ...status, status: [], is_active: true };
      } else {
        status = { ...status, assignee_id: "" };
      }
      break;
    case ROLES.ASSIGNING_MAGISTRATE:
      if (tab === "concluded") {
        status = { ...status, assignee_id: "" };
      } else if (tab === "case") {
        status = { ...status, status: [] };
      } else {
        status = { ...status, status: [], is_active: true };
      }
      break;
    case ROLES.CENTRAL_REGISTRAR:
      if (tab === "under-review") {
        status = { ...status, status: [], "review_status": "under review", exclude_status: [], assignee_id: "" };
      } else if (tab === "approved-review") {
        status = { ...status, status: [], "review_status": "approved", exclude_status: [], assignee_id: "" };
      } else {
        status = { ...status, status: [], "review_status": "denied", exclude_status: [], assignee_id: "" };
      }
      break;
    case ROLES.PRESIDING_MAGISTRATE:
      if (tab === "assigned") {
        status = { ...status, status: [] };
      } else if (tab === "concluded") {
        status = { ...status };
      } else if (tab === "submitted") {
        status = {
          ...status,
          assignee_id: "",
          status: [],
          request_reassignment: true,
        };
      } else {
        status = { ...status, status: [], is_active: true };
      }
      break;
    case ROLES.USER:
      if (tab === "active") {
        status = { ...status, is_active: true, status: [], assignee_id: "" };
      } else if (tab === "recent") {
        status = {
          ...status,
          assignee_id: "",
          status: [],
        };
      } else {
        status = { ...status, assignee_id: "" };
      }
      break;
    case ROLES.LAWYER:
      if (tab === "active") {
        status = { ...status, is_active: true, status: [] };
      } else if (tab === "recent") {
        status = { ...status, assignee_id: "", status: [] };
      } else {
        status = { ...status, assignee_id: "" };
      }
      break;
    default:
      status = { ...status, assignee_id: "" };
  }
  const {
    data,
    isLoading: draftsLoading,
    refetch,
  } = useQuery({
    queryKey: ["get_cases", { user: user?.id, tab, selectedCase, currentPage, formattedStartDate, formattedEndDate, searchTerm }],
    queryFn: () => getCaseFiles(status, currentPage, DEFAULT_PAGE_SIZE),
    staleTime: 50000,
    refetchInterval: 10000,
  });

  const getColumns = useMemo(() => {
    switch (tab) {
      case "unassigned":
        return UnassignedColumns;
      case "under-review":
      case "approved-review":
      case "denied-review":
        return UnderReviewColumns;
      default:
        return createUserColumns(user?.role!, "all")
    }
  }, [tab]);

  const handleRowClick = (row: any) => {
    const path =
      user?.role === ROLES.CENTRAL_REGISTRAR
        ? `/cases/reviews/${encodeURIComponent(row.id)}`
        : `/cases/view/${encodeURIComponent(row.id)}`;
    router.push(path);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // ✅ Updates state correctly
  };

  return (
    <div className="">
      <div className="bg-white overflow-auto space-y-6 max-h-[calc(100vh-220px)]">
        <div className="flex items-center justify-between">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
            <Input
              type="search"
              variant="ghost"
              autoComplete="off"
              placeholder="e.g CV/WZ2/001e/Year"
              className="pl-9 h-12"
              value={searchTerm} // ✅ Now correctly bound
              onChange={handleSearchChange} // ✅ Updates search term
            />
          </div>

          {/* Filters */}
          <section className="flex gap-3">
            {/* Date Range Picker */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 border-app-tertiary border-2"
                >
                  {formattedStartDate && formattedEndDate
                    ? `${formattedStartDate} - ${formattedEndDate}`
                    : "FILED ON : MOST RECENT"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 rounded-xl shadow-lg bg-white w-72">
                <Calendar
                  mode="range"
                  selected={selectedRange}
                  onSelect={setSelectedRange}
                  numberOfMonths={1}
                  className="rounded-lg border border-gray-200 p-2"
                />
                <div className="flex justify-end mt-3">
                  <Button
                    className="bg-app-primary text-white px-4 py-2 rounded-md"
                    onClick={handleApplyFilter}
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Case Type Filter */}
            <Select
              onValueChange={(value) =>
                setSelectedCase(value as "all" | CaseTypes)
              }
              value={selectedCase}
            >
              <SelectTrigger className="h-11" variant="outline">
                <SelectValue placeholder="SELECT CASE TYPE" />
              </SelectTrigger>
              <SelectContent>
                {caseFilter.map((option) => (
                  <SelectItem
                    className="min-w-40"
                    variant="outline"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        </div>

        {/* Data Table */}
        <DataTable
          onRowClick={handleRowClick}
          columns={getColumns}
          loading={draftsLoading}
          data={data?.data}
        />
      </div>

      {/* Pagination */}
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
