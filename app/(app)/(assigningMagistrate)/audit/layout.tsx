"use client";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="container mx-auto space-y-8 py-4">
      <header className="space-y-4">
        <h1 className="text-xl font-semibold uppercase">Audit Logs</h1>
      </header>
      <div>{children}</div>
    </div>
  );
}
