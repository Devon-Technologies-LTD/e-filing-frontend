import React from "react";
import CaseTypesForm from "./form";

export default function CaseTypes() {
  return (
    <div className="mr-10 space-y-10 overflow-y-scroll scrollbar-hide h-full">
      <div className="w-full space-y-8">
        <h2 className="text-sm font-bold text-neutral-500">
          All Fields are required.
        </h2>
        <CaseTypesForm />
      </div>
    </div>
  );
}
