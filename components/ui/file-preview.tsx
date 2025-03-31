"use client";
import { useState } from "react";
import Image from "next/image";
import { FileIcon, ImageIcon, FileTextIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FilePreviewProps {
  preview: string | undefined;
  filename?: string;
  disabled?: boolean;
  className?: string;
  buttonText?: string;
}

export function FilePreview({
  preview,
  disabled,
  filename,
  className,
  buttonText = " Click to view file",
}: FilePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const [imageLoading, setImageLoading] = useState(true);
  // Extract file extension from URL or filename
  const getFileExtension = () => {
    const name = filename || preview;
    return name?.split(".").pop()?.toLowerCase() || "";
  };

  const fileExtension = getFileExtension();
  const isPdf = fileExtension === "pdf";
  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);

  // Get display filename
  const displayName = filename || preview?.split("/").pop() || "File";

  // Get appropriate icon based on file type
  const FileTypeIcon = () => {
    if (isPdf) return <FileTextIcon className="h-5 w-5" />;
    if (isImage) return <ImageIcon className="h-5 w-5" />;
    return <FileIcon className="h-5 w-5" />;
  };

  return (
    <div className={cn("w-full", className)}>
      <Button
        disabled={disabled}
        variant={"ghost"}
        onClick={() => setIsOpen(true)}
        className="uppercase mt-2 p-0 h-fit font-bold text-xs text-primary"
      >
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-0">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between w-full">
              <DialogTitle className="flex items-center">
                <FileTypeIcon />
                <span className="ml-2">{displayName}</span>
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="overflow-auto p-6 max-h-[calc(90vh-80px)]">
            {isPdf ? (
              <iframe
                title={displayName}
                className="w-full h-screen"
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  preview || ""
                )}&embedded=true`}
              ></iframe>
            ) : isImage ? (
              <div className="relative min-h-48 flex justify-center w-full">
                {" "}
                {/* {imageLoading && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                )} */}
                <img
                  src={preview}
                  alt={displayName}
                  width={1200}
                  height={800}
                  // onLoadingComplete={() => setImageLoading(false)}
                  // onError={() => setImageLoading(false)}
                  className="max-h-[50vh] w-auto object-contain"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FileTypeIcon />
                <p className="mt-4 text-center font-semibold">
                  This file type cannot be previewed directly.
                </p>
                {/* <Button className="mt-4" asChild>
                  <a
                    href={preview}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download File
                  </a>
                </Button> */}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
