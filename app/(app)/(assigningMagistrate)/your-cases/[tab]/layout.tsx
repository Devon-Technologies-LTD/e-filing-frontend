"use client";
import { useParams, useRouter } from "next/navigation";
import { TCaseFilterType } from "@/types/case";
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
    router.push(`/your-cases/${newTab}`);
  };
  const tabs: { id: TCaseFilterType; label: string }[] = [
    { id: "case", label: "My Cases" },
    { id: "active", label: "Active Cases" },
    { id: "concluded", label: "Concluded Cases" },
  ];

  return (
    <div className="container mx-auto space-y-8 py-4">
      <header className="space-y-4">
        <h1 className="text-xl font-semibold uppercase">Your Cases</h1>
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
