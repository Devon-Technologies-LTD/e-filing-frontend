import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface FinanceDistributionBarChartProps {
  caseData: { division_name: string; amount: number }[];
  heading: string;
}

export default function FinanceDistributionBarChart({
  caseData = [],
  heading,
}: FinanceDistributionBarChartProps) {
  const chartData = Array.isArray(caseData)
    ? caseData
        .filter((item) => item.division_name?.trim() !== "")
        .map((item) => ({
          name: item.division_name.trim(),
          amount: item.amount,
        }))
    : [];

  return (
    <div className="space-y-4">

      <div className="bg-white border-b border-zinc-200 py-6">
        <div className="container flex items-center justify-between">
          <p className="font-bold">{heading}</p>
          <section className="flex gap-2">
            {/* <YearSelector />
            <AllFiledCasesFilter />
            <AllCasesFilter /> */}
          </section>
        </div>
      </div>

      <section className="container py-4">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₦${value.toLocaleString()}` } />
            <Tooltip cursor={false} formatter={(value: number) => `₦${value.toLocaleString()}`}
              labelClassName="font-semibold" />
            <Bar dataKey="amount"
              fill="#EB963F"
              barSize={60}
              minPointSize={10} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-center text-zinc-500 mt-2">
          Cost Accrued in (₦)
        </p>
      </section>
    </div>
  );
}