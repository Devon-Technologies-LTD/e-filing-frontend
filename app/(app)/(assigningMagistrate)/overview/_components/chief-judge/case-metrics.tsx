
import React from "react";
import { MetricCard } from "../metric-card";
import CaseDistributionBarChart from "./case-distribution-chart";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import UpcomingHearing from "../upcoming-hearing";
import { getCaseMetric, getCaseMetric2 } from "@/lib/actions/user-management";
import { useQuery } from "@tanstack/react-query";
import OverViewSkeleton from "../../overview-skeleton";
import CaseStatusChart from "./case-status-chart";
import PerformanceMetricChart from "./performance-metric";
interface CaseData {
  division_name: string;
  case_count: number;
}

export default function CaseMetrics() {
  const { data: user } = useAppSelector((state) => state.profile);
  const isPresiding = user?.role && [ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const isHearing = user?.role && [ROLES.ASSIGNING_MAGISTRATE, ROLES.PRESIDING_MAGISTRATE, ROLES.DIRECTOR_MAGISTRATE].includes(user.role);
  const rightModal = user?.role && [ROLES.CENTRAL_REGISTRAR, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  const centeral = user?.role && [ROLES.CENTRAL_REGISTRAR].includes(user.role);
  const [caseMetricsData, setCaseMetricsData] = React.useState<CaseData[]>([
    { division_name: "No Data", case_count: 0 },
  ]);
  const [setPerformance, setPerformanceMetric] = React.useState<CaseData[]>([
    { division_name: "No Data", case_count: 0 },
  ]);
  const [caseStatusData, setStatusData] = React.useState<CaseData[]>([
    { division_name: "No Data", case_count: 0 },
  ]);

  React.useEffect(() => {
    fetch("/api/case-distribution")
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

  React.useEffect(() => {
    fetch("/api/case-metric-status")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStatusData(data);
        } else {
          setStatusData([{ division_name: "No Data", case_count: 0 }]);
        }
      })
      .catch((error) => {
        console.error("Error fetching case data:", error);
        setStatusData([{ division_name: "No Data", case_count: 0 }]);
      });
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["caseMetric"],
    queryFn: async () => {
      return await getCaseMetric();
    },
    staleTime: 100000,
  });
  const { data: caseMetricData, isLoading: loading, error: isError } = useQuery({
    queryKey: ["caseMetricData"],
    queryFn: async () => {
      return await getCaseMetric2();
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
      <div className="bg-white py-6 sm:py-8">
        <div className="w-full container  px-4 sm:px-8 grid gap-6 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATE, ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
            <>
              {["total", "active", "unassigned"].map((key) => (
                <MetricCard
                  key={key}
                  type="case"
                  metricKey={key}
                  value={key === "total" ? "Total Cases Filed" : key === "active" ? "Active Cases" : "Unassigned Cases"}
                  metric={data?.[`${key}Cases`] ?? { total: 0, difference: 0 }}
                  rightModal={rightModal}
                />
              ))}
            </>
          )}
          {isPresiding && (
            <>
              {["total", "active", "concluded"].map((key) => (
                <MetricCard
                  key={key}
                  type="case"
                  metricKey={key}
                  value={key === "total" ? "Total Cases Filed" : key === "active" ? "Active Cases" : "Concluded Cases"}
                  metric={data?.[`${key}Cases`] ?? { total: 0, difference: 0 }}
                  rightModal={rightModal}
                />
              ))}
            </>
          )}

          {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATE, ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
            <MetricCard type="case" metricKey="concluded" value="Concluded Cases" metric={data?.concludedCases ?? { total: 0, difference: 0 }} rightModal={rightModal} />
          )}

          {centeral && ["underReview"].map((key) => (
            <MetricCard
              key={key}
              type="case"
              metricKey={key}
              value={`Total Cases`}
              metric={caseMetricData?.[`${key}`] ?? { total: 0, difference: 0 }}
              rightModal={rightModal}
            />
          ))}
          {centeral && ["approved", "denied"].map((key) => (
            <MetricCard
              key={key}
              type="case"
              metricKey={key}
              value={`Case Filing ${key.charAt(0).toUpperCase() + key.slice(1)}`}
              metric={caseMetricData?.[`${key}`] ?? { total: 0, difference: 0 }}
              rightModal={rightModal}
            />
          ))}

        </div>
      </div>
      <div className="bg-white w-full overflow-x-auto px-4 sm:px-0">
        {[ROLES.DIRECTOR_MAGISTRATE, , ROLES.CHIEF_JUDGE].includes(user?.role as ROLES) && (
          <CaseDistributionBarChart
            heading="CASE DISTRIBUTION ACROSS DIVISIONS (ABUJA)"
            footer="Case Distribution by Division" caseData={caseMetricsData} />
        )}
        {[ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
          <CaseDistributionBarChart
            heading={`CASE DISTRIBUTION ACROSS ${user?.court_divison.toUpperCase()}`}
            footer={` ${user?.court_divison.toUpperCase()} DIVISION`}
            caseData={caseMetricsData}
          />
        )}

        {/* {[ROLES.DIRECTOR_MAGISTRATE, , ROLES.CHIEF_JUDGE, ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
          <PerformanceMetricChart user={{ role: user?.role as ROLES }} heading="PERFORMANCE METRIC" caseData={data} />
        )} */}

        {(isPresiding && !isLoading) && (
          <CaseStatusChart user={{ role: user?.role as ROLES }} heading="REVIEW STATUS" caseData={data} />
        )}
        {(centeral && !loading) && (
          <CaseStatusChart user={{ role: user?.role as ROLES }} heading="REVIEW STATUS" caseData={caseMetricData} />
        )}

      </div>
      {isHearing && (
        <div className="bg-white py-6 sm:py-8">
          <UpcomingHearing />
        </div>
      )}
    </>
  );
}