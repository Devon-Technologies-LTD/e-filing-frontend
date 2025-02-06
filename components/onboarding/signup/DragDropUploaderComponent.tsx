'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface DragDropUploaderProps {
    onFileUpload?: (files: File[]) => void;
    imageSrc: string;
}

export default function DragDropUploader({ onFileUpload, imageSrc }: DragDropUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (onFileUpload) {
            onFileUpload(acceptedFiles);
        }
    }, [onFileUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': [], 'image/png': [], 'application/pdf': [] },
        maxSize: 5 * 1024 * 1024,
    });

    return (
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-full md:max-w-[50%]">
                <Card
                    {...getRootProps()}
                    className="bg-zinc-100 h-[145px] mb-3 flex items-center justify-center cursor-pointer border border-dashed border-gray-400"
                >
                    <input {...getInputProps()} />
                    <p className="text-center text-sm font-medium text-gray-600">Click or Drag file here</p>
                </Card>
             
            </div>
            <div className="w-full  md:max-w-[50%]">
                <Image
                    src={imageSrc}
                    alt="legal-image"
                    className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out"
                    width={300}
                    height={200}
                />
            </div>
        </div>
    );
}
