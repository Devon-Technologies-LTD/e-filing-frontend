import React from "react";
import CaseTypesForm from "./form";

export default function CaseTypes() {
  return (
    <div className="w-full mr-10 space-y-10 overflow-y-scroll scrollbar-hide h-[calc(100vh-220px)]">
      <div className="w-[354px] space-y-8">
        <h2 className="text-sm font-bold text-neutral-500">
          All Fields are required.
        </h2>
        <CaseTypesForm />
      </div>
    </div>
  );
}
