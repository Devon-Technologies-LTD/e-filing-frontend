"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./label";
import { Button } from "./button";
import { Icons } from "../svg/icons";
import { Input } from "./input";
import { useAppSelector } from "@/hooks/redux";

import {
  deleteDocumentAction,
  updateDocumentAction,
  uploadDocumentAction,
} from "@/lib/actions/documents";
import { useMutation } from "@tanstack/react-query";
import {
  deleteDocument,
  updateDocument,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { allowedUploadTypes, DOCUMENT_MAX_SIZE } from "@/constants";
import { DeleteDocumentPayload } from "@/lib/_services/document-service";
import { ConfirmationModal } from "../confirmation-modal";
import { AlertDialogCancel, AlertDialogFooter } from "./alert-dialog";
import { Loader } from "lucide-react";

interface Iprops {
  caseType?: string;
  subCase?: string;
  notes?: string;
  title: string;
  subTitle: string;
  canDelete?: boolean;
  disabled?: boolean;
  required?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  errorMessage?: string;
}

export default function DocumentUploadComponent({
  caseType,
  title,
  disabled = false,
  notes,
  onSuccess,
  onError,
  required,
  errorMessage,
  canDelete = false,
}: Iprops) {
  const {
    caseType: { case_file_id },
    documents,
  } = useAppSelector((state) => state.caseFileForm);

  const dispatch = useDispatch();
  const existingDocument =
    documents?.find(
      (doc: any) => doc.title?.toLowerCase() === title?.toLowerCase()
    ) || null;
  const documentId = existingDocument?.id;
  const [isOpen, setIsOpen] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: (data: FormData) => uploadDocumentAction(data),
    onSuccess: (data) => {
      if (data?.success) {
        if (onSuccess) onSuccess(data);
        dispatch(updateDocument(data?.data as any));
      } else {
        throw new Error(JSON.stringify(data));
      }
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (data: DeleteDocumentPayload) => deleteDocumentAction(data),
    onSuccess: (data) => {
      if (data?.success) {
        dispatch(deleteDocument(title));
      } else {
        throw new Error(JSON.stringify(data));
      }
      setIsOpen(false);
    },
    onError: (error) => {
      const errorMsg = JSON.parse(error?.message)?.data;
      toast.error(errorMsg);
      if (onError) onError(error);
      setIsOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: FormData) => updateDocumentAction(data),
    onSuccess: (data) => {
      if (data?.success) {
        if (onSuccess) onSuccess(data);
      } else {
        throw new Error(JSON.stringify(data));
      }
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);
    if (!file) return;
    if (!allowedUploadTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Only PDFs and images are allowed for upload."
      );
      e.target.value = "";
      return;
    }
    if (file.size > DOCUMENT_MAX_SIZE) {
      toast.error("File size exceeds 10MB limit.");
      e.target.value = "";
      return;
    }

    uploadMutation.reset();
    updateMutation.reset();
    const formData = new FormData();
    formData.append("casefile_id", case_file_id);
    formData.append("case_type_name", caseType || title);
    formData.append("file", file);
    formData.append("sub_title", file.name);
    formData.append("title", title);
    formData.append("notes", notes || "");

    if (existingDocument) {
      updateMutation.mutate(formData, {
        onSettled: () => {
          e.target.value = "";
        },
      });
    } else {
      uploadMutation.mutate(formData, {
        onSettled: () => {
          e.target.value = "";
        },
      });
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label
          variant={errorMessage ? "error" : "underline"}
          className="uppercase flex justify-between w-full items-center gap-3"
          htmlFor={`file-upload-${title}`}
        >
          <span>
            {" "}
            Upload {title}{" "}
            {required ? <span className="text-red-600">*</span> : ""}
          </span>
          <span className="text-xs capitalize">
            {errorMessage ? errorMessage : ""}
          </span>
        </Label>
        {canDelete && (
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            type="button"
            variant="ghost"
            size="icon"
          >
            <Icons.bin className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            disabled={
              uploadMutation.isPending || updateMutation.isPending || disabled
            }
            id={`file-${title}`}
            type="file"
            accept=".png,.pdf,.doc,.jpeg,.jpg"
            onChange={handleFileChange}
            className="hidden opacity-0 absolute inset-0 w-full h-full cursor-pointer disabled:border-0 disabled:ring-0"
          />
          <Label
            htmlFor={`file-${title}`}
            className=" flex px-2 justify-between font-semibold  items-center w-full rounded-md shadow-sm transition-colors border-0 border-b-2 border-app-secondary bg-zinc-100 h-10 focus:outline-none focus-visible:ring-b focus-visible:ring-input text-neutral-950 placeholder:text-zinc-400"
          >
            {existingDocument ? (
              <span className="flex items-center gap-2">
                <Icons.documents />
                {existingDocument?.sub_title}
              </span>
            ) : (
              <span>
                Choose File{" "}
                <span className="text-xs text-gray-500">
                  (Max size: {DOCUMENT_MAX_SIZE / (1024 * 1024)}MB, Allowed
                  types: PNG, PDF, JPEG, JPG)
                </span>
              </span>
            )}
            {uploadMutation.isSuccess ||
            updateMutation.isSuccess ||
            existingDocument ? (
              <Icons.outlineCheck className="h-4 w-4" />
            ) : (
              ""
            )}
          </Label>
        </div>
      </div>
      {uploadMutation.isPending || updateMutation.isPending ? (
        <p className="text-xs font-semibold">Uploading...</p>
      ) : null}
      {uploadMutation.isError || updateMutation.isError ? (
        <p className="text-xs font-semibold text-red-900">
          Error Uploading File:{" "}
          {uploadMutation?.error
            ? `${JSON.parse(uploadMutation?.error?.message)?.message} ${
                JSON.parse(uploadMutation?.error?.message)?.errors?.error ?? ""
              }`
            : updateMutation?.error
            ? JSON.parse(updateMutation?.error?.message)?.message
            : ""}
        </p>
      ) : null}

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
                if (documentId) {
                  const payload = {
                    document_ids: [documentId],
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
