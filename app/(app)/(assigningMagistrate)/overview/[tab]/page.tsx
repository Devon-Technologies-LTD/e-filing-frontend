// "use client";

// import { useMemo } from "react";
// import { useParams } from "next/navigation";
// import { caseMetric, magistrateMetric, hearings } from "@/lib/dummy-data";
// import { MCaseFilterType } from "@/types/case";
// import CASEMETRIC from "../_components/case-metric";

// export default function FilteredCases() {
//   const params = useParams();
//   const tab = params.tab as MCaseFilterType;

//   const casefiles = useMemo(() => {
//     return tab === "case" ? caseMetric : magistrateMetric;
//   }, [tab]);

//   return (
//     <div className="space-y-12">
//       <CASEMETRIC metric={casefiles} hearings={hearings} />
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { caseMetric, magistrateMetric, hearings } from "@/lib/dummy-data";
import { MCaseFilterType } from "@/types/case";
import CASEMETRIC from "../_components/case-metric";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import CaseOverview from "../_components/chief-judge";

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as MCaseFilterType;
  const { data: user } = useAppSelector((state) => state.profile);
  const { metrics, histogram } = useMemo(() => {
    const selectedMetric = tab === "case" ? caseMetric : magistrateMetric;
    return {
      metrics: selectedMetric.data, // Pass the `data` array
      histogram: selectedMetric.histogram, // Pass the `histogram` object
    };
  }, [tab]);

  return (
    <div className="space-y-8">
      {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATES].includes(
        user?.role as ROLES
      ) ? (
        <CaseOverview />
      ) : (
        <div className=" bg-white">
          <div className="container space-y-8 ">
            <CASEMETRIC
              metric={metrics}
              hearings={tab === "case" ? hearings : []}
              histogram={histogram}
            />
          </div>
        </div>
      )}
    </div>
  );
}
