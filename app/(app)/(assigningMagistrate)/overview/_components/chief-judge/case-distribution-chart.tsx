import React from "react";
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
import { YearSelector } from "@/components/year-selector";
import { AllCasesFilter, AllFiledCasesFilter } from "@/components/filters/all-cases";

interface CaseDistributionBarChartProps {
  caseData: { division_name: string; case_count: number }[];
  heading: string;
  footer: string;
}

// Custom tooltip that shows only when active
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const { name, count } = payload[0].payload;
    return (
      <div className="bg-white border border-zinc-300 rounded px-3 py-2 text-sm shadow">
        <p className="font-semibold">{name}</p>
        <p>Cases: {count}</p>
      </div>
    );
  }
  return null;
};

export default function CaseDistributionBarChart({
  caseData = [],
  heading,
  footer,
}: CaseDistributionBarChartProps) {
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

       <div className="bg-white border-b border-zinc-200 py-4 px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-lg font-bold">{heading}</p>
          <section className="flex xs:flex-wrap gap-2">
            <YearSelector />
            <AllFiledCasesFilter />
            <AllCasesFilter />
          </section>
        </div>
      </div>

      <section className="px-4 md:px-6 py-4">
        <div className="w-full h-[300px] md:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Legend />
              <Bar
                dataKey="count"
                barSize={40}
                fill="#EB963F"
                minPointSize={10}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-center text-zinc-500 mt-3">{footer}</p>
      </section>
      {/* <section className="container py-4">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={<CustomTooltip />}
              cursor={false} // Removes the full-width highlight line
            />
            <Legend />
            <Bar
              dataKey="count"
              barSize={60}
              fill="#EB963F"
              minPointSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-center text-zinc-500 mt-2">{footer}</p>
      </section> */}
    </div>
  );
}

