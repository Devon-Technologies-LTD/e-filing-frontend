import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Icons } from "./svg/icons";

interface FileInputProps {
    id: string;
    label: string;
    exhibit: {
        id: string;
        fileName: string | null;
    };
    handleFileChange: (id: string, files: FileList | null) => void;
}

export const FileInputField = ({
    id,
    label,
    exhibit,
    handleFileChange,
}: FileInputProps) => {
    const [fileName, setFileName] = useState<string | null>(exhibit.fileName);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const selectedFileName = files && files[0] ? files[0].name : null;
        setFileName(selectedFileName);
        handleFileChange(exhibit.id, files);
    };

    return (
        <div className="space-y-2">
            <Label variant={"underline"} htmlFor={`file-${id}`}>
                {label}
            </Label>
            <div className="relative flex-1">
                <Input
                    id={`file-${id}`}
                    name={id}
                    type="file"
                    placeholder="Choose File"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    onChange={onFileChange}
                />
                <div className="flex items-center gap-3 font-semibold px-2 w-full rounded-md shadow-sm transition-colors border-0 border-b-2 border-app-secondary bg-zinc-100 h-10 focus:outline-none focus-visible:ring-b focus-visible:ring-input text-neutral-950 placeholder:text-zinc-400">
                    {fileName ? (
                        <>
                            <Icons.documents />
                            {fileName}
                        </>
                    ) : (
                        "Choose File"
                    )}
                </div>
            </div>
        </div>
    );
};
