"use client";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-full bg-zinc-100 ">
      <div className="h-full mx-auto space-y-2 gap-3 flex flex-col">
        <header className="bg-white space-y-4">
          <h1 className="text-xl font-semibold uppercase container py-4">
            Drafts
          </h1>
        </header>
        <div className="flex-1 overflow-auto rounded-md px-4">{children}</div>
      </div>
    </div>
  );
}
