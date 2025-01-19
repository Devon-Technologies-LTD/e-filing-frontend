"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Icons } from "./svg/icons";

export default function HelpCircleComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Icons.help />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-3" align="end" forceMount>
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link className="w-full" href="">Read Articles</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link className="w-full" href="">Play tour guide</Link>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link className="w-full" href="">Faq </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link className="w-full" href="">CONTACT SUPPORT</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
