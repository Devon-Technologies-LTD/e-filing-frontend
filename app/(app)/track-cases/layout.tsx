"use client";

import TrackCaseSearch from "./_components/track-case-search";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-zinc-100 pb-12">
      <div className=" mx-auto space-y-4">
        <header className="bg-white">
          <div className="container space-y-3 py-4">
            <h1 className="text-xl font-semibold uppercase ">
              Track Cases
            </h1>
            <TrackCaseSearch />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}
