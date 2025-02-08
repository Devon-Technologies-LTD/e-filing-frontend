"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { management } from "@/lib/dummy-data";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, unassignedColumns } from "./_components/table-columns";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import ChiefJudgeUserManagement from "./_components/chief-judge/user-management";

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as TCaseFilterType;
  const { data: user } = useAppSelector((state) => state.profile);
  const getColumns = () => {
    switch (tab) {
      case "all":
        return unassignedColumns;
      default:
        return mainColumns;
    }
  };
  const columns = getColumns();
  return (
    <div className="space-y-8">
      {[ROLES.CHIEF_JUDGE, ROLES.DIRECTOR_MAGISTRATES].includes(
        user?.role as ROLES
      ) ? (
        <ChiefJudgeUserManagement />
      ) : (
        <>
          <CasesDataTableToolbar columns={columns} tab={tab} />
          <DataTable columns={columns} loading={false} data={management} />
        </>
      )}
    </div>
  );
}
