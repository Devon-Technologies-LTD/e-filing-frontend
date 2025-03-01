import React from "react";
import { MainNav } from "./main-nav";
import { SearchMenu } from "./global-search-menu";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { Icons } from "./svg/icons";
import HelpCircleComponent from "./help-circle";
import Notifications from "./notifications";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
            <Icons.logo className="h-6 w-6" />
          </Link>
          <MainNav />
        </div>

        <div className="ml-auto flex items-center space-x-4 md:space-x-6">
          <SearchMenu />
          <HelpCircleComponent />
          <Notifications />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
