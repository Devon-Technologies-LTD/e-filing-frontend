import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { createUserColumns } from "./table-columns";
import { useAppSelector } from "@/hooks/redux";

interface Magistrate {
  Name: string;
  Type: string;
  Division: string;
  TotalAssignedCases: number;
  ActiveCases: number;
  Status: string;
}

export default function MagistratesTable() {
  const [magistrates, setMagistrates] = useState<Magistrate[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: user } = useAppSelector((state) => state.profile);

  useEffect(() => {
    fetch("/api/magistrate-oversight") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMagistrates(data);
        } else {
          console.error("Invalid API response, expected an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);


  const columns = useMemo(
    () => createUserColumns(user?.role!, "all"),
    [user?.role]
  );


  // const columns: ColumnDef<Magistrate>[] = [
  //   { accessorKey: "Name", header: "Name" },
  //   { accessorKey: "Type", header: "Type" },
  //   { accessorKey: "Division", header: "Division" },
  //   { accessorKey: "TotalAssignedCases", header: "Total Assigned Cases" },
  //   { accessorKey: "ActiveCases", header: "Active Cases" },
  //   { accessorKey: "Status", header: "Status", cell: ({ row }) => (row.original.Status === "true" ? "Active" : "Inactive") },
  // ];

  return (
    <div className="bg-white">
      <DataTable columns={columns} data={magistrates} loading={loading} />
    </div>
  );
}