"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-auto h-full bg-zinc-100 ">
      <div className="mx-auto space-y-2">
        <header className="bg-white  space-y-4">
          <h1 className="text-xl font-semibold uppercase container py-4">
            Drafts
          </h1>
        </header>
        <ScrollArea className="max-h-[calc(h-full - 10rem)] overflow-y-auto rounded-md px-4">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
