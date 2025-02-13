import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icons } from "./svg/icons";
import { deleteSession } from "@/lib/server/auth";

export function UserNav() {
  const { data: user } = useAppSelector((state) => state.profile);
  const name = user?.first_name || "User";
  const initials = name
    ? name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
    : "U";

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      deleteSession();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.last_name || "/avatars/default.png"}
              alt={name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-3" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.last_name || "/avatars/default.png"}
              alt={name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem asChild>
            <Link
              className="w-full uppercase font-semibold text-xs"
              href="/settings/profile"
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="w-full uppercase font-semibold text-xs"
              href="/settings/security"
            >
              Account and security
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="w-full uppercase font-semibold text-xs"
              href="/settings/help"
            >
              Help
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={openDialog}>LOGOUT</DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[450px] p-6 space-y-3">
          <DialogTitle className="text-xl text-black font-semibold text-center">
            Logout
          </DialogTitle>
          <DialogDescription className="text-sm text-black text-center">
            Are you sure you want to log out? Any unsaved changes will be lost.
          </DialogDescription>
          <div className="flex justify-center">
            <Icons.exclamation />
          </div>
          <DialogFooter className="flex md:justify-center gap-4 sm:gap-0">
            <Button
              variant="default"
              size={"lg"}
              className="flex-1 text-xs sm:flex-none"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Logging out..." : "LOGOUT"}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="flex-1 text-xs text-primary sm:flex-none"
              >
                CANCEL
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
