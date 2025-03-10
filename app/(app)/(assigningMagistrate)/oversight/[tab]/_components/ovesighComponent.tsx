"use client";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import AllMagistrates from "./all-magisterate";
import PerformanceMagisterate from "./performace-magisterate";
import { CaseStatus, DEFAULT_PAGE_SIZE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/case-file";
import { useState } from "react";

export default function OverSightComponenet() {
    const params = useParams();
    const tab = params.tab as TCaseFilterType;
    // const [currentPage, setCurrentPage] = useState(1);
    // const { data, isLoading: draftsLoading } = useQuery({
    //     queryKey: [
    //         "get_cases",
    //         {
    //             search: "",
    //             currentPage,
    //         },
    //     ],
    //     queryFn: async () => {
    //         return await getCaseFiles({
    //             page: currentPage,
    //             size: DEFAULT_PAGE_SIZE,
    //             status: [
    //                 CaseStatus.Approved,
    //                 CaseStatus.Assigned,
    //                 CaseStatus.Denied,
    //                 CaseStatus.JudgementDelivered,
    //                 CaseStatus.Pending,
    //                 CaseStatus.StruckOut,
    //                 CaseStatus.ToBeAssigned,
    //                 CaseStatus.UnderReview,
    //             ],
    //         });
    //     },
    //     staleTime: 50000,
    // });
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
