'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import React from 'react';
import { LucideIcon, HelpCircle } from 'lucide-react';

interface InputFieldProps {
    id: string;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    value?: string;
    icon?: LucideIcon;
    tooltipText?: string;
    tooltipIcon?: LucideIcon;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    bottomText?: React.ReactNode;
    onIconClick?: () => void;
    className?: string;
    autoFocus?: boolean;
}
const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    label,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    error,
    value,
    icon: Icon,
    tooltipText,
    tooltipIcon: TooltipIcon = HelpCircle,
    onChange,
    bottomText,
    onIconClick,
    className = "",
    autoFocus = false,

}) => {
    return (
        <div className="relative w-full space-y-1">
            <div className="flex items-center gap-1.5">
                {tooltipText && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <TooltipIcon
                                    className="h-4 w-4 text-neutral-500 hover:text-neutral-700 cursor-help"
                                    aria-label={tooltipText}
                                />
                            </TooltipTrigger>
                            <TooltipContent className="mb-12">
                                <p className="text-sm">{tooltipText}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                <Label
                    htmlFor={id}
                    className={`text-sm text-neutral-600 font-bold ${error ? 'text-red-500' : 'text-neutral-600'}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            </div>

            <div className="relative">
                <Input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                    autoFocus={autoFocus}
                    className={` 
                        w-full 
                        border-0 
                        border-b-[1px] 
                        placeholder:text-xs
                        placeholder:font-semibold
                        placeholder:text-zinc-500 
                        shadow-none 
                        focus:outline-none 
                        focus:border-b-2 
                        bg-transparent 
                        px-2
                        py-2
                        ${error ? 'border-red-500 focus:border-red-500' : 'border-neutral-200 focus:border-app-secondary'}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${Icon ? 'pr-10' : ''}
                        ${className}
                    `}
                />
                {Icon && (
                    <div
                        className={`absolute right-2 top-1/2 -translate-y-1/2 
                            ${onIconClick ? 'cursor-pointer hover:opacity-70' : ''} 
                            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        onClick={!disabled && onIconClick ? onIconClick : undefined}
                    >
                        <Icon className="h-4 w-4 text-neutral-500" />
                    </div>
                )}
            </div>
            {bottomText && <div>{bottomText}</div>}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};


export default InputField;