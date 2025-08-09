"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { breakdown } from "@/lib/actions/user-management";
import { cn, formatNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { Loader2 } from "lucide-react"; // Loading icon

interface DivisionData {
  division_name: string;
  case_count: number;
  cost_accured: number;
}

interface StatBreakdownProps {
  metric?: { total: number; difference: number };
  metricKey?: string;
  value?: string;
  type?: string;
  variant?: string;
  description?: string;
}

export function StatBreakdown({
  metric,
  metricKey,
  type,
  value,
  variant = "default",
}: StatBreakdownProps) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["CaseBreakdown", metricKey ?? "", type ?? ""],
    queryFn: async (): Promise<DivisionData[]> => {
      if (!metricKey) return [];
      try {
        const response = await breakdown(type ?? "", metricKey ?? "");
        return response || [];
      } catch (err) {
        console.error("Error fetching case breakdown:", err);
        return [];
      }
    },
    staleTime: 100000,
    enabled: !!metricKey,
  });
  const bgColors: Record<string, string> = {
    default: "bg-gray-100",
    primary: "bg-blue-100",
    secondary: "bg-green-100",
  };

  return (
    <div className="space-y-8 flex flex-col max-h-full">
      <div className="max-w-lg">
        <h2 className="text-sm font-bold">{value}</h2>
      </div>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-4xl text-app-primary font-semibold">
            {isLoading ? (
              <Loader2 className="animate-spin h-8 w-8 text-app-primary" />
            ) : (
              <CountUp start={0} end={metric?.total || 0} separator="," />
            )}
          </p>
          <div className="text-sm">
            {"↑"}
            <span className="font-medium">
              {formatNumber(Number(metric?.difference) || 0)}
            </span>{" "}
            in the last year
          </div>
        </div>

        <div>
          {/* <AllCasesFilter /> */}
        </div>
      </div>

      <div className="rounded-md flex-grow overflow-auto h-fit">
        <Table>

          <TableHeader>
            <TableRow
              className={cn(
                "font-bold border-none text-base",
                bgColors[variant] || bgColors.default
              )}>
              <TableHead className="font-bold py-4">{(type == "magistrate") ? "DIVISIONS" : "DIVISIONS"} </TableHead>
              <TableHead className="text-right uppercase font-bold">{(type == "magistrate") ? "NUMBER OF MAGISTERATE" : value}</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <div className="flex justify-center  items-center py-6">
              <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
              <span className="ml-2 text-gray-500">Loading cases...</span>
            </div>
          ) : (

            <TableBody>
              {(data || []).length > 0 ? (
                (data || []).map((division) => (
                  <TableRow key={division.division_name}>
                    <TableCell className="font-semibold text-sm py-5">
                      {division.division_name}
                    </TableCell>
                    <TableCell className="font-semibold text-sm py-5 text-right">
                      {formatNumber(division.case_count ?? division.cost_accured)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-6 text-gray-500">
                    No case data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}

        </Table>
      </div>
    </div>
  );
}
