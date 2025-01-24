import React from "react";
import CaseTypesForm from "./form";

export default function CaseTypes() {
  return (
    <div className="lg:w-1/2 mr-10 space-y-10 overflow-y-scroll scrollbar-hide h-[calc(100vh-220px)]">
      <div className="space-y-8">
        <h2 className="text-sm font-bold text-neutral-500">
          All Fields are required.
        </h2>
        <CaseTypesForm />
      </div>
    </div>
  );
}
