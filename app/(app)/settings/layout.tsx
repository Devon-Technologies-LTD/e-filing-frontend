"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import LogoutModal from "@/components/logout-modal";

interface SidebarLinkProps extends Omit<NavItem, "roles" | "title"> {
  className?: string;
  children: React.ReactNode;
}

interface SettingsLayoutProps {
  children: React.ReactNode;
}

function SidebarLink({ href, children, className }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <div className="">
      <Link
        href={href}
        className={cn(
          "rounded-md block py-1 px-4 text-sm font-semibold transition-color",
          {
            "text-primary": isActive,
            "text-neutral-400 hover:bg-gray-100": !isActive,
          },
          className
        )}
      >
        <p className="inline-block relative">
          {children}
          {isActive ? (
            <div className="absolute w-full h-0.5 bg-primary -bottom-0.5 left-0"></div>
          ) : (
            ""
          )}
        </p>
      </Link>
    </div>
  );
}

export default function SettingsModal({ children }: SettingsLayoutProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        router.push("/cases");
      }}
    >
      <DialogContent className="max-w-4xl min-h-[34rem] p-0 gap-0">
        <div className="grid grid-cols-1 md:grid-cols-[250px,1fr]">
          {/* Sidebar */}
          <div className="bg-card-foreground">
            <div className="p-4 py-6">
              <h2 className="text-xl font-semibold text-primary">
                Account Settings
              </h2>
            </div>
            <nav className="space-y-12">
              <div className="space-y-2">
                <SidebarLink href="/settings/profile">Profile</SidebarLink>
                <SidebarLink href="/settings/security">
                  Account and Security
                </SidebarLink>
                <SidebarLink href="/settings/help">Help</SidebarLink>
              </div>
              <div className="pt-4 ">
                <LogoutModal />
              </div>
            </nav>
          </div>
          <p>{children}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
