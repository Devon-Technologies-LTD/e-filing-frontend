import { DataTable } from "@/components/data-table";
import { useAppSelector } from "@/hooks/redux";
import React, { useMemo, useState } from "react";
import { mainColumns } from "./table-columns";
import { USER_STATUS } from "@/types/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
    id: "2",
    name: "Sarah Johnson",
    total: "3000",
    status: USER_STATUS.INACTIVE,
    active: "100 case",
    close: "20 cases",
    reassigned: "20 cases",
    courtType: "Family Court",
    resolutionTime: "Family Court",
  },
];

export default function AllMagistrates() {
  const { data: user } = useAppSelector((state) => state.profile);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const columns = useMemo(
    () => mainColumns(user?.role!, "all"), // Pass handler to columns
    [user?.role]
  );

  return (
    <div className="bg-white space-y-6">
      <DataTable columns={columns} loading={false} data={mockUsers} />

      {selectedRole && (
        <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Role Information</DialogTitle>
            </DialogHeader>
            <p className="text-lg">
              Selected Role: <strong>{selectedRole}</strong>
            </p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
