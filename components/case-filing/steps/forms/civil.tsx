
"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useCallback } from "react";
import {
    CaseOption,
    CASE_TYPES,
    CASE_OPTIONS,
    CaseTypes,
    FileInputProps,
    RichTextEditorProps,
    WORTH_OPTIONS
} from "@/types/files/case-type";
import { Editor, EditorState, RichUtils } from 'draft-js';
import { MessageCircleQuestionIcon, InfoIcon, BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';
import InputField from "@/components/ui/InputField";
import 'draft-js/dist/Draft.css';

export const RichTextEditor = ({ editorState, setEditorState }: RichTextEditorProps) => {
    const handleKeyCommand = useCallback(
        (command: string, editorState: EditorState) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                setEditorState(newState);
                return 'handled';
            }
            return 'not-handled';
        },
        [setEditorState]
    );

    const onStyleClick = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    return (
        <div className="border rounded-md bg-white">
            <div className="border m-3 p-2 flex gap-2">
                <button
                    onClick={() => onStyleClick('BOLD')}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    <BoldIcon className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onStyleClick('ITALIC')}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    <ItalicIcon className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onStyleClick('UNDERLINE')}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="p-4 h-60  bg-white">
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Start Typing Content here..."
                />
            </div>
        </div>
    );
};

export const FileInputField = ({ id, label }: FileInputProps) => (
    <InputField
        id={id}
        name={id}
        type="file"
        label={label}
        placeholder="Choose File"
        bottomText={<p className="text-xs text-app-secondary">DOWNLOAD SAMPLE DOCUMENT</p>}
        icon={MessageCircleQuestionIcon}
    />
);



export const DirectCriminalComplaintForm = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <p className="text-xs">FORM DETAILS</p>
                <p className="text-xs text-app-primary">DOWNLOAD SAMPLE DOCUMENT</p>
            </div>
            <div className="border-0 w-full border-t-2 space-y-6 border-black bg-neutral-100 p-4">
                <p className="text-xs font-bold">BETWEEEN</p>
                <InputField
                    id="claimant"
                    name="claimant"
                    type="text"
                    label="CLAIMANT"
                    tooltipText="Enter the name of the claimant"
                    tooltipIcon={InfoIcon}
                    placeholder="eg. John Doe"
                />
                <p className="text-xs font-bold">AND</p>
                <InputField
                    id="defendant"
                    name="defendant"
                    type="text"
                    label="DEFENDANT"
                    tooltipText="Enter the name of the defendant"
                    tooltipIcon={InfoIcon}
                    placeholder="eg. John Doe"
                />
                <div className="text-xs font-bold">
                    <p>THE REGISTRAR</p>
                    <p>CHIEF JUSTICE COURT</p>
                </div>
                <div className="flex w-[354px] bg-zinc-200 p-2 justify-between items-center">
                    <p className="text-xs font-bold">WUSE ZONE 2 DISTRICT</p>
                    <InfoIcon />
                </div>
                <div className="text-xs font-bold">
                    <p>DIRECT CRIMINAL COMPLAINT AGAINST</p>
                </div>
                <RichTextEditor
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
            </div>
        </div>
    );
};


export const CustomSelect = ({
    placeholder,
    options,
    value,
    onChange
}: {
    placeholder: string;
    options: CaseOption[];
    value: string;
    onChange: (value: string) => void;
}) => (
    <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
            <SelectValue className="text-neutral-700 text-xs" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white w-[354px] text-zinc-900">
            {options.map((option) => (
                <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-xs font-semibold text-zinc-900 hover:text-gray-600"
                >
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

