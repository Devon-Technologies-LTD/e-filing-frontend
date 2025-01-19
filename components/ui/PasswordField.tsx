'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { EyeIcon } from "lucide-react";

import React from 'react';

interface PasswordFieldProps {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
    id,
    name,
    label,
    placeholder,
    required = false,
}) => {
    return (
        <div className="relative w-full">
            <Label className='text-xs text-muted text-neutral-600'>{label}</Label>
            <div className="flex items-center">
                <Input
                    id={id}
                    name={name}
                    type="password"
                    placeholder={placeholder}
                    required={required}
                    autoComplete="off"
                    className="w-full border-0 border-b-[1px] placeholder:text-xs placeholder:text-zinc-500 shadow-none focus:outline-none focus:border-b-2  bg-transparent py-2"
                />
                <EyeIcon className="size-4 text-zinc-500" />
            </div>
        </div>
    );
};

export default PasswordField;

