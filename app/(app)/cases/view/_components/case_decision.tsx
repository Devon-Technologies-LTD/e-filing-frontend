"use client";

import React, { useState } from "react";
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/svg/icons";
import { toast } from "sonner";

interface DecisionData {
    decision?: string;
    reason?: string;
    file_path?: string;
    decision_date?: string;
    error?: string;
}

interface IProps {
    data: DecisionData;
    message?: string;
}

export function CaseDecisionList({ data, message }: IProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    console.log(data);
    const isJudgementDelivered = !!data?.decision;
    const fileName = data?.file_path?.split("/").pop() || "judgement.pdf";
    // const decisionDate = data?.decision_date
    //     ? new Date(data.decision_date).toLocaleDateString()
    //     : "Unknown date";

    const isValidDate = (date: string | undefined) => {
        const parsed = new Date(date || "");
        return !isNaN(parsed.getTime());
    };

    const decisionDate = isValidDate(data?.decision_date)
        ? new Date(data!.decision_date!).toLocaleDateString()
        : "Unknown date";

    const matchesSearch = data?.decision
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const handleDownload = async () => {
        if (!data?.file_path) return;

        try {
            setIsDownloading(true);
            const proxyUrl = `/api/download?url=${encodeURIComponent(
                data.file_path
            )}&name=${encodeURIComponent(fileName)}`;
            console.log(proxyUrl)
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error("Failed to download");

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            toast.error("Failed to download judgement.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-6">
          

            <div className="space-y-6">
                {isJudgementDelivered && matchesSearch ? (
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                        <div className="bg-secondary-foreground px-6 py-2 flex justify-between items-center">
                            <div className="text-base font-medium">
                                Delivered on: <span className="font-bold">{decisionDate}</span>
                            </div>
                            <Button
                                variant="ghost"
                                disabled={isDownloading}
                                size="sm"
                                className="font-semibold text-sm"
                                onClick={handleDownload}
                            >
                                {isDownloading ? "Downloading..." : "Download"}
                            </Button>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <Icons.pdf className="h-6 w-6 text-red-600" />
                                    <span className="text-sm font-bold">
                                        {data.decision}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDownload();
                                    }}
                                >
                                    <Download className="h-4 w-4 text-black" />
                                    <span className="sr-only">Download {data.decision}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white h-full space-y-6 relative w-full flex flex-col items-center justify-center rounded-lg border border-gray-200 py-12">
                        <Icons.empty />
                        <p className="font-semibold max-w-56 text-sm text-center text-gray-500">
                            {searchQuery
                                ? `No judgement matching "${searchQuery}"`
                                : data?.error || message || "Judgement has not been delivered"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

}
