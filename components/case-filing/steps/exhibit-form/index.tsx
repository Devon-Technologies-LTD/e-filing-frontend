"use client";
import ExhibitFormFields from "./form";

export default function ExhibitForm() {
  return (
    <div className="lg:w-1/2 space-y-8">
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-neutral-500">
          Submission of Exhibits are optional but{" "}
          <span className="text-primary font-semibold">RECOMMENDED</span>
        </h2>
        <p className="text-sm font-medium text-neutral-500">
          Accepted Files - PNG, PDF, JPEG, JPG Formats
        </p>
      </div>
      <ExhibitFormFields />
    </div>
  );
}
