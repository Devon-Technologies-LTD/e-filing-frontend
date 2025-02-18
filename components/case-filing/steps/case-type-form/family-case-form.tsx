import { useAppSelector } from "@/hooks/redux";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaseTypeData, FamilyCaseSubType } from "../../constants";
import { useDispatch } from "react-redux";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { toast } from "sonner";
import {
    IDocumentFileType,
  removeFamilyCaseDocument,
  updateFamilyCaseDocument,
} from "@/redux/slices/case-filing-slice";

export default function FamilyCaseForm() {
  const dispatch = useDispatch();
  const [selectedDocType, setSelectedDocType] = useState<
    FamilyCaseSubType | ""
  >("");
  const uploadedDocuments = useAppSelector(
    (state) => state.caseFileForm.familyCaseDocuments
  );
  const availableDocTypes = Object.values(FamilyCaseSubType).filter(
    (doc) => !uploadedDocuments.some((uploaded) => uploaded.sub_title === doc)
  );
  const handleError = (error: any) => {
    toast.error("error");
    console.error("Upload/Update failed:", error);
  };

  const {
    caseType: { case_type, sub_case_type },
  } = useAppSelector((value) => value.caseFileForm);

  const handleDocTypeSelect = (value: FamilyCaseSubType) => {
    setSelectedDocType(value);
  };

  const handleSuccess = (data: any) => {
    if (selectedDocType) {
      toast.success("Upload successful");
      dispatch(updateFamilyCaseDocument(data?.data));
      setSelectedDocType("");
    }
  };

  const handleDeleteDocument = (id: string) => {
    console.log("id enteringgg", id)
    dispatch(removeFamilyCaseDocument(id));
  };

  return (
    <div className="space-y-6 lg:w-1/2">
      {uploadedDocuments.length > 0 && (
        <div className="space-y-6">
          {uploadedDocuments.map((data: IDocumentFileType) => (
            <DocumentUploadComponent
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
          labelName={selectedDocType}
          title={selectedDocType}
          caseType={case_type}
          subCase={selectedDocType}
          onSuccess={(data) => handleSuccess(data)}
          onError={handleError}
          documents={uploadedDocuments}
        />
      )}

      {availableDocTypes.length > 0 && (
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
