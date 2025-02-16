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
import { useAuth } from "../lib/auth";
import { Icons } from "./svg/icons";
import { deleteSession } from "@/lib/server/auth";
import { LoaderCircle } from "lucide-react";

export function UserNav() {
  const { data: user } = useAppSelector((state) => state.profile);
  const name = user?.first_name || "User";
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const { signOut } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Wait for the deleteSession to complete before redirecting
      await deleteSession();
      await signOut();
      // Close the dialog before redirecting
      setDialogOpen(false);
      // Add a small delay before redirecting to ensure state updates are processed
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false); // Reset loading state on error
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
        <DropdownMenuItem className="font-bold text-sm" onClick={() => setDialogOpen(true)}>
          LOGOUT
        </DropdownMenuItem>
      </DropdownMenuContent>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !loading && setDialogOpen(open)}>
        <DialogContent className="max-w-[450px] p-6 space-y-3">
          <DialogTitle className="text-sm font-bold text-black text-center">
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
              size="lg"
              className="flex-1 text-xs sm:flex-none"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle size={12} className="rotation-loader animate-spin" />
                  Logging out...
                </div>
              ) : (
                "LOGOUT"
              )}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="flex-1 text-xs text-primary sm:flex-none"
                disabled={loading}
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
