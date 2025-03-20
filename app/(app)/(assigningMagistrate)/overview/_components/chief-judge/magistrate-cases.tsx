import React from "react";
import { MetricCard } from "../metric-card";
import MagistrateDistributionBarChart from "./magistrate-distribution-chart";
import CaseDistributionBarChart from "./case-distribution-chart";
import { ROLES } from "@/types/auth";
import { data, presidingdata, centraldata } from "./type";
import { useAppSelector } from "@/hooks/redux";
import { caseMetric, presidingmetric, hearings, centralMetric } from "@/lib/dummy-data";
import UpcomingHearing from "../upcoming-hearing";
import { getCaseDistribution, getCaseMetric, magistrateMetric } from "@/lib/actions/user-management";
import { useQuery } from "@tanstack/react-query";
import OverViewSkeleton from "../../overview-skeleton";

export default function MagistrateCases() {
  const { data: user } = useAppSelector((state) => state.profile);
  const isPresiding = user?.role && [ROLES.CHIEF_JUDGE, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const isHearing = user?.role && [ROLES.ASSIGNING_MAGISTRATE, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const rightModal = user?.role && [ROLES.CENTRAL_REGISTRAR, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const centeral = user?.role && [ROLES.CENTRAL_REGISTRAR].includes(user.role);
  const caseMetrics = isPresiding ? presidingmetric : (centeral) ? centralMetric : caseMetric;


  const { data, isLoading, error } = useQuery({
    queryKey: ["MagisterateMetric"],
    queryFn: async () => {
      return await magistrateMetric();
    },
    staleTime: 100000,
  });

  if (isLoading) {
    return <OverViewSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }


  return (
    <>
      <div className="bg-white py-12">
        <div className="container grid bg-white  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATE, ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
            <>

              <MetricCard
                type="magistrate"
                metricKey="total"
                value="Total Magistrates"
                metric={data?.totalUsers ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
            </>
          )}
          {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATE].includes(user?.role as ROLES) && (
            <>
              <MetricCard
                type="magistrate"
                metricKey="ASSIGNING_MAGISTRATE"
                value="Assigning Magistrates "
                metric={data?.assigningMagistrate ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
              <MetricCard
                type="magistrate"
                metricKey="PRESIDING_MAGISTRATE"
                value="Presiding Magistrates "
                metric={data?.presidingMagistrate ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
            </>
          )}
          {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATE, ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
            <>
              <MetricCard
                type="magistrate"
                metricKey="active"
                value="Active Magistrates Handling cases"
                metric={data?.activeMagistrate ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
            </>
          )}

          {/* {data.map((metric) => (
            <MetricCard type="magistrate" key={metric.id} metric={metric} rightModal={undefined} />
          ))} */}
        </div>
      </div >
      <div className="bg-white">
        <MagistrateDistributionBarChart />
      </div>
    </>
  );
}
