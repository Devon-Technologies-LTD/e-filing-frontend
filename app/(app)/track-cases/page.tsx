import React from "react";
// import EmptyTrackCases from "./_components/empty-track-cases";
import { TrackCaseDetails } from "./_components/track-case-details";
import EmptyTrackCases from "./_components/empty-track-cases";

export default function page() {
  return (
    <div className="container py-8">
      {/* <EmptyTrackCases /> */}
      <TrackCaseDetails />
    </div>
  );
}
