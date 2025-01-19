import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Help</h2>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="articles">
            <AccordionTrigger>READ ARTICLES</AccordionTrigger>
            <AccordionContent className="px-4">
              Articles content goes here
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tour">
            <AccordionTrigger>PLAY TOUR GUIDE</AccordionTrigger>
            <AccordionContent className="px-4">
              Tour guide content goes here
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Link
          href="/support"
          className="flex flex-1 text-neutral-500 items-center justify-between py-4 text-sm border-b font-bold transition-all text-left [&[data-state=open]>svg]:rotate-180"
        >
          FAQ{" "}
        </Link>
        <Link
          href="/support"
          className="flex flex-1 text-primary items-center justify-between py-4 text-sm border-b font-bold transition-all text-left [&[data-state=open]>svg]:rotate-180"
        >
          CONTACT SUPPORT
        </Link>
      </div>
    </div>
  );
}
