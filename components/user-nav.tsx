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
import { logoutAction } from '@/lib/actions/login'

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-3" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex items-center gap-3">
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Jane Doe </p>
            <p className="text-xs leading-none text-muted-foreground">
              janedoe@gmail.com{" "}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link className="w-full" href="/settings/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link className="w-full" href="/settings/security">Account and security</Link>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem className="uppercase font-semibold text-xs">
            <Link className="w-full" href="/settings/help">Help </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="uppercase font-semibold text-xs">
          <form className="w-full" action={logoutAction}>
            <button type="submit" className="flex items-center w-full gap-4 text-sm font-medium text-destructive">
              Log out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
