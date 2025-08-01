import React from "react";
import MagistrateDistributionBarChart from "./magistrate-distribution-chart";
import CaseDistributionBarChart from "./case-distribution-chart";
import { ROLES } from "@/types/auth";
import { data, presidingdata, centraldata } from "./type";
import { useAppSelector } from "@/hooks/redux";
import UpcomingHearing from "../upcoming-hearing";
import { getCaseDistribution, getCaseMetric, magistrateMetric } from "@/lib/actions/user-management";
import { useQuery } from "@tanstack/react-query";
import OverViewSkeleton from "../../overview-skeleton";
import { MetricCard } from "../metric-card";

interface CaseData {
  division_name: string;
  case_count: number;
}
export default function MagistrateCases() {
  const { data: user } = useAppSelector((state) => state.profile);
  const isPresiding = user?.role && [ROLES.CHIEF_JUDGE, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const isHearing = user?.role && [ROLES.ASSIGNING_MAGISTRATE, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const rightModal = user?.role && [ROLES.CENTRAL_REGISTRAR, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const centeral = user?.role && [ROLES.CENTRAL_REGISTRAR].includes(user.role);
  const [caseMetricsData, setCaseMetricsData] = React.useState<CaseData[]>([
    { division_name: "No Data", case_count: 0 },
  ]);

  React.useEffect(() => {
    fetch("/api/magistrate-distribution")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCaseMetricsData(data);
        } else {
          setCaseMetricsData([{ division_name: "No Data", case_count: 0 }]);
        }
      })
      .catch((error) => {
        console.error("Error fetching case data:", error);
        setCaseMetricsData([{ division_name: "No Data", case_count: 0 }]);
      });
  }, []);

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
        <div className="w-full container  px-4 sm:px-8 grid gap-6 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATE, ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
            <>
              <MetricCard
                type="magistrate"
                metricKey="TOTAL_USER"
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
                metricKey="activeMagistrate"
                value="Active Magistrates Handling cases"
                metric={data?.activeMagistrate ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
            </>
          )}

        </div>
      </div >
      <div className="bg-white">
        {[ROLES.DIRECTOR_MAGISTRATE, , ROLES.CHIEF_JUDGE].includes(user?.role as ROLES) && (
          <MagistrateDistributionBarChart header="Magistrates across Divisions(Abuja)" caseData={caseMetricsData} />
        )}
        {[ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
          <MagistrateDistributionBarChart
            header={`ACTIVE MAGISTRATE HANDLING CASE ACROSS ${user?.court_divison.toUpperCase()} DIVISION`}
            caseData={caseMetricsData} />
        )}
      </div>
    </>
  );
}
