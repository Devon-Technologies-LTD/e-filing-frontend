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
import DocumentUploadComponent from "@/components/ui/document-upload";
import { OtherDocuments } from "../../constants";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import {
  IDocumentFileType,
  removeOtherDocument,
  updateOtherDocument,
} from "@/redux/slices/case-filing-slice";

export default function DocumentUploadForm() {
  const dispatch = useDispatch();
  const [selectedDocType, setSelectedDocType] = useState<OtherDocuments | "">(
    ""
  );
  const {
    otherDocuments: uploadedDocuments,
    caseType: { case_type, sub_case_type },
  } = useAppSelector((state) => state.caseFileForm);

  const availableDocTypes = Object.values(OtherDocuments).filter(
    (doc) => !uploadedDocuments?.some((uploaded) => uploaded.sub_title === doc)
  );
  const handleError = (error: any) => {
    toast.error("error");
    console.error("Upload/Update failed:", error);
  };
  const handleDocTypeSelect = (value: OtherDocuments) => {
    setSelectedDocType(value);
  };

  const handleSuccess = (data: any) => {
    if (selectedDocType) {
      toast.success("Upload successful");
      dispatch(updateOtherDocument(data?.data));
      setSelectedDocType("");
    }
  };

  const handleDeleteDocument = (id: string) => {
    console.log("id enteringgg", id);
    dispatch(removeOtherDocument(id));
  };
  return (
    <div className="space-y-6">
      {uploadedDocuments?.length > 0 && (
        <div className="space-y-6">
          {uploadedDocuments?.map((data: IDocumentFileType) => (
            <DocumentUploadComponent
              subTitle={"OTHER DOCUMENTS"}
              key={data.id}
              labelName={data.sub_title}
              title={data.sub_title}
              caseType={case_type}
              subCase={selectedDocType}
              onSuccess={(data) => handleSuccess(data)}
              onError={handleError}
              onDelete={() => handleDeleteDocument(data.id)}
              documents={uploadedDocuments}
            />
          ))}
        </div>
      )}

      {selectedDocType && (
        <DocumentUploadComponent
          subTitle={"OTHER DOCUMENTS"}
          labelName={selectedDocType}
          title={selectedDocType}
          caseType={case_type}
          subCase={selectedDocType}
          onSuccess={(data) => handleSuccess(data)}
          onError={handleError}
          documents={uploadedDocuments}
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
