
import React from "react";
import { MetricCard } from "../metric-card";
import CaseDistributionBarChart from "./case-distribution-chart";
import { ROLES } from "@/types/auth";
import { data, presidingdata } from "./type";
import { useAppSelector } from "@/hooks/redux";

export default function CaseMetrics() {
  const { data: user } = useAppSelector((state) => state.profile);
  const isPresiding = user?.role && [ROLES.CHIEF_JUDGE, ROLES.PRESIDING_MAGISTRATES].includes(user.role);
  const caseData = isPresiding ? presidingdata : data;
  return (
    <>
      <div className="bg-white py-12">
        <div className="container grid  bg-white gap-6"
          style={{
            gridTemplateColumns: `repeat(${caseData.length}, 1fr)`
          }}>
          {caseData.map((metric) => (
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
