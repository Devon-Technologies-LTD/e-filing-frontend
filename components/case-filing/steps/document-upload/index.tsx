import React from "react";
import DocumentUploadForm from "./form";

export default function DocumentUpload() {
  return (
    <div className=" mx-auto space-y-8">
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-neutral-500">
          Select one document to upload at a time
        </h2>
      </div>
      <DocumentUploadForm />
    </div>
  );
}
