"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/svg/icons";
import { Input } from "@/components/ui/input";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";
import { useCaseFile } from "../components/case-file-context";
import { FilePreview } from "@/components/ui/file-preview";

function CaseTypeSection({
  caseType,
  subCaseType,
}: {
  caseType: string;
  subCaseType?: string;
}) {
  return (
    <div className="space-y-8">
      <div className="flex font-semibold justify-between items-center border-b-2 border-primary">
        <p>Case Type</p>
        <p>Amount</p>
      </div>
      <div className="grid grid-cols-5 space-y-8">
        <div className="col-span-3 space-y-8">
          <Select>
            <SelectTrigger lock disabled variant="underlined">
              <SelectValue
                className="text-neutral-700 text-xs"
                placeholder={caseType}
              />
            </SelectTrigger>
            <SelectContent className="bg-white text-zinc-900" />
          </Select>
          {subCaseType && (
            <Select>
              <SelectTrigger lock disabled variant="underlined">
                <SelectValue
                  className="text-neutral-700 text-xs"
                  placeholder={subCaseType}
                />
              </SelectTrigger>
              <SelectContent className="bg-white text-zinc-900" />
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}

function DocumentItem({ doc }: { doc: IDocumentFileType }) {
  return (
    <div className="space-y-1">
      <Label
        variant="underline"
        className="uppercase text-primary flex justify-between w-full items-center gap-3"
        htmlFor={`file-upload-${doc.title}`}
      >
        {doc.title}
      </Label>
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <Input
            id={`file-upload-${doc.title}`}
            type="file"
            disabled
            className="hidden opacity-0 absolute inset-0 w-full h-full cursor-pointer disabled:border-0 disabled:ring-0"
          />
          <Label
            htmlFor={`file-${doc.title}`}
            className="flex px-2 justify-between font-semibold items-center w-full rounded-md shadow-sm transition-colors border-0 border-b-2 border-app-secondary bg-zinc-100 h-10 focus:outline-none focus-visible:ring-b focus-visible:ring-input text-neutral-950 placeholder:text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <Icons.documents />
              {doc.notes || ""}
            </div>
            <Icons.lock />
          </Label>
          <p className="uppercase font-bold text-xs text-primary">
            <FilePreview
              preview={doc.file_path}
              filename={doc.notes}
            />
          </p>
        </div>
      </div>
    </div>
  );
}

function DocumentsSection({ documents }: { documents: IDocumentFileType[] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between font-semibold items-center border-b-2 border-primary">
        <p>Uploaded Documents</p>
        <p>Amount</p>
      </div>
      <div className="w-full">
        <div className="space-y-6">
          {documents
            .filter((doc) => doc?.case_type_name?.toLowerCase() !== "exhibits")
            .map((doc, index) => (
              <div key={index} className="grid grid-cols-5 items-center">
                <div className="col-span-3">
                  <DocumentItem doc={doc} />
                </div>
                <div></div>
                <div className="col-span-1 text-right font-semibold">
                  ₦ {doc.amount}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
function ExhibitsSection({ documents }: { documents: IDocumentFileType[] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between font-semibold items-center border-b-2 border-primary">
        <p>Submitted Exhibits</p>
        <p>Amount</p>
      </div>
      <div className="w-full">
        <div className="space-y-6">
          {documents
            .filter((doc) => doc?.case_type_name?.toLowerCase() === "exhibits")
            .map((doc, index) => (
              <div key={index} className="grid grid-cols-5 items-center">
                <div className="col-span-3">
                  <DocumentItem doc={doc} />
                </div>
                <div></div>
                <div className="col-span-1 font-semibold text-right">
                  ₦ {doc.amount}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const { data } = useCaseFile();

  if (!data) return null;

  return (
    <div className="space-y-10 pb-6 overflow-y-scroll scrollbar-hide h-full">
      <div className="w-full space-y-8">
        <div className="w-3/4 space-y-8">
          <CaseTypeSection
            caseType={data.case_type_name}
            subCaseType={data.sub_case_type_name}
          />
          <DocumentsSection documents={data.documents} />
          <ExhibitsSection documents={data.documents} />
        </div>
      </div>
    </div>
  );
}
