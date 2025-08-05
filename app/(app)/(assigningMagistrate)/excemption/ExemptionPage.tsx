"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

type Status = "Active" | "Suspended" | "Deactivated";

interface Exemption {
  id: string;
  user: string;
  email: string;
  created: string;
  expires: string;
  status: Status;
}

const exemptions: Exemption[] = [
  {
    id: "EX-123456-DEF",
    user: "Emily Carter",
    email: "emily.carter@bluewave.com",
    created: "11/15/2024",
    expires: "11/15/2025",
    status: "Active",
  },
  {
    id: "EX-321654-PQR",
    user: "Olivia Brown",
    email: "olivia.brown@creativehub.net",
    created: "09/30/2025",
    expires: "09/30/2026",
    status: "Suspended",
  },
  {
    id: "EX-654321-GHI",
    user: "Michael Chen",
    email: "michael.chen@email.com",
    created: "01/10/2023",
    expires: "01/10/2024",
    status: "Deactivated",
  },
  {
    id: "EX-456789-MNO",
    user: "Daniel Kim",
    email: "daniel.kim@softsolutions.org",
    created: "05/05/2023",
    expires: "05/05/2024",
    status: "Active",
  },
  {
    id: "EX-987123-JKL",
    user: "Sophia Martinez",
    email: "sophia.m@techservices.com",
    created: "03/20/2022",
    expires: "03/20/2023",
    status: "Active",
  },
];

export default function ExemptionPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  const filtered = exemptions.filter((e) => {
    const matchesSearch =
      e.user.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<Status, string> = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-700",
    Deactivated: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="h-full bg-white">
      <div className="flex flex-col h-full mx-auto gap-3">
        <header className="shadow-md py-2 px-4 flex justify-between">
          <div className="container space-y-3 pt-4">
            <h1 className="text-lg font-semibold">Exemption IDs</h1>
          </div>
          <div className="">
            {/* <ExemptionIDGenerator /> */}
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

            <Table>
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
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
