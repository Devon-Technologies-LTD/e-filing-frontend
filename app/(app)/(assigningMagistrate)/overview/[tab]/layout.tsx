"use client";
import { useParams, useRouter } from "next/navigation";
import { MCaseFilterType } from "@/types/case";
import ReusableTabs from "@/components/ui/reusable-tabs";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const activeTab = params?.tab as string;

  const handleTabChange = (newTab: string) => {
    router.push(`/overview/${newTab}`);
  };
  
  const tabs: { id: MCaseFilterType; label: string }[] = [
    { id: "case", label: "Cases Metric" },
    { id: "magistrate", label: "Magistrate Cases" },
  ];

  return (
    <div className="container mx-auto space-y-8 py-4">
      <header className="space-y-4">
        <h1 className="text-xl font-semibold uppercase">Overview</h1>
        <ReusableTabs
          tabs={tabs}
          onTabChange={handleTabChange}
          activeTab={activeTab}
        />
      </header>
      <div>{children}</div>
    </div>
  );
}
