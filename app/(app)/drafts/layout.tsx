"use client";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-zinc-100 min-h-dvh">
      <div className=" mx-auto  space-y-8">
        <header className="bg-white  space-y-4">
          <h1 className="text-xl font-semibold uppercase container py-4">
            Drafts
          </h1>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}
