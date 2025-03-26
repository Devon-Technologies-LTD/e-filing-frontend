
"use client";

import {
  MainColumns,
  UnassignedColumns,
  UnderReviewColumns,
} from "@/app/(app)/cases/[tab]/_components/table-columns";
import { DataTable } from "@/components/data-table";
import { TCaseFilterType } from "@/types/case";
import { useParams, useRouter } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import Pagination from "@/components/ui/pagination";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/case-file";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { getStatusByTab, getStatusByTab2 } from "@/lib/utils";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { Search } from "lucide-react";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const formattedStartDate = selectedRange?.from ? format(selectedRange.from, "yyyy-MM-dd") : "";
  const formattedEndDate = selectedRange?.to ? format(selectedRange.to, "yyyy-MM-dd") : "";
  const handleApplyFilter = () => {
    refetch(); // Manually trigger query refresh
    setIsOpen(false); // Close popover
  };

  const caseFilter = useMemo(() => [{ value: "all", label: "ALL CASE TYPE" }, ...CASE_TYPES2], []);


  let status = {
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
    status: getStatusByTab2(tab),
    casetype: selectedCase === "all" ? null : selectedCase,
    role: user?.role,
    year: selectedYear === "All Year" ? "" : selectedYear,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    assignee_id: user?.id,
    is_hearing: false,
    request_reassignment: false,
  };

  switch (user?.role) {
    case ROLES.CHIEF_JUDGE:
    case ROLES.DIRECTOR_MAGISTRATE:
      break;
    case ROLES.ASSIGNING_MAGISTRATE:
      status = { ...status, is_hearing: true, status: [] };
    case ROLES.CENTRAL_REGISTRAR:
      if (tab === "under-review") {
        status = { ...status, assignee_id: "", is_hearing: false };
      } else if (tab === "approved-review") {
        status = { ...status, status: [], assignee_id: "", is_hearing: true };
      } else {
        status = { ...status, assignee_id: "",};
      }
      break;
    case ROLES.PRESIDING_MAGISTRATE:
      if (tab === "submitted") {
        status = { ...status, request_reassignment: true, status: [] };
      } else if (tab === "concluded") {
        status = { ...status };
      } else {
        status = { ...status, status: [], is_hearing: true, };
      }
      break;
    default:
      status = { ...status, assignee_id: "" };
  }

  const { data, isLoading: draftsLoading, refetch } = useQuery({
    queryKey: [
      "get_cases",
      tab,
      currentPage,
      selectedCase,
      selectedYear,
      formattedStartDate,
      formattedEndDate,
      user?.role
    ],
    queryFn: () => getCaseFiles(status),
    staleTime: 50000,
    refetchInterval: 10000,
  });

  // const { data, isLoading: draftsLoading, refetch } = useQuery({
  //   queryKey: ["get_cases", tab, currentPage, selectedCase, selectedYear, formattedStartDate, formattedEndDate, user?.role],
  //   queryFn: () =>
  //     getCaseFiles({
  //       page: currentPage,
  //       size: DEFAULT_PAGE_SIZE,
  //       status: getStatusByTab2(tab),
  //       casetype: selectedCase === "all" ? null : selectedCase,
  //       role: user?.role,
  //       year: selectedYear === "All Year" ? "" : selectedYear,
  //       start_date: formattedStartDate,
  //       end_date: formattedEndDate,
  //       isHearing: (tab == "case") ? true : false,
  //     }),
  //   staleTime: 50000,
  //   refetchInterval: 10000,
  // });

  const getColumns = useMemo(() => {
    switch (tab) {
      case "unassigned":
        return UnassignedColumns;
      case "under-review":
      case "approved-review":
      case "denied-review":
        return UnderReviewColumns;
      default:
        return MainColumns;
    }
  }, [tab]);

  const handleRowClick = (row: any) => {
    const path =
      user?.role === ROLES.CENTRAL_REGISTRAR
        ? `/cases/reviews/${encodeURIComponent(row.id)}`
        : `/cases/view/${encodeURIComponent(row.id)}`;
    router.push(path);
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
              className="pl-9 h-12 md:w-[100px] lg:w-[400px]"
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



// "use client";


// import {
//   MainColumns,
//   UnassignedColumns,
//   UnderReviewColumns,
// } from "@/app/(app)/cases/[tab]/_components/table-columns";
// import { DataTable } from "@/components/data-table";
// import { TCaseFilterType } from "@/types/case";
// import { useParams } from "next/navigation";
// import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
// import Pagination from "@/components/ui/pagination";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getCaseFiles } from "@/lib/actions/case-file";
// import { DEFAULT_PAGE_SIZE } from "@/constants";
// import { getStatusByTab } from "@/lib/utils";
// import { useRouter } from "next/navigation";
// import { CaseTypes } from "@/types/files/case-type";
// import { useAppSelector } from "@//hooks/redux";
// import { ROLES } from "@/types/auth";
// import { Search } from "lucide-react";
// import { FilterDropdown } from "@/components/ui/filter-dropdown";
// import { CASE_TYPES, CaseTypes } from "@/types/files/case-type";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";


// export default function FilteredCases() {
//   const params = useParams();
//   const tab = params.tab as TCaseFilterType;
//   const router = useRouter();
//   const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
//   const { data: user } = useAppSelector((state) => state.profile);
//   const [currentPage, setCurrentPage] = useState(1);
//   const currentYear = new Date().getFullYear();
//   const [selectedYear, setSelectedYear] = React.useState<string>("All Year");
//   const years = Array.from(
//     { length: currentYear - 2015 + 1 },
//     (_, i) => currentYear - i
//   );
//   const allYears = ["All year", ...years];

//   const handleCaseTypeChange = (value: string) => {
//     setSelectedCase(value as CaseTypes);
//   };
//   const caseFilter = [{ value: "all", label: "ALL CASE TYPE" }, ...CASE_TYPES];
//   const { data, isLoading: draftsLoading } = useQuery({
//     queryKey: [
//       "get_cases",
//       {
//         search: "",
//         currentPage,
//         status: getStatusByTab(tab),
//         selectedCase,
//       },
//     ],
//     queryFn: async () => {
//       return await getCaseFiles({
//         page: currentPage,
//         size: DEFAULT_PAGE_SIZE,
//         status: getStatusByTab(tab),
//         casetype: selectedCase === "all" ? null : selectedCase,
//         role: user?.role,
//         end_date: "",
//         start_date: "",
//         year: "",
//       });
//     },
//     staleTime: 50000,
//     refetchInterval: 10000,
//   });
//   const getColumns = () => {
//     switch (tab) {
//       case "unassigned":
//         return UnassignedColumns;
//       case "under-review":
//       case "approved-review":
//       case "denied-review":
//         return UnderReviewColumns;
//       default:
//         return MainColumns;
//     }
//   };
//   const columns = getColumns();
//   const handleRowClick = (row: any) => {
//     if (user?.role === ROLES.CENTRAL_REGISTRAR) {
//       router.push(`/cases/reviews/${encodeURIComponent(row.id)}`);
//     } else {
//       router.push(`/cases/view/${encodeURIComponent(row.id)}`);
//     }
//   };
//   return (
//     <div className="">
//       <div className="bg-white overflow-auto space-y-6 max-h-[calc(100vh-220px)]">
//         <div className="flex items-center justify-between">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
//             <Input
//               type="search"
//               variant="ghost"
//               autoComplete="off"
//               data-form-type="other"
//               placeholder="e.g CV/Wuse/233456789/2024, "
//               className="pl-9 h-12 md:w-[100px] lg:w-[400px]"
//             />
//           </div>

//           <section className="flex gap-3">
//             <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
//               <SelectTrigger
//                 className={cn(
//                   "flex items-center gap-2 h-11 border-app-tertiary border-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
//                 )}
//                 aria-label="Select account"
//               >
//                 <SelectValue placeholder="Select Year">
//                   <span
//                     className={cn("ml-2 uppercase text-neutral-600 font-bold text-xs")}
//                   >
//                     YEAR FILLED: {selectedYear}
//                   </span>
//                 </SelectValue>
//               </SelectTrigger>
//               <SelectContent className="max-h-52">
//                 {allYears.map((year) => (
//                   <SelectItem
//                     variant="outline"
//                     className="uppercase min-w-40 "
//                     key={year}
//                     value={year.toString()}
//                   >
//                     {year}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <FilterDropdown
//               triggerVariant="outline"
//               itemVariant="outline"
//               placeholder="SELECT CASE TYPE"
//               options={caseFilter}
//               value={selectedCase}
//               onChange={handleCaseTypeChange}
//             />
//           </section>
//         </div>
//         <DataTable
//           onRowClick={handleRowClick}
//           columns={columns}
//           loading={draftsLoading}
//           data={data?.data}
//         />
//       </div>
//       {data?.data?.length > 0 && (
//         <div className="fixed bottom-0 container left-0 right-0 py-2">
//           <div className="flex justify-center">
//             <Pagination
//               currentPage={currentPage}
//               total={data?.total_rows ?? 0}
//               rowsPerPage={DEFAULT_PAGE_SIZE}
//               onPageChange={(page) => {
//                 setCurrentPage(page);
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
