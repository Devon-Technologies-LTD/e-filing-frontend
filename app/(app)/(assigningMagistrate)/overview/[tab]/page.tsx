"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { caseMetric, magistrateMetric } from "@/lib/dummy-data";
import { MCaseFilterType } from "@/types/case";
import CASEMETRIC from "../_components/case-metric";

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as MCaseFilterType;

  const casefiles = useMemo(() => {
    return tab === "case" ? caseMetric : magistrateMetric;
  }, [tab]);

  return (
    <div className="space-y-12">
      <CASEMETRIC metric={casefiles} />
    </div>
  );
}