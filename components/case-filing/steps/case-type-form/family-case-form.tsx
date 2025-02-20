import { useAppSelector } from "@/hooks/redux";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaseTypeData, FamilyCaseSubType } from "@/constants";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { toast } from "sonner";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";

export default function FamilyCaseForm() {
  const {
    caseType: { case_type },
    caseTypeErrors,
  } = useAppSelector((value) => value.caseFileForm);
  const [selectedDocType, setSelectedDocType] = useState<
    FamilyCaseSubType | ""
  >("");
  const uploadedDocuments = useAppSelector((state) =>
    state.caseFileForm.documents?.filter((doc) =>
      Object.values(FamilyCaseSubType).includes(doc.title as FamilyCaseSubType)
    )
  );

  console.log("first", uploadedDocuments)

  const availableDocTypes = Object.values(FamilyCaseSubType).filter(
    (doc) => !uploadedDocuments?.some((uploaded) => uploaded.title === doc)
  );

  const handleDocTypeSelect = (value: FamilyCaseSubType) => {
    setSelectedDocType(value);
  };

  const handleSuccess = () => {
    if (selectedDocType) {
      toast.success("Upload successful");
      setSelectedDocType("");
    }
  };

  return (
    <div className="space-y-10 lg:w-1/2">
      <div className="space-y-4">
        {uploadedDocuments?.map((data: IDocumentFileType) => (
          <DocumentUploadComponent
            errorMessage={caseTypeErrors.familyDoc}
            subTitle={CaseTypeData.FAMILY_CASE}
            key={data.id}
            title={data.title}
            caseType={case_type}
            subCase={selectedDocType}
            onSuccess={() => handleSuccess()}
            canDelete={true}
          />
        ))}
      </div>

      <div className="space-y-6">
        {selectedDocType && (
          <DocumentUploadComponent
            subTitle={CaseTypeData.FAMILY_CASE}
            title={selectedDocType}
            caseType={case_type}
            subCase={selectedDocType}
            onSuccess={() => handleSuccess()}
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
    </div>
  );
}
