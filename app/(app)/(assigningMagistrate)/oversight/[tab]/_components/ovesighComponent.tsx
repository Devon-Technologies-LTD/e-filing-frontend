"use client";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import AllMagistrates from "./all-magisterate";
import PerformanceMagisterate from "./performace-magisterate";
import { useState } from "react";

export default function OverSightComponenet() {
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
