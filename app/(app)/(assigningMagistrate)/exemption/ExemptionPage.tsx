"use client";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ExemptionIDGenerator from "./GenerateExemption";
import { DataTable } from "@/components/data-table";
import { DraftsColumns } from "./_component/table-columns";
import { useQuery } from "@tanstack/react-query";
import { getExemption } from "@/lib/actions/examption";

type Status = "Active" | "Suspended" | "Deactivated";

interface Exemption {
  id: string;
  user: string;
  email: string;
  created: string;
  expires: string;
  status: Status;
}



export default function ExemptionPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  const { data, isLoading } = useQuery<{ data: { data: Exemption[] } }>({
    queryKey: ["list_exemption"],
    queryFn: async () => {
      const result = await getExemption();
      // Ensure the returned object matches the expected shape
      if (
        result &&
        typeof result === "object" &&
        "data" in result &&
        Array.isArray((result as any).data?.data)
      ) {
        return result as { data: { data: Exemption[] } };
      }
      // Fallback to empty array if shape is unexpected
      return { data: { data: [] } };
    },
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row: any) => {
    setSelectedRow(row.id);
  };

  console.log(data?.data?.data);

  return (
    <div className="h-full bg-white">
      <div className="flex flex-col h-full mx-auto gap-3">
        <header className="shadow-md py-2 px-4 flex justify-between">
          <div className="container space-y-3 pt-4">
            <h1 className="text-lg font-semibold">Exemption IDs</h1>
          </div>
          <div className="">
            <ExemptionIDGenerator />
            {/* <Button className="text-sm">
              Generate New Exemption ID
            </Button> */}
          </div>
        </header>
        <div className="flex-1 container py-8 overflow-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Input
                placeholder="Search by email or name"
                className="w-[300px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    {statusFilter === "All" ? "ALL Status" : statusFilter}{" "}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {["All", "Active", "Suspended", "Deactivated"].map(
                    (status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => setStatusFilter(status as any)}
                      >
                        {status}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>


            <DataTable
              onRowClick={handleRowClick}
              columns={DraftsColumns}
              loading={isLoading}
              data={data?.data.data ?? []}
            />
            {/* <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exemption ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell>{item.expires}</TableCell>
                    <TableCell>
                      <Badge
                        className={statusColors[item.status]}
                        variant="outline"
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
          </div>
        </div>
      </div>
    </div>
  );
}

