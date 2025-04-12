import { useAppSelector } from "@/hooks/redux";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { toast } from "sonner";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";
import { CaseTypeData, FamilyDocumentTitles } from "@/constants";

export default function FamilyCaseForm() {
  const {
    caseType: { case_type },
    caseTypeErrors,
  } = useAppSelector((value) => value.caseFileForm);
  const [selectedDocType, setSelectedDocType] = useState<
    FamilyDocumentTitles | ""
  >("");
  const uploadedDocuments = useAppSelector((state) =>
    state.caseFileForm.documents?.filter((doc) =>
      Object.values(FamilyDocumentTitles).includes(
        doc.title as FamilyDocumentTitles
      )
    )
  );

  console.log("first", uploadedDocuments)

  const availableDocTypes = Object.values(FamilyDocumentTitles).filter(
    (doc) => !uploadedDocuments?.some((uploaded) => uploaded.title === doc)
  );

  const handleDocTypeSelect = (value: FamilyDocumentTitles) => {
    setSelectedDocType(value);
  };

  const handleSuccess = () => {
    if (selectedDocType) {
      setSelectedDocType("");
    }
  };

  return (
    <div className="space-y-10 lg:w-1/2">
      <div className="space-y-4">
        {uploadedDocuments?.map((data: IDocumentFileType) => (
          <DocumentUploadComponent
            allowedUploadTypes={["application/pdf"]}
            types={"PDF"}
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
            allowedUploadTypes={["application/pdf"]}
            types={"PDF"}
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
