import React from "react";
import { IUsersColumn } from "./table-column";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { USER_STATUS } from "@/types/auth";
import MagistrateProfile from "./view-user";
import DeleteUser from "./delete-user";
import DeactivateUser from "./deactivate-user";

interface props {
  row: Row<IUsersColumn>;
}
export default function UserManagementDataTableAction({ row }: props) {
  console.log("first", row.original.courtType);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 py-4 space-y-1.5">
        <DropdownMenuItem
          onSelect={(event) => event.stopPropagation()}
          variant="outline"
          className="p-0"
        >
          <MagistrateProfile row={row.original} />
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0" variant="outline">
          <DeactivateUser
            row={row.original}
            trigger={
              <p className="px-2 py-1.5 w-full ">
                {row.original.status === USER_STATUS.ACTIVE
                  ? "DE-ACTIVATE USER"
                  : "ACTIVATE USER"}
              </p>
            }
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 " variant="outline">
          <DeleteUser
            trigger={<p className="px-2 py-1.5 w-full  ">DELETE USER</p>}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
