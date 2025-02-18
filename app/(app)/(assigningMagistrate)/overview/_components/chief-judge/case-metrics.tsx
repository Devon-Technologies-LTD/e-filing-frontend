import React from "react";
import { MetricCard } from "../metric-card";
import CaseDistributionBarChart from "./case-distribution-chart";
import { ROLES } from "@/types/auth";
import { data, presidingdata, centraldata } from "./type";
import { useAppSelector } from "@/hooks/redux";
import { caseMetric, presidingmetric, hearings, centralMetric } from "@/lib/dummy-data";
import UpcomingHearing from "../upcoming-hearing";

export default function CaseMetrics() {
  const { data: user } = useAppSelector((state) => state.profile);
  const isPresiding = user?.role && [ROLES.CHIEF_JUDGE, ROLES.PRESIDING_MAGISTRATES].includes(user.role);
  const isHearing = user?.role && [ROLES.ASSIGNING_MAGISTRATES, ROLES.PRESIDING_MAGISTRATES].includes(user.role);
  const rightModal = user?.role && [ROLES.CENTRAL_REGISTRY, ROLES.PRESIDING_MAGISTRATES].includes(user.role);
  const centeral = user?.role && [ROLES.CENTRAL_REGISTRY].includes(user.role);
  const caseData = isPresiding ? presidingdata : (centeral) ? centraldata : data;
  const caseMetrics = isPresiding ? presidingmetric : (centeral) ? centralMetric : caseMetric;

  return (
    <>
      <div className="bg-white py-6 sm:py-8">
        <div className="w-full container  px-4 sm:px-8 grid gap-6 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {caseData.map((metric) => (
            <MetricCard
              type="case"
              key={metric.id}
              metric={metric}
              rightModal={rightModal}
            />
          ))}
        </div>
      </div>
      <div className="bg-white w-full overflow-x-auto px-4 sm:px-0">
        <CaseDistributionBarChart
          heading="PERFORMANCE METRIC"
          caseMetric={caseMetrics}
        />
      </div>
      {isHearing && (
        <div className="bg-white py-6 sm:py-8">
          <UpcomingHearing hearings={hearings} />
        </div>
      )}
    </>
  );
}