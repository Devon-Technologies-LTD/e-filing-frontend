import React from "react";
import { YearSelector } from "@/components/year-selector";
import { AllCasesFilter, AllFiledCasesFilter } from "@/components/filters/all-cases";
import Histogram from "../Histogram";
import { ROLES } from "@/types/auth";

interface CaseStatusChartProps {
    caseData: Record<string, { difference: number; total: number }>;
    heading: string;
    user: { role: ROLES | string | undefined };
}

export default function CaseStatusChart({ caseData, heading, user }: CaseStatusChartProps) {
    // Define keys to include for each role
    const pmVisibleKeys = ["totalCases", "activeCases", "concludedCases", "reassignedCases"];
    const crVisibleKeys = ["totalCases", "pendingCases", "approved", "denied"];

    // Label mapping for display
    const labelMap: Record<string, string> = {
        totalCases: "Total Cases Reviewed",
        pendingCases: "Pending Review",
        approved: "Approved Cases",
        denied: "Denied Cases",
        activeCases: "Active Cases",
        concludedCases: "Concluded Cases",
        reassignedCases: "Reassigned Cases",
    };

    const isREgis = [ROLES.CENTRAL_REGISTRAR].includes(user?.role as ROLES);
    const isPresidingMagistrate = user?.role === ROLES.PRESIDING_MAGISTRATE;

    // Decide which keys to use
    const visibleKeys = isREgis
        ? crVisibleKeys
        : isPresidingMagistrate
            ? pmVisibleKeys
            : [];

    // Map keys to display labels and fetch corresponding data
    const labels = visibleKeys.map((key) => labelMap[key] || key);
    const data = visibleKeys.map((key) => caseData[key]?.total ?? 0);

    return (
        <div className="space-y-4">
            <div className="bg-white border-b border-zinc-200 py-6">
                <div className="container flex items-center justify-between">
                    <p className="font-bold">{heading}</p>
                </div>
            </div>
            <section className="container py-4">
                <Histogram
                    labels={labels}
                    data={data}
                    label="Total"
                    histogramTitle="REVIEW STATUS"
                />
            </section>
        </div>
    );
}
