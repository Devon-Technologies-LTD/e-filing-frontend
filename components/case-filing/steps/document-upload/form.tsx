"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { OtherDocuments } from "@/constants";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";

export default function DocumentUploadForm() {
  const [selectedDocType, setSelectedDocType] = useState<OtherDocuments | "">(
    ""
  );
  const {
    caseType: { case_type },
  } = useAppSelector((state) => state.caseFileForm);

  const uploadedDocuments = useAppSelector((state) =>
    state.caseFileForm.documents.filter(
      (doc) => Object.values(OtherDocuments).includes(doc.title as OtherDocuments)
    )
  );


  const availableDocTypes = Object.values(OtherDocuments).filter(
    (doc) => !uploadedDocuments?.some((uploaded) => uploaded.title === doc)
  );

  const handleDocTypeSelect = (value: OtherDocuments) => {
    setSelectedDocType(value);
  };

  const handleSuccess = (data: any) => {
    if (selectedDocType) {
      toast.success("Upload successful");
      setSelectedDocType("");
    }
  };

  return (
    <div className="space-y-6">
      {/* {uploadedDocuments?.length > 0 && ( */}
        <div className="space-y-6">
          {uploadedDocuments?.map((data: IDocumentFileType) => (
            <DocumentUploadComponent
              subTitle={"OTHER DOCUMENTS"}
              key={data.id}
              title={data.title}
              caseType={case_type}
              subCase={selectedDocType}
              canDelete={true}
              onSuccess={(data) => handleSuccess(data)}
            />
          ))}
        </div>
      {/* )} */}

      {selectedDocType && (
        <DocumentUploadComponent
          subTitle={"OTHER DOCUMENTS"}
          title={selectedDocType}
          caseType={case_type}
          subCase={selectedDocType}
          onSuccess={(data) => handleSuccess(data)}
        />
      )}

      {availableDocTypes?.length > 0 && (
        <Select value={selectedDocType} onValueChange={handleDocTypeSelect}>
          <SelectTrigger variant={"underlined"}>
            <SelectValue
              className="text-neutral-700 text-xs"
              placeholder={"Select a Document to Upload"}
            />
          </SelectTrigger>
          <SelectContent className="bg-white text-zinc-900">
            {availableDocTypes.map((subCase) => (
              <SelectItem
                variant="underlined"
                key={subCase}
                value={subCase}
                className="py-2"
              >
                {subCase}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
