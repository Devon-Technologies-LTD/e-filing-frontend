"use client";
import { AllCasesFilter } from "@/components/filters/all-cases";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatNumber } from "@/lib/utils";
import CountUp from "react-countup";

interface Division {
  name: string;
  cases: number;
}

interface StatBreakdownProps {
  title: string;
  type: "case" | "magistrate" | "finances";
  value: number;
  change: number;
  description: string;
  divisions: Division[];
  variant?: string;
}

export function StatBreakdown({
  title,
  value,
  change,
  description,
  divisions,
  type,
  variant = "default",
}: StatBreakdownProps) {
  const bgColors: any = {
    total: "bg-neutral-200",
    active: "bg-green-50",
    activedir: "bg-sky-50",
    unassigned: "bg-orange-50",
    reassigned: "bg-red-50",
    concluded: "bg-purple-50",
  };

  let tableHeader = "";

  if (type === "magistrate") {
    tableHeader = "NUMBER OF MAGISTRATES";
  } else if (type === "case") {
    tableHeader = "NUMBER OF CASES";
  } else if (type === "finances") {
    tableHeader = "COST ACCRUED";
  }

  return (
    <div className="space-y-8 flex flex-col max-h-full">
      <div className="max-w-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-base font-medium">{description}</p>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-4xl text-app-primary font-semibold">
            <CountUp start={0} end={value} separator="," />
          </p>
          <div className="text-sm">
            {change > 0 && "↑"}
            {change < 0 && "↓"}{" "}
            <span className="font-medium">
              {formatNumber(Math.abs(change))}
            </span>{" "}
            in the last year
          </div>
        </div>

        <div>
          <AllCasesFilter />
        </div>
      </div>

      <div className="rounded-md flex-grow overflow-auto  h-fit">
        <Table>
          <TableHeader>
            <TableRow
              className={cn(
                "font-bold border-none text-base",
                bgColors[variant]
              )}
            >
              <TableHead className="font-bold py-4 ">DIVISIONS</TableHead>
              <TableHead className="text-right font-bold">
                {tableHeader}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {divisions.map((division) => (
              <TableRow key={division.name}>
                <TableCell className="font-semibold text-sm py-5">
                  {division.name}
                </TableCell>
                <TableCell className="font-semibold text-sm py-5 text-right">
                  {formatNumber(division.cases)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
