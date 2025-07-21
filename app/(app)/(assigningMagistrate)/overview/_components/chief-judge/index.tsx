import { MCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import React from "react";
import CaseMetrics from "./case-metrics";
import MagistrateCases from "./magistrate-cases";
import FinancialMetrics from "./financial-metrics";

export default function CaseOverview() {
  const params = useParams();
  const tab = params.tab as MCaseFilterType;
  const getRenderedPage = () => {
    switch (tab) {
      case "case":
        return CaseMetrics;
      case "magistrate":
        return MagistrateCases;
      case "financial":
        return FinancialMetrics;
      default:
        return CaseMetrics;
    }
  };
  const PageComponent = getRenderedPage();

  return (
    <div className="space-y-6">
      <PageComponent />
    </div>
  );
}
