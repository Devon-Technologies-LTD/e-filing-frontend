import React from "react";
import { Plus, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { useAppSelector } from "@/hooks/redux";
import { addExhibit, updateExhibitDocument, updateExhibitTitle, updateSubmittedExhibitsDocument } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";

export default function ExhibitFormFields() {
  const dispatch = useDispatch();
  const {
    caseType: { case_type, sub_case_type },
    exhibits: exhibitsDocument,
    submittedExhibitsDocument,
  } = useAppSelector((data) => data.caseFileForm);

  const handleSuccess = (data: any) => {
    dispatch(updateSubmittedExhibitsDocument(data.data));
  };

  const handleError = (error: any) => {
    console.error("Upload/Update failed:", error);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {exhibitsDocument.map((exhibit, index) => (
          <div key={exhibit.id} className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{index + 1}.</span>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <Label variant={"underline"} htmlFor={`title-${exhibit.id}`}>
                  NAME/TITLE OF EXHIBITS
                </Label>
              </div>

              {/* {exhibitsDocument.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExhibit(exhibit.id)}
                >
                  <Icons.bin className="h-4 w-4" />
                </Button>
              )} */}
            </div>

            <div className="grid gap-4">
              {/* <Input
                id={`title-${exhibit.id}`}
                value={exhibit.title}
                variant="underlined"
                onChange={(e) => updateExhibitTitle(exhibit.id, e.target.value)}
                placeholder="e.g evidence documents"
              />

              <div className="space-y-2">
                <Label variant={"underline"} htmlFor={`file-${exhibit.id}`}>
                  UPLOAD EXHIBIT FILE
                </Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      id={`file-${exhibit.id}`}
                      type="file"
                      accept=".png,.pdf,.doc,.jpeg,.jpg"
                      onChange={(e) =>
                        handleFileChange(exhibit.id, e.target.files)
                      }
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <div className="flex items-center gap-3 font-semibold px-2 w-full rounded-md shadow-sm transition-colors border-0 border-b-2 border-app-secondary bg-zinc-100 h-10 focus:outline-none focus-visible:ring-b focus-visible:ring-input text-neutral-950 placeholder:text-zinc-400">
                      {exhibit.fileName ? (
                        <>
                          <Icons.documents />
                          {exhibit.fileName}
                        </>
                      ) : (
                        "Choose File"
                      )}{" "}
                    </div>
                  </div>
                  {exhibit.fileName && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateExhibitFile(exhibit.id, undefined, "")
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div> */}
              <Input
                id={`title-${exhibit.id}`}
                value={exhibit.title}
                variant="underlined"
                onChange={(e) =>
                  dispatch(
                    updateExhibitTitle({
                      exhibitId: exhibit.id,
                      title: e.target.value,
                    })
                  )
                }
                placeholder="e.g evidence documents"
              />

              <DocumentUploadComponent
                subTitle={"EXHIBITS"}
                labelName={"exhibit file"}
                title={exhibit.title}
                caseType={case_type}
                subCase={sub_case_type}
                onSuccess={(data) => handleSuccess(data)}
                onError={handleError}
                documents={submittedExhibitsDocument}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size={"lg"}
        className="w-auto hover:bg-red-50 px-2 border-2"
        onClick={() => {
          dispatch(addExhibit());
        }}
      >
        <Plus className="h-4 w-4 " />
        ADD NEW EXHIBIT
      </Button>
    </div>
  );
}
