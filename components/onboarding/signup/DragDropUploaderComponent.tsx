'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function DragDropUploader() {
    const [frontImage, setFrontImage] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const objectUrl = URL.createObjectURL(file);
            setFrontImage(objectUrl);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': [], 'image/png': [] },
        maxSize: 5 * 1024 * 1024,
    });

    return (
        <div className="space-y-6">
            {/* Front Side Upload */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-full md:max-w-[50%]">
                    <Card
                        {...getRootProps()}
                        className="bg-zinc-100 h-[145px] mb-3 flex items-center justify-center cursor-pointer border border-dashed border-gray-400"
                    >
                        <input name="image" {...getInputProps()} />
                        <p className="text-center text-sm font-medium text-gray-600">
                            {frontImage ? "Replace Front ID" : "Click or Drag file here"}
                        </p>
                    </Card>
                </div>

                <div className="w-full md:max-w-[50%] flex justify-center items-center">
                    {frontImage ? (
                        <div className="max-h-[200px] overflow-hidden">
                            <Image
                                src={frontImage}
                                alt="Front ID"
                                className="object-contain"
                                width={300}
                                height={200}
                            />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No front ID uploaded yet.</p>
                    )}
                </div>
            </div>
            <div>
                <p className="text-sm font-bold text-app-primary">FRONT PAGE VIEW</p>
                <p className="text-xs font-bold text-neutral-600 mt-2">
                    Please upload a clear and legible image of your ID card. Accepted formats are JPG or PNG, with a maximum file size of 5MB.
                </p>
            </div>
        </div>
    );
}
