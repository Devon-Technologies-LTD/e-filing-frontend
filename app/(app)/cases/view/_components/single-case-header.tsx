/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { useState } from "react";
import { Icons } from "@/components/svg/icons";

export function SingleCaseHeader({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const tabs: { id: any; label: string }[] = [
    { id: "overview", label: "Case Overview" },
    { id: "documents", label: "Documents" },
    { id: "decisions", label: "Decisions" },
  ];
  const [activeTab, setActiveTab] = useState("overview");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <div className="space-y-3 bg-white pt-4 shadow-xl ">
      <div className="container space-y-3">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/cases" className="font-semibold">
              YOUR CASES
            </Link>
            <span className="text-zinc-500 font-bold">/ {id}</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-medium text-primary">{id}</h1>
              <div className="flex items-center gap-3">
                <StatusBadge status="CRIMINAL CASE">
                  CRIMINAL CASE - CLAIMANT
                </StatusBadge>
                <StatusBadge status="FIRST HEARING SCHEDULED" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* <img
              src="/placeholder.svg?height=40&width=40"
              alt="Court Seal"
              className="h-10 w-10"
            /> */}
                <QrCode className="h-10 w-10 text-gray-400" />
              </div>
              <Button className="bg-primary">FILE OTHER PROCESSES</Button>
            </div>
          </div>
        </div>
        {/* Navigation */}

        <div className="flex justify-between items-center">
          <ReusableTabs
            tablistClassName="border-0"
            tabs={tabs}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
          <Icons.settings />
        </div>
      </div>
    </div>
  );
}
