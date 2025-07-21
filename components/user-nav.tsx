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

import { useAuth } from "../lib/auth";
import { Icons } from "./svg/icons";
import { deleteSession } from "@/lib/server/auth";
import { LoaderCircle } from "lucide-react";
import { ConfirmationModal } from "./confirmation-modal";
import { AlertDialogCancel, AlertDialogFooter } from "./ui/alert-dialog";

export function UserNav() {
  const { data: user } = useAppSelector((state) => state.profile);
  const name = user?.first_name || "User";
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async (e: any) => {
    setLoading(true);
    try {
      await deleteSession();
      await signOut();
      setDialogOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <div>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
        <DropdownMenuContent className="w-80 space-y-6" align="end" forceMount>
          <DropdownMenuLabel className="font-normal flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.last_name || "/avatars/default.png"}
                alt={name}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium leading-none">{user?.role}</p>
              <p className="text-sm font-medium leading-none">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              <p className="text-xs leading-none text-bold text-muted-foreground">{user?.court_divison}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup className="space-y-3 p-4">
            {user?.court_type !== "" && user?.court_type !== null && (
              <DropdownMenuItem asChild>
                <span className="flex gap-3">
                  <Icons.Court />
                  <p className="text-sm uppercase text-app-primary font-semibold">{user?.court_type}</p>
                </span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="font-bold text-xs"
              onClick={(e) => {
                setIsMenuOpen(false);
                setDialogOpen(true);
              }}
            >
              LOGOUT
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationModal
        isOpen={isDialogOpen}
        setIsOpen={(open) => !loading && setDialogOpen(open)}
      >
        <div className="space-y-8">
          <p className="text-sm font-bold text-black text-center">Logout</p>
          <p className="text-sm text-black text-center">
            Are you sure you want to log out? Any unsaved changes will be lost.
          </p>
          <div className="flex justify-center">
            <Icons.exclamation />
          </div>

          {/* Action Buttons */}
          <AlertDialogFooter className="flex items-center sm:justify-center w-full">
            <Button
              variant="default"
              size="lg"
              className="flex-1 text-xs sm:flex-none"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle
                    size={12}
                    className="rotation-loader animate-spin"
                  />
                  Logging out...
                </div>
              ) : (
                "LOGOUT"
              )}
            </Button>

            <AlertDialogCancel
              className="font-extrabold text-red-500 text-xs uppercase"
              disabled={loading}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </ConfirmationModal>
    </div>
  );
}
