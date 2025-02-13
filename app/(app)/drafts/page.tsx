"use client";
import { DataTable } from "@/components/data-table";
import { mockDrafts } from "@/lib/dummy-data";
import React from "react";
import { DraftsDataTableToolbar } from "./_components/data-table-toolbar";
import { DraftsColumns } from "./_components/table-columns";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleRowClick = (row: any) => {
    console.log(row);
    router.push(`/case-filing/1`);
  };

  return (
    <div className="container ">
      <div className="bg-white p-4 space-y-6">
        <DraftsDataTableToolbar />
        <DataTable
          onRowClick={handleRowClick}
          columns={DraftsColumns}
          loading={false}
          data={mockDrafts}
        />
      </div>
    </div>
  );
}
