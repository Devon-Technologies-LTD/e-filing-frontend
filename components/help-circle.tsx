"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Icons } from "./svg/icons";

export default function HelpCircleComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Icons.help  />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-3" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex items-center gap-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Jane Doe </p>
            <p className="text-xs leading-none text-muted-foreground">
              janedoe@gmail.com{" "}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link href="settings/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link href="settings/security">Account and security</Link>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link href="settings/help">Help </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="uppercase font-semibold text-xs">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
