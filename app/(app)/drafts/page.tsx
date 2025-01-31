import { DataTable } from "@/components/data-table";
import { mockDrafts } from "@/lib/dummy-data";
import React from "react";
import { DraftsDataTableToolbar } from "./_components/data-table-toolbar";
import { draftsColumns } from "./_components/table-columns";

export default function page() {
  return (
    <div className="container ">
      <div className="bg-white p-4 space-y-6">
        <DraftsDataTableToolbar />
        <DataTable columns={draftsColumns} loading={false} data={mockDrafts} />
      </div>
    </div>
  );
}
