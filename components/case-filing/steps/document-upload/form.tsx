"use client";
import { useState } from "react";
import DocumentUploadComponent from "@/components/ui/document-upload";
import {
  CivilOtherDocumentTitles,
  CriminalOtherDocumentTitles,
  FamilyDocumentTitles,
} from "@/constants";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";
import { HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOtherDocumentsByCaseType } from "@/lib/actions/public";

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

  const { data, isLoading: loading } = useQuery({
    queryKey: ["case_types_documents", case_type],
    queryFn: () => getOtherDocumentsByCaseType("other documents", case_type),
    enabled: !!case_type,
    staleTime: 50000,
  });
  const documentTitles = data?.data
    ? data?.data?.map((doc: any) => doc.title)
    : null;

  const uploadedDocuments = useAppSelector((state) =>
    state.caseFileForm.documents?.filter((doc) =>
      documentTitles?.includes(doc.title)
    )
  );

  const availableDocTypes = data?.data
    ? data.data.filter(
        (doc: any) =>
          !uploadedDocuments.some(
            (uploaded) =>
              uploaded.title.trim().toLowerCase() ===
              doc.title.trim().toLowerCase()
          )
      )
    : [];

  const handleSuccess = (data: any) => {
    console.log("first", data);
    if (selectedDocType) {
      toast.success("Upload successful");
      setSelectedDocType("");
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        {uploadedDocuments?.map((data: IDocumentFileType) => (
          <DocumentUploadComponent
            subTitle={"OTHER DOCUMENTS"}
            key={data.id}
            title={data.title}
            caseType={case_type}
            subCase={"other documents"}
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
          subCase={"other documents"}
          onSuccess={(data) => handleSuccess(data)}
        />
      )}

      {availableDocTypes?.length > 0 && (
        <div className="">
          <div className="h-10 px-3 py-2 flex w-full items-center justify-between ring-offset-background placeholder:text-muted-foreground  focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border-app-tertiary bg-background hover:border-primary border-0 border-b-2 border-input bg-zinc-200 rounded-none focus:outline-none focus-visible:ring-b focus-visible:border-border font-semibold text-zinc-600 placeholder:text-zinc-400">
            <span className="">Select a Document to Upload</span>
            <HelpCircle className="h-4 w-4 text-gray-700" />
          </div>

          <div className=" bg-zinc-100 py-4 space-y-1 shadow-md">
            {availableDocTypes.map((doc: any, index: any) => (
              <div
                key={index}
                className={`p-2 uppercase px-4 text-sm cursor-pointer text-zinc-900  hover:bg-secondary-foreground hover:bg-gray-50 ${
                  selectedDocType === doc.title
                    ? "bg-secondary-foreground font-bold"
                    : "font-semibold"
                }`}
                onClick={() => setSelectedDocType(doc.title)}
              >
                {doc?.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
