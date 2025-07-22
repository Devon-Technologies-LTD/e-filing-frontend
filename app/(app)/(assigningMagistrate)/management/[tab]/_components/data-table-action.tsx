import React from "react";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import MagistrateProfile from "./view-user";
import DeleteUser from "./delete-user";
import DeactivateUser from "./deactivate-user";

interface Props {
  row: Row<any>;
}

export default function UserManagementDataTableAction({ row }: Props) {
  const user = row.original;

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
          className="p-0"
        >
          <MagistrateProfile row={user} />
        </DropdownMenuItem>

        {user.status.toLowerCase() !== "pending" && (
          <DropdownMenuItem className="p-0">
            <DeactivateUser
              row={user}
              trigger={
                <p className="px-2 py-1.5 w-full">
                  {user.status === "ACTIVE"
                    ? "DE-ACTIVATE USER"
                    : "ACTIVATE USER"}
                </p>
              }
            />
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="p-0">
          <DeleteUser
            trigger={<p className="px-2 py-1.5 w-full">DELETE USER</p>}
            userId={user.id}
            email={user.email}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
