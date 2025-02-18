import React, { useEffect, useMemo, useState, useRef } from "react";
import { Plus, X, HelpCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { useAppSelector } from "@/hooks/redux";
import { useDispatch } from "react-redux";
import { deleteDocument } from "@/redux/slices/case-filing-slice";
import { Icons } from "@/components/svg/icons";
import { ConfirmationModal } from "@/components/confirmation-modal";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { DeleteDocumentPayload } from "@/lib/_services/document-service";
import { deleteDocumentAction } from "@/lib/actions/documents";

export default function ExhibitFormFields() {
  const dispatch = useDispatch();
  const {
    caseType: { case_type, sub_case_type },
  } = useAppSelector((data) => data.caseFileForm);

  const defaultExhibit = [
    {
      title: "",
      sub_title: "",
      case_type_name: "",
      casefile_id: "",
      id: "1",
      status: "",
      sequence_number: "",
      user_id: "",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const exhibitsDocument = useAppSelector((state) =>
    state.caseFileForm.documents.filter(
      (doc) => doc.case_type_name === "EXHIBITS"
    )
  );

  const memoizedExhibitsDocument = useMemo(
    () => exhibitsDocument,
    [exhibitsDocument]
  );

  const [exhibits, setExhibits] = useState(
    memoizedExhibitsDocument.length > 0
      ? memoizedExhibitsDocument
      : defaultExhibit
  );
  const [documentToDelete, setDocumentToDelete] = useState<
    (typeof exhibits)[0] | undefined
  >(undefined);

  // Ref to track previous exhibits
  const exhibitsRef = useRef(exhibits);

  useEffect(() => {
    if (memoizedExhibitsDocument.length > 0) {
      // Only update if exhibits have changed
      if (
        JSON.stringify(memoizedExhibitsDocument) !==
        JSON.stringify(exhibitsRef.current)
      ) {
        setExhibits(memoizedExhibitsDocument);
        exhibitsRef.current = memoizedExhibitsDocument; // Update ref
      }
    }
  }, [memoizedExhibitsDocument]);

  const handleAddExhibit = () => {
    const newExhibit = {
      id: crypto.randomUUID(),
      title: "",
      sub_title: "",
      case_type_name: "",
      casefile_id: "",
      status: "",
      sequence_number: "",
      user_id: "",
    };

    setExhibits((prev) => [...prev, newExhibit]);
  };

  const handleTitleChange = (id: string, newTitle: string) => {
    setExhibits((prevExhibits) =>
      prevExhibits.map((exhibit) =>
        exhibit.id === id ? { ...exhibit, title: newTitle } : exhibit
      )
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (data: DeleteDocumentPayload) => deleteDocumentAction(data),
    onSuccess: (data) => {
      console.log("first", data);
      if (data?.success) {
        dispatch(deleteDocument(documentToDelete?.title as any));
      } else {
        throw new Error(JSON.stringify(data));
      }
      setIsOpen(false);
    },
    onError: (error) => {
      console.log("first", error);
    },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {exhibits.map((exhibit, index) => (
          <div key={exhibit.id} className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{index + 1}.</span>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <Label variant={"underline"} htmlFor={`title-${exhibit.id}`}>
                  NAME/TITLE OF EXHIBITS
                </Label>
              </div>
              <Button
                onClick={() => {
                  const hasDocument = exhibitsDocument.some(
                    (doc) => doc.title === exhibit.title
                  );

                  if (hasDocument) {
                    setIsOpen(true);
                    setDocumentToDelete(exhibit);
                  } else {
                    // Remove exhibit from state if no document exists
                    setExhibits((prevExhibits) =>
                      prevExhibits.filter((item) => item.id !== exhibit.id)
                    );
                  }
                }}
                type="button"
                variant="ghost"
                size="icon"
              >
                <Icons.bin className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <Input
                id={`title-${exhibit.id}`}
                value={exhibit.title}
                variant="underlined"
                onChange={(e) => handleTitleChange(exhibit.id, e.target.value)}
                placeholder="e.g evidence documents"
              />

              <DocumentUploadComponent
                disabled={!exhibit.title}
                subTitle={exhibit.title}
                title={
                  exhibit.title
                    ? exhibit.title
                    : ": Enter a title before uploading"
                }
                caseType={"EXHIBITS"}
                subCase={sub_case_type}
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
        onClick={handleAddExhibit}
      >
        <Plus className="h-4 w-4 " />
        ADD NEW EXHIBIT
      </Button>

      <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-1 pt-2">
            <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
              <Icons.infocircle />
            </div>
            <div className="text-center text-primary space-y-2">
              <p className="font-bold text-xl">Delete this Document?</p>
              <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
                Are you sure you want to delete this document?
              </p>
            </div>
          </div>

          <AlertDialogFooter className="flex items-center sm:justify-center w-full">
            <Button
              disabled={deleteMutation.isPending}
              className=" text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
              onClick={() => {
                if (documentToDelete?.id) {
                  const payload = {
                    document_ids: [documentToDelete?.id],
                  };
                  deleteMutation.mutate(payload);
                } else {
                  toast.error("Document ID not found");
                }
              }}
            >
              {deleteMutation.isPending ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                "YES, DELETE"
              )}
            </Button>

            <AlertDialogCancel
              className="font-extrabold text-red-500 text-xs uppercase"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </ConfirmationModal>
    </div>
  );
}
