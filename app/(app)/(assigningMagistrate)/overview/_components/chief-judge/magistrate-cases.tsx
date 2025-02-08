import React from "react";
import { MetricCard } from "../metric-card";
import MagistrateDistributionBarChart from "./magistrate-distribution-chart";

const data = [
  {
    id: 1,
    title: "Total Magistrates",
    total: "5675000",
    lastYear: "12",
    variant: "total",
    color: "bg-neutral-200",
    description: "The total number of cases filed under Wuse zone 6.",
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
    title: "Assigning Magistrates",
    total: "3890000",
    lastYear: "0",
    variant: "activedir",
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
    title: "Presiding Magistrates",
    total: "1890000",
    variant: "unassigned",
    lastYear: "24",
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
    title: "Active Magistrates Handling Cases",
    total: "1890000",
    variant: "concluded",
    lastYear: "12",
    color: "bg-zinc-50",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
];
export default function MagistrateCases() {
  return (
    <>
      <div className="bg-white py-12">
        <div className="container grid bg-white  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.map((metric) => (
            <MetricCard type="magistrate" key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
      <div className="bg-white">
        <MagistrateDistributionBarChart />
      </div>
    </>
  );
}
