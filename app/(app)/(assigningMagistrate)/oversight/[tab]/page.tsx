"use client";

import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import PerformanceMagisterate from "./_components/performace-magisterate";
import AllMagistrates from "./_components/all-magisterate";

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as TCaseFilterType;

  const getColumns = () => {
    switch (tab) {
      case "all":
        return AllMagistrates;
      default:
        return PerformanceMagisterate;
    }
  };
  const PageComponent = getColumns();
  return (
    <div className="bg-white p-6 space-y-6">
      <PageComponent />
    </div>
  );
}
