/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useId } from "react";

export default function ReusableTabs({
  activeTab,
  onTabChange,
  tabs,
  tablistClassName,
}: {
  activeTab: string;
  tabs: { id: any; label: string }[];
  onTabChange: (type: string) => void;
  tablistClassName?: string;
}) {

  const uniqueId = useId();

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={(type) => {
        onTabChange(type);
      }}
      className="w-full"
    >
      <TabsList
        className={cn(
          "h-auto p-0 text-base bg-transparent border-b w-full justify-start space-x-4 transition-colors duration-200 ",
          tablistClassName
        )}
      >
        {tabs.map((tab: { id: any; label: string }) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="relative px-0 py-2 font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border- data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-neutral-400"
          >
            {tab.label}
            {activeTab == tab.id && (
              <motion.div
                layoutId={`activeTab-${uniqueId}`}
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
              
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
