'use client';

import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function UploadPdf() {
    const [pdfFile, setPdfFile] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (fileRejections.length > 0) {
                toast.error("Invalid file type. Please upload a PDF.");
                return;
            }
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const objectUrl = URL.createObjectURL(file);
                setPdfFile(objectUrl);
                toast.success("PDF uploaded successfully!");
            }
        },
        []
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'application/pdf': [] },
        maxSize: 5 * 1024 * 1024,
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-full">
                    <Card
                        {...getRootProps()}
                        className="h-[145px] mb-3 flex items-center bg-[#FDF5EC] justify-center cursor-pointer"
                    >
                        <input {...getInputProps()} />
                        <p className="text-center text-sm font-medium text-gray-600">
                            {pdfFile ? (
                                <iframe
                                    src={pdfFile}
                                    className="w-full h-[120px] border rounded"
                                    title="PDF Preview"
                                />
                            ) : (
                                "Click or drag a PDF file here"
                            )}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
