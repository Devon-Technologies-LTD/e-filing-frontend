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

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as MCaseFilterType;

  const { metrics, histogram } = useMemo(() => {
    const selectedMetric = tab === "case" ? caseMetric : magistrateMetric;
    return {
      metrics: selectedMetric.data, // Pass the `data` array
      histogram: selectedMetric.histogram, // Pass the `histogram` object
    };
  }, [tab]);

  return (
    <div className="space-y-12">
      <CASEMETRIC
        metric={metrics}
        hearings={tab === "case" ? hearings : []}
        histogram={histogram}
      />
    </div>
  );
}