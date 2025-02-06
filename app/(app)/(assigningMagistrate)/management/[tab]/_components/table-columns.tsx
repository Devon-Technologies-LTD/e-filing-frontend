
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ConfirmationModal } from "@/components/confirmation-modal";
import RightSidebarModal from "@/components/modal-right";

export const mainColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "districts",
    header: "Districts",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: Record<string, string> = {
        "Active": "bg-green-50 text-green-700",
        "Pending": "bg-blue-50 text-blue-600",
        "Inactive": "bg-red-100 text-red-800",
      };

      return (
        <span className={`px-2 py-1 rounded-md text-sm font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const [isDrawerOpen, setDrawerOpen] = useState(false);
      const user = row.original;

      const handleActionConfirm = (action: string) => {
        console.log(`${action} confirmed for ${user.name}`);
        // Perform action logic here (e.g., API call)
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDrawerOpen(true)}>
                View Profile
              </DropdownMenuItem>

              <ConfirmationModal
                trigger={<DropdownMenuItem>De-activate User</DropdownMenuItem>}
              >
                <div>
                  <h2 className="text-lg font-semibold">Confirm Deactivation</h2>
                  <p className="mt-2">Are you sure you want to deactivate this user?</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => console.log("Cancelled")}>Cancel</Button>
                    <Button variant="destructive" onClick={() => handleActionConfirm("De-activate User")}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </ConfirmationModal>

              <ConfirmationModal
                trigger={<DropdownMenuItem>Delete User</DropdownMenuItem>}
              >
                <div>
                  <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                  <p className="mt-2">Are you sure you want to delete this user? This action cannot be undone.</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => console.log("Cancelled")}>Cancel</Button>
                    <Button variant="destructive" onClick={() => handleActionConfirm("Delete User")}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </ConfirmationModal>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Right Sidebar Modal */}
          <RightSidebarModal isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">{user.name}</h2>
                <p className="text-base">Email: {user.email}</p>
              </div>
              <div className="overflow-y-auto max-h-[400px]">
                {(Array.isArray(user.districts) ? user.districts : []).map(
                  (district: { name: string; cases: number }, index: number) => (
                    <div key={index} className="flex justify-between border-b-2 p-4">
                      <p>{district.name}</p>
                      <p>{district.cases}</p>
                    </div>
                  )
                )}
              </div>


            </div>
          </RightSidebarModal>
        </>
      );
    },
  },
];

export const unassignedColumns = [...mainColumns];