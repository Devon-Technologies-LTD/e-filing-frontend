import React from "react";
// import EmptyTrackCases from "./_components/empty-track-cases";
import { TrackCaseDetails } from "./_components/track-case-details";

export default function page() {
  return (
    <div className="container h-full">
      {/* <EmptyTrackCases /> */}
      <TrackCaseDetails />
    </div>
  );
}
