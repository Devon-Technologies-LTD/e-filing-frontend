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
        >
          <MagistrateProfile row={row.original} />
        </DropdownMenuItem>
        <DropdownMenuItem variant="outline">
          <DeactivateUser
            row={row.original}
            trigger={
              row.original.status === USER_STATUS.ACTIVE
                ? "DE-ACTIVATE USER"
                : "ACTIVATE USER"
            }
          />
        </DropdownMenuItem>
        <DropdownMenuItem variant="outline">
          <DeleteUser trigger={<p>DELETE USER</p>} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
