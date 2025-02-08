import { caseMetric } from "@/lib/dummy-data";
import React from "react";
import { MetricCard } from "../metric-card";
import CaseDistributionBarChart from "./case-distribution-chart";

const data = [
  {
    id: 1,
    title: "Total Case Filed",
    total: "5675000",
    lastYear: "12200",
    variant: "total",
    color: "bg-neutral-200",
    description:
      "The total number of cases filed under Abuja broken down into various division",
    districts: [
      { name: "Wuse Zone 1", cases: 4500 },
      { name: "Wuse Zone 2", cases: 3200 },
      { name: "Wuse Zone 3", cases: 6000 },
      { name: "Wuse Zone 1", cases: 4500 },
      { name: "Wuse Zone 2", cases: 3200 },
      { name: "Wuse Zone 3", cases: 6000 },
      { name: "Wuse Zone 1", cases: 4500 },
      { name: "Wuse Zone 2", cases: 3200 },
      { name: "Wuse Zone 3", cases: 6000 },
    ],
  },
  {
    id: 2,
    title: "Active Cases",
    total: "3890000",
    lastYear: "9450",
    variant: "active",
    color: "bg-green-50",
    description: "Cases that are still ongoing in Wuse division.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 3,
    title: "Unassigned Cases",
    total: "1890000",
    variant: "unassigned",
    lastYear: "2450",
    color: "bg-orange-50",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 4,
    title: "Re-assigned Cases",
    total: "1890000",
    variant: "reassigned",
    lastYear: "2450",
    color: "bg-zinc-50",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 5,
    title: "Concluded Cases",
    variant: "concluded",
    total: "1890000",
    lastYear: "2450",
    color: "bg-zinc-100",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
];
export default function CaseMetrics() {
  return (
    <>
      <div className="bg-white py-12">
        <div className="container grid bg-white  grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {data.map((metric) => (
            <MetricCard type="case" key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
      <div className="bg-white">
        <CaseDistributionBarChart />
      </div>
    </>
  );
}
