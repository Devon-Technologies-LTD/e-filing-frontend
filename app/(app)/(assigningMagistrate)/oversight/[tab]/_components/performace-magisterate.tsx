import { DataTable } from "@/components/data-table";
import { useAppSelector } from "@/hooks/redux";
import React, { useMemo, useState } from "react";
// import { mainColumns } from "./table-columns";
import { USER_STATUS } from "@/types/auth";

export interface IUsersColumn {
  id?: string;
  name: string;
  total: string;
  status: USER_STATUS;
  active?: string;
  reassigned?: string;
  close?: string;
  courtType?: string;
  resolutionTime?: string;
}

export const mockUsers: IUsersColumn[] = [
  {
    id: "1",
    name: "Bayo Adetola",
    total: "1000 cases",
    status: USER_STATUS.ACTIVE,
    active: "100 case",
    close: "20 cases",
    reassigned: "20 cases",
    courtType: "Magistrate Court",
    resolutionTime: "Magistrate Court",
  },
  {
    id: "1",
    name: "Bayo Adetola",
    total: "3000",
    status: USER_STATUS.INACTIVE,
    active: "100 case",
    close: "20 cases",
    reassigned: "20 cases",
    courtType: "Family Court",
    resolutionTime: "Family Court",
  },
];

export default function PerformanceMagisterate() {
  const { data: user } = useAppSelector((state) => state.profile);
  const handleRowClick = (row: any) => {
    console.log(row);
  };

  // const columns = useMemo(
  //   () => mainColumns(user?.role!, "performance"),
  //   [user?.role]
  // );
  return (
    <div className="bg-white  space-y-6">
      {/* <DataTable
        onRowClick={handleRowClick}
        columns={columns}
        loading={false}
        data={mockUsers}
      /> */}
    </div>
  );
}
