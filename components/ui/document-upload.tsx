"use client";
import React from "react";
import { Label } from "./label";
import { Button } from "./button";
import { Icons } from "../svg/icons";
import { Input } from "./input";
import { useAppSelector } from "@/hooks/redux";

import {
  updateDocumentAction,
  uploadDocumentAction,
} from "@/lib/actions/documents";
import { useMutation } from "@tanstack/react-query";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";

interface Iprops {
  labelName: string;
  documents: IDocumentFileType[];
  caseType?: string;
  subCase?: string;
  title: string;
  subTitle: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onDelete?: () => void;
}

export default function DocumentUploadComponent({
  labelName,
  caseType,
  title,
  subTitle,
  onDelete,
  onSuccess,
  onError,
  documents,
}: Iprops) {
  const {
    caseFile: { case_file_id },
  } = useAppSelector((state) => state.caseFileForm);
  const existingDocument =
    documents?.find((doc) => doc.title === title) || null;
  const uploadMutation = useMutation({
    mutationFn: (data: FormData) => uploadDocumentAction(data),
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

  const updateMutation = useMutation({
    mutationFn: (data: FormData) => updateDocumentAction(data),
    onSuccess: (data) => {
      if (data?.success) {
        if (onSuccess) onSuccess(data);
      } else {
        throw new Error("Operation failed");
      }
    },
    onError: (error) => {
      console.log("mutation error block", error);
      if (onError) onError(error);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadMutation.reset();
    updateMutation.reset();
    const formData = new FormData();
    formData.append("casefile_id", case_file_id);
    formData.append("case_type_name", caseType || title);
    formData.append("file", file);
    formData.append("sub_title", subTitle);
    formData.append("title", title);

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
          variant={"underline"}
          className="uppercase"
          htmlFor={`file-upload-${labelName}`}
        >
          Upload {labelName}
        </Label>
        {onDelete && (
          <Button onClick={onDelete} type="button" variant="ghost" size="icon">
            <Icons.bin className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            disabled={uploadMutation.isPending || updateMutation.isPending}
            id={`file-${labelName}`}
            type="file"
            accept=".png,.pdf,.doc,.jpeg,.jpg"
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
          <Label
            htmlFor={`file-${labelName}`}
            className="flex px-2 justify-between font-semibold items-center w-full rounded-md shadow-sm transition-colors border-0 border-b-2 border-app-secondary bg-zinc-100 h-10 focus:outline-none focus-visible:ring-b focus-visible:ring-input text-neutral-950 placeholder:text-zinc-400"
          >
            {existingDocument ? existingDocument?.title : "Choose File"}
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
        <p className="text-xs font-semibold">Error uploading file.</p>
      ) : null}
    </div>
  );
}
