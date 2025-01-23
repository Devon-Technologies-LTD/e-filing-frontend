import React from "react";
import CaseOverviewForm from "../case-overview/form";
import CaseTypesForm from "../case-type-form/form";
import DocumentUploadForm from "../document-upload/form";
import ExhibitFormFields from "../exhibit-form/form";

export default function PreviewPage() {
  return (
    <div className="max-w-2xl space-y-10">
      {/* case Overview */}
      <div className=" space-y-8">
        <section className="border-b-2 border-primary py-2">
          <p className="text-lg font-bold text-black">Case Overview </p>
          <h2 className="text-sm font-medium text-black">
            General Overview of the case you want to file{" "}
          </h2>
        </section>
        <section className="w-1/2">
          <CaseOverviewForm />
        </section>
      </div>
      {/* case type */}
      <div className=" space-y-8">
        <section className="border-b-2 border-primary py-2">
          <p className="text-lg font-bold text-black">Case Type </p>
          <h2 className="text-sm font-medium text-black">
            Information and details of the type of case{" "}
          </h2>
        </section>
        <section className="w-1/2">
          <CaseTypesForm />
        </section>
      </div>
      {/* uploaded Document */}
      <div className=" space-y-8">
        <section className="border-b-2 border-primary py-2">
          <p className="text-lg font-bold text-black">Uploaded Documents </p>
          <h2 className="text-sm font-medium text-black">
            Information and details of the type of case{" "}
          </h2>
        </section>
        <section className="w-1/2">
          <DocumentUploadForm />
        </section>
      </div>{" "}
      {/* uploaded exhibits */}
      <div className=" space-y-8">
        <section className="border-b-2 border-primary py-2">
          <p className="text-lg font-bold text-black">Submitted Exhibits </p>
          <h2 className="text-sm font-medium text-black">
            Upload and organize your case exhibits.{" "}
          </h2>
        </section>
        <section className="w-1/2">
          <ExhibitFormFields />
        </section>
      </div>
    </div>
  );
}
