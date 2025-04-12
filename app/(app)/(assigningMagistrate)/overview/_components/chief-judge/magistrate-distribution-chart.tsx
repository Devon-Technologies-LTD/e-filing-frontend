import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { AllCasesFilter } from "@/components/filters/all-cases";
import { FilterDropdown } from "@/components/ui/filter-dropdown";

interface CaseDistributionBarChartProps {
  caseData: { division_name: string; case_count: number }[];
  header: string;
}

export default function MagistrateDistributionBarChart({
  caseData = [],
  header,
}: CaseDistributionBarChartProps) {
  const [selectedCase, setSelectedCase] = useState("all");
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value);
  };

  const caseFilter = [{ value: "all", label: "ALL MAGISTRATES" }];

  // Clean the caseData
  const chartData = Array.isArray(caseData)
    ? caseData
      .filter((item) => item.division_name?.trim() !== "")
      .map((item) => ({
        name: item.division_name.trim(),
        count: item.case_count,
      }))
    : [];

  return (
    <div className="space-y-4">
      <div className="bg-white border-b border-zinc-200 py-6">
        <div className="container flex items-center justify-between">
          <p className="font-bold">{header}</p>
          <section className="flex gap-2">
            <FilterDropdown
              triggerVariant="outline"
              itemVariant="outline"
              placeholder="SELECT CASE TYPE"
              options={caseFilter}
              value={selectedCase}
              onChange={handleCaseTypeChange}
            />
            <AllCasesFilter />
          </section>
        </div>
      </div>
      <section className="container py-4">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              cursor={false}
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="bg-white border border-zinc-300 rounded px-3 py-2 text-sm shadow">
                    <p className="font-semibold">{payload[0].payload.name}</p>
                    <p>Cases: {payload[0].payload.count}</p>
                  </div>
                ) : null
              }
            />
            <Legend />
            <Bar dataKey="count" fill="#EB963F" barSize={60} minPointSize={10} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-center text-zinc-500 mt-2">Case Distribution by Division</p>
      </section>
    </div>
  );
}

