"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/svg/icons";

interface UploadedFile {
  type: string;
  file: File | null;
}

export default function DocumentUploadForm() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  // Add state to control Select value
  const [selectValue, setSelectValue] = useState<string>("");

  // All possible document types
  const allDocuments = [
    { value: "charge-sheet", label: "CHARGE SHEET" },
    { value: "motion-for-bail", label: "MOTION FOR BAIL" },
    { value: "counter-affidavit", label: "COUNTER AFFIDAVIT" },
  ];

  // Get remaining documents that haven't been uploaded
  const remainingDocuments = allDocuments.filter(
    (doc) => !uploadedFiles.some((uploaded) => uploaded.type === doc.value)
  );

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    documentType: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];

      setUploadedFiles((prev) => {
        // Check if the document type already exists
        const existingIndex = prev.findIndex(
          (uploaded) => uploaded.type === documentType
        );

        if (existingIndex !== -1) {
          // Replace the existing file entry
          const updatedFiles = [...prev];
          updatedFiles[existingIndex] = { type: documentType, file: newFile };
          return updatedFiles;
        } else {
          // Add a new entry
          return [...prev, { type: documentType, file: newFile }];
        }
      });
    }
  };

  const handleDocumentSelect = (value: string) => {
    setUploadedFiles((prev) => {
      const existingIndex = prev.findIndex(
        (uploaded) => uploaded.type === value
      );

      if (existingIndex !== -1) {
        // If it exists, do not add another entry; just reset the file to null
        return prev.map((upload, index) =>
          index === existingIndex ? { ...upload, file: null } : upload
        );
      } else {
        // If it doesn't exist, add a new empty upload slot
        return [...prev, { type: value, file: null as unknown as File }];
      }
    });

    // Reset the select value to show placeholder again
    setSelectValue("");
  };

  const removeUpload = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  console.log("uploadedFiles", uploadedFiles);
  return (
    <div className="w-full space-y-8">
      {/* Show upload inputs for each selected document */}
      <div className="space-y-4">
        {uploadedFiles.map((upload, index) => {
          const documentLabel = allDocuments.find(
            (doc) => doc.value === upload.type
          )?.label;
          return (
            <div key={`${upload.type}-${index}`} className="space-y-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    variant={"underline"}
                    className="uppercase"
                    htmlFor={`file-upload-${index}`}
                  >
                    Upload {documentLabel}
                  </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeUpload(index)}
                    >
                      <Icons.bin className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      id={`file-${index}`}
                      type="file"
                      accept=".png,.pdf,.doc,.jpeg,.jpg"
                      onChange={(e) => handleFileChange(e, upload.type)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <Label
                      htmlFor={`file-${index}`}
                      className="flex px-2 font-semibold items-center w-full rounded-md shadow-sm transition-colors border-0 border-b-2 border-app-secondary bg-zinc-100 h-10 focus:outline-none focus-visible:ring-b focus-visible:ring-input text-neutral-950 placeholder:text-zinc-400"
                    >
                      <p className="text-sm opacity-60 text-neutral-950 font-semibold">
                        {upload.file
                          ? `Selected file: ${upload.file.name}`
                          : `Choose file`}
                      </p>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          {/* Only show select if there are remaining documents */}
          {remainingDocuments.length > 0 && (
            <div className="space-y-2">
              <Select value={selectValue} onValueChange={handleDocumentSelect}>
                <SelectTrigger
                  variant="underlined"
                  className="w-full text-base"
                >
                  <SelectValue placeholder="Select a Document to Upload" />
                </SelectTrigger>
                <SelectContent>
                  {remainingDocuments.map((doc) => (
                    <SelectItem
                      variant="underlined"
                      className="py-2"
                      key={doc.value}
                      value={doc.value}
                    >
                      {doc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
