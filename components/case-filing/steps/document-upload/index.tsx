import React from "react";
import DocumentUploadForm from "./form";
import CaseOverviewAndType from "@/app/(app)/cases/view/[id]/refile-documents/components/upload-docs";

export default function DocumentUpload({
  isRefiling,
}: {
  isRefiling?: boolean;
}) {
  return (
    <div className="lg:w-1/2 space-y-8">
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-neutral-500">
          Select one document to upload at a time
        </h2>
      </div>
      {isRefiling ? <CaseOverviewAndType /> : ""}
      <DocumentUploadForm />
    </div>
  );
}
