"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

function SidebarLink({ href, isActive, children }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block py-2 px-4 text-gray-500 hover:text-gray-900 transition-colors",
        isActive && "text-[#6B1D1D] font-medium"
      )}
    >
      {children}
    </Link>
  );
}

export default function SettingsModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        router.back();
      }}
    >
      <DialogContent className="max-w-4xl p-0 gap-0">
        <div className="grid grid-cols-1 md:grid-cols-[250px,1fr]">
          {/* Sidebar */}
          <div className="border-r">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#6B1D1D]">
                Account Settings
              </h2>
            </div>
            <nav className="space-y-1">
              <SidebarLink href="/settings/profile">Profile</SidebarLink>
              <SidebarLink href="/settings/security">
                Account and Security
              </SidebarLink>
              <SidebarLink href="/settings/help" isActive>
                Help
              </SidebarLink>
              <div className="pt-4 mt-4">
                <SidebarLink href="/logout">Logout</SidebarLink>
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Help</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="articles" className="border rounded-lg">
                <AccordionTrigger className="px-4">
                  READ ARTICLES
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  Articles content goes here
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tour" className="border rounded-lg">
                <AccordionTrigger className="px-4">
                  PLAY TOUR GUIDE
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  Tour guide content goes here
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq" className="border rounded-lg">
                <AccordionTrigger className="px-4">FAQ</AccordionTrigger>
                <AccordionContent className="px-4">
                  FAQ content goes here
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href="/support"
              className="block mt-6 text-[#6B1D1D] font-medium hover:underline"
            >
              CONTACT SUPPORT
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
