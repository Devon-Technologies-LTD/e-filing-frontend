import React from "react";
import { MetricCard } from "../metric-card";
import CaseDistributionBarChart from "./case-distribution-chart";
import { ROLES } from "@/types/auth";
import { data, presidingdata, centraldata } from "./type";
import { useAppSelector } from "@/hooks/redux";
import { caseMetric, presidingmetric, hearings, centralMetric } from "@/lib/dummy-data";
import UpcomingHearing from "../upcoming-hearing";
import { getCaseDistribution, getCaseMetric } from "@/lib/actions/user-management";
import { useQuery } from "@tanstack/react-query";
import OverViewSkeleton from "../../overview-skeleton";
interface CaseData {
  division_name: string;
  case_count: number;
}

export default function CaseMetrics() {
  const { data: user } = useAppSelector((state) => state.profile);
  const isPresiding = user?.role && [ROLES.CHIEF_JUDGE, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const isHearing = user?.role && [ROLES.ASSIGNING_MAGISTRATE, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const rightModal = user?.role && [ROLES.CENTRAL_REGISTRAR, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const centeral = user?.role && [ROLES.CENTRAL_REGISTRAR].includes(user.role);
  // const caseData = isPresiding ? presidingdata : (centeral) ? centraldata : data;
  const caseMetrics = isPresiding ? presidingmetric : (centeral) ? centralMetric : caseMetric;


  const [caseMetricsData, setCaseMetricsData] = React.useState<CaseData[]>([]); // ✅ Define type explicitly

  React.useEffect(() => {
    fetch("/api/case-distribution") // Replace with actual API URL
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCaseMetricsData(data);
        } else {
          console.error("Invalid API response, expected an array:", data);
          setCaseMetricsData([]); // Fallback to an empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching case data:", error);
        setCaseMetricsData([]); // Fallback on error
      });
  }, []);



  const { data, isLoading, error } = useQuery({
    queryKey: ["caseMetric"],
    queryFn: async () => {
      return await getCaseMetric();
    },
    staleTime: 100000,
  });

  // const { data: metricData, isLoading: loadingMetric, error: metricError } = useQuery({
  //   queryKey: ["caseDistribution"],
  //   queryFn: async () => {
  //     return await getCaseDistribution();
  //   },
  //   staleTime: 100000,
  // });

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
      <div className="bg-white py-6 sm:py-8">
        <div className="w-full container  px-4 sm:px-8 grid gap-6 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">

          <MetricCard
            type="case"
            metricKey='total'
            metric={data.totalCases}
            rightModal={rightModal}
          />
          <MetricCard
            type="case"
            metricKey='active'
            metric={data.activeCases}
            rightModal={rightModal}
          />

          <MetricCard
            type="case"
            metricKey='assigned'
            metric={data.assignedCases}
            rightModal={rightModal}
          />

          <MetricCard
            type="case"
            metricKey='unassigned'
            metric={data.unassignedCases}
            rightModal={rightModal}
          />

          <MetricCard
            type="case"
            metricKey='reassigned'
            metric={data.reassignedCases}
            rightModal={rightModal}
          />

          <MetricCard
            type="case"
            metricKey='concluded'
            metric={data.concludedCases}
            rightModal={rightModal}
          />

        </div>
      </div>
      <div className="bg-white w-full overflow-x-auto px-4 sm:px-0">
        <CaseDistributionBarChart heading="PERFORMANCE METRIC" caseData={caseMetricsData} />
      </div>
      {isHearing && (
        <div className="bg-white py-6 sm:py-8">
          <UpcomingHearing hearings={hearings} />
        </div>
      )}
    </>
  );
}