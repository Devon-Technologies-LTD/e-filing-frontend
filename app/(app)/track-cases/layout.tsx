"use client";

import TrackCaseSearch from "./_components/track-case-search";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-zinc-100 ">
      <div className=" h-full mx-auto gap-3 flex flex-col">
        <header className="bg-white shadow-md">
          <div className="container space-y-3 py-4">
            <h1 className="text-xl font-semibold uppercase ">Track Cases</h1>
            <TrackCaseSearch />
          </div>
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
