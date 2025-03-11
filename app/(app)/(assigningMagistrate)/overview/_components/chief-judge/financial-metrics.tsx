import { caseMetric } from "@/lib/dummy-data";
import React from "react";
import { MetricCard } from "../metric-card";
import CaseDistributionBarChart from "./case-distribution-chart";


const data = [
  {
    id: 1,
    title: "Total Cost Accrued",
    total: "2456980",
    lastYear: "120000",
    prefix: "NGN",
    variant: "total",
    description:
      "The total cost associated with filing and processing a case, including court fees, legal expenses, and any additional charges",
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
    title: "Criminal Cases - Cost Accrued",
    total: "200456",
    lastYear: "120000",
    variant: "activedir",
    description:
      "The total cost associated with filing and processing a criminal case, including court fees, legal expenses, and any additional charges",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 3,
    title: "Civil Cases - Cost Accrued",
    total: "450567",
    variant: "unassigned",
    lastYear: "120000",
    description:
      "The total cost associated with filing and processing a criminal case, including court fees, legal expenses, and any additional charges",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 4,
    title: "Family Cases - Cost Accrued",
    total: "345790",
    variant: "concluded",
    lastYear: "2450",
    color: "bg-zinc-50",
    description:
      "The total cost associated with filing and processing a criminal case, including court fees, legal expenses, and any additional charges",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
];
export default function FinancialMetrics() {
  return (
    <>
      <div className="bg-white py-12">
        <div className="container grid bg-white  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* {data.map((metric) => (
            <MetricCard type="finances" key={metric.id} metric={metric} rightModal={undefined} />
          ))} */}
        </div>
      </div>
      <div className="bg-white">
        {/* <CaseDistribut/ionBarChart caseMetric={caseMetric} heading={"PERFORMANCE METRIC"} /> */}
      </div>
    </>
  );
}
