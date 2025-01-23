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
import { useDocumentUpload } from "@/hooks/use-document-upload";

const allDocuments = [
  { id: 1, value: "charge-sheet", label: "CHARGE SHEET" },
  { id: 2, value: "motion-for-bail", label: "MOTION FOR BAIL" },
  { id: 3, value: "counter-affidavit", label: "COUNTER AFFIDAVIT" },
];

export default function DocumentUploadForm() {
  const [selectValue, setSelectValue] = useState<string>("");
  const { documents, addDocument, updateDocumentFile, removeDocument } =
    useDocumentUpload();

  // Get remaining document types that haven't been selected
  const remainingDocuments = allDocuments.filter(
    (doc) => !documents.some((uploaded) => uploaded.type === doc.value)
  );

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      updateDocumentFile(id, e.target.files[0]);
    }
  };

  const handleDocumentSelect = (value: string) => {
    addDocument(value);
    setSelectValue(""); // Reset select dropdown value
  };

  return (
    <div className="w-full space-y-8">
      {/* Show upload inputs for each selected document */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                variant={"underline"}
                className="uppercase"
                htmlFor={`file-upload-${doc.id}`}
              >
                Upload {allDocuments.find((d) => d.value === doc.type)?.label}
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeDocument(doc.id)}
              >
                <Icons.bin className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  id={`file-${doc.id}`}
                  type="file"
                  accept=".png,.pdf,.doc,.jpeg,.jpg"
                  onChange={(e) => handleFileChange(e, doc.id)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
                <Label
                  htmlFor={`file-${doc.id}`}
                  className="flex px-2 font-semibold items-center w-full rounded-md shadow-sm transition-colors border-0 border-b-2 border-app-secondary bg-zinc-100 h-10 focus:outline-none focus-visible:ring-b focus-visible:ring-input text-neutral-950 placeholder:text-zinc-400"
                >
                  <p className="text-sm opacity-60 text-neutral-950 font-semibold">
                    {doc.file
                      ? `Selected file: ${doc.file.name}`
                      : `Choose file`}
                  </p>
                </Label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document selection dropdown */}
      <div className="space-y-6">
        {remainingDocuments.length > 0 && (
          <Select value={selectValue} onValueChange={handleDocumentSelect}>
            <SelectTrigger variant="underlined" className="w-full text-base">
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
        )}
      </div>
    </div>
  );
}
