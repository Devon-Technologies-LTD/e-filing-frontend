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
import {
  CivilOtherDocumentTitles,
  CriminalOtherDocumentTitles,
  FamilyDocumentTitles,
} from "@/constants";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";

export const OtherDocumentMapping: any = {
  ["CIVIL CASE"]: CivilOtherDocumentTitles,
  ["FAMILY CASE"]: FamilyDocumentTitles,
  ["CRIMINAL CASE"]: CriminalOtherDocumentTitles,
};

export default function DocumentUploadForm() {
  const [selectedDocType, setSelectedDocType] = useState<any | "">("");
  const {
    caseType: { case_type },
  } = useAppSelector((state) => state.caseFileForm);

  const uploadedDocuments = useAppSelector((state) =>
    state.caseFileForm.documents?.filter((doc) =>
      Object.values(OtherDocumentMapping[case_type])
        .map((value: any) => value?.toLowerCase())
        .includes(doc.title?.toLowerCase())
    )
  );

  const availableDocTypes: any = Object.values(
    OtherDocumentMapping[case_type]
  ).filter(
    (doc) => !uploadedDocuments?.some((uploaded) => uploaded.title === doc)
  );

  const handleDocTypeSelect = (value: any) => {
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
            {availableDocTypes.map((subCase: any) => (
              <SelectItem
                variant="underlined"
                key={subCase}
                value={subCase}
                className="py-2 uppercase"
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
