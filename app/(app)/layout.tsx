import { DashboardHeader } from "@/components/dashboard-header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div data-wrapper="" className="border-grid flex flex-1 flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
}
