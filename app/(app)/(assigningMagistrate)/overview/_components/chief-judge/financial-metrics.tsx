import React from "react";
import { MetricCard } from "../metric-card";
// import CaseDistributionBarChart from "./case-distribution-chart";
import { ROLES } from "@/types/auth";
// import { data, presidingdata, centraldata } from "./type";
import { useAppSelector } from "@/hooks/redux";
// import UpcomingHearing from "../upcoming-hearing";
import { getFinancialMetric } from "@/lib/actions/user-management";
import { useQuery } from "@tanstack/react-query";
import OverViewSkeleton from "../../overview-skeleton";
// import CaseStatusChart from "./case-status-chart";
import FinanceDistributionBarChart from "./financial-distribution-chart";
interface CaseData {
  division_name: string;
  amount: number;
}



export default function FinancialMetrics() {

  const { data: user } = useAppSelector((state) => state.profile);
  // const isPresiding = user?.role && [ROLES.CHIEF_JUDGE, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  // const isHearing = user?.role && [ROLES.ASSIGNING_MAGISTRATE, ROLES.PRESIDING_MAGISTRATE, ROLES.DIRECTOR_MAGISTRATE].includes(user.role);
  const rightModal = user?.role && [ROLES.CENTRAL_REGISTRAR, ROLES.PRESIDING_MAGISTRATE].includes(user.role);
  // const centeral = user?.role && [ROLES.CENTRAL_REGISTRAR].includes(user.role);

  const [caseStatusData, setStatusData] = React.useState<CaseData[]>([
    { division_name: "No Data", amount: 0 },
  ]);

  React.useEffect(() => {
    fetch("/api/financial-distribution")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStatusData(data);
        } else {
          setStatusData([{ division_name: "No Data", amount: 0 }]);
        }
      })
      .catch((error) => {
        console.error("Error fetching case data:", error);
        setStatusData([{ division_name: "No Data", amount: 0 }]);
      });
  }, []);



  const { data, isLoading, error } = useQuery({
    queryKey: ["FinancialMetric"],
    queryFn: async () => {
      return await getFinancialMetric();
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
          {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATE].includes(user?.role as ROLES) && (
            <>
              <MetricCard
                key="total_cases"
                type="finances"
                metricKey="total_cases"
                value="Total Cost Accrued"
                metric={data?.total ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
              <MetricCard
                key="criminal_cases"
                type="finances"
                metricKey="criminal_cases"
                value="Total Transaction - Criminal Case"
                metric={data?.criminal ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
              <MetricCard
                key="civil_cases"
                type="finances"
                metricKey="civil_cases"
                value="Total Transaction - Civil Case"
                metric={data?.civil ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
              <MetricCard
                key="family_cases"
                type="finances"
                metricKey="family_cases"
                value="Total Transaction - Family Case"
                metric={data?.family ?? { total: 0, difference: 0 }}
                rightModal={rightModal}
              />
            </>
          )}
        </div>
      </div>
      <div className="bg-white">
        <FinanceDistributionBarChart heading="ACTIVE MAGISTERATE HANDLING CASES ACROSS DIVISION" caseData={caseStatusData} />
      </div>
    </>
  );
}
