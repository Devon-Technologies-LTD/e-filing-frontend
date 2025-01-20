'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import React from 'react';

interface InputFieldProps {
    id: string;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    label,
    type = 'text',
    placeholder,
    required = false,
}) => {
    return (
        <div className="relative w-full">
            <Label className='text-xs text-muted text-neutral-600'>{label}</Label>
            <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                autoComplete="off"
                className="w-full border-0 border-b-[1px] placeholder:text-xs placeholder:text-zinc-500 shadow-none focus:outline-none focus:border-b-2  bg-transparent py-2"
            />
        </div>
    );
};

export default InputField;

