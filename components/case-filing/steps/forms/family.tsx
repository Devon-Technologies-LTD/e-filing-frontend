
"use client";
import { useState } from "react";
import { EditorState, Editor } from 'draft-js';
import { InfoIcon } from 'lucide-react';
import InputField from "@/components/ui/InputField";
import 'draft-js/dist/Draft.css';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FILING_LOCATIONS } from "@/types/files/general";
import { Input } from "@/components/ui/input";




// Custom Select Component
export const LocationSelect = ({
    value,
    onChange
}: {
    value: string;
    onChange: (value: string) => void;
}) => (
    <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
            <SelectValue className="text-neutral-700 text-xs" placeholder="Select A Filing Location" />
        </SelectTrigger>
        <SelectContent className="bg-white w-[354px] text-zinc-900">
            {FILING_LOCATIONS.map((location) => (
                <SelectItem
                    key={location.value}
                    value={location.value}
                    className="text-xs font-semibold text-zinc-900 hover:text-gray-600"
                >
                    {location.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

export const FamilyComplaintForm = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <p className="text-xs">CIVIL FORM 5</p>
                <p className="text-xs text-app-primary">DOWNLOAD SAMPLE DOCUMENT</p>
            </div>
            <div className="border-0 w-full border-t-2 space-y-6 border-black bg-neutral-100 p-4">
                <div className="space-y-2">
                    <p className="text-xs font-bold">IN THE DISTRICT COURT OF THE FEDERAL CAPITAL TERRITORY HOLDEN IN THE</p>
                    <LocationSelect
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                    />
                </div>

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

                <>
                    <div className="text-sm font-bold">
                        At the suit of this complainat, this plaint is taking out with respect to
                    </div>
                    <p className="text-sm">GIVE DESCRIPTION AND ADDRESS/LOCATION OF PROPERTY</p>
                    <div className="p-2 bg-white h-40">
                        <Editor
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder="Describe property.."
                        />
                    </div>
                </>
                <>
                    <div className="text-sm font-bold">
                        With annual rental value Of property
                    </div>
                    <InputField
                        id="defendant"
                        name="defendant"
                        type="number"
                        label="VALUE IN FIGURES (VALUE AT THE TIME RELEVANT TO THE FACT)"
                        tooltipText="Enter the name of the defendant"
                        tooltipIcon={InfoIcon}
                        placeholder="eg. 800m, 000"
                    />
                </>
                <>
                    <div className="text-sm font-bold">
                        The relief(s) sought by the complainat are
                    </div>
                    <p className="text-xs">
                        LIST/DESCRIBE RELIEF BY CLAIMANT</p>
                    <div className="p-2 bg-white h-40">
                        <Editor
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder="Describe property.."
                        />
                    </div>
                </>

                <>
                    <p>The Address for Service, Phone Numbers and email Addresses of the Parties are;</p>
                    <div className="flex  p-2">
                        <div className="p-2 w-full space-y-6">
                            <p className="text-base font-bold">COMPLAINAT DETAILS</p>
                            <InputField
                                id="defendant"
                                name="defendant"
                                type="text"
                                label="PHYSICAL ADDRESS"
                                placeholder="e.g Block 33 Flat 3 Kubwa Abuja "
                            />
                            <InputField
                                id="defendant"
                                name="defendant"
                                type="text"
                                label="PHONE NUMBERS"
                                placeholder="eg. 2347030338024"
                            />
                            <InputField
                                id="defendant"
                                name="defendant"
                                type="email"
                                label="Email Address"
                                placeholder="eg. johndoe@gmail.com"
                            />
                        </div>
                        <div className="p-2 w-full space-y-6">
                            <p className="text-base font-bold">DEFENDANT DETAILS</p>
                            <InputField
                                id="defendant"
                                name="defendant"
                                type="text"
                                label="PHYSICAL ADDRESS"
                                placeholder="e.g Block 33 Flat 3 Kubwa Abuja "
                            />
                            <InputField
                                id="defendant"
                                name="defendant"
                                type="text"
                                label="PHONE NUMBERS"
                                placeholder="eg. 2347030338024"
                            />
                            <InputField
                                id="defendant"
                                name="defendant"
                                type="email"
                                label="Email Address"
                                placeholder="eg. johndoe@gmail.com"
                            />
                        </div>

                    </div>
                </>

                <>
                    <p className="text-base font-bold">This plaint was taken out by claimant/counsel as the case may be</p>
                    <p className="text-base font-medium">DATED THIS</p>
                    <div className="flex items-end justify-start text-center">
                        <Input name="" type="text" placeholder="eg 10th" required={false}
                            className={`w-24 border-0  border-b-[1px]  placeholder:text-xs placeholder:font-semibold placeholder:text-zinc-500 
                            shadow-none focus:outline-none  focus:border-b-2  bg-transparent px-2py-2`} />
                        <span className="text-center items-center font-semibold justify-center  mx-4">DAY OF </span>

                        <Input name="" type="text" placeholder="eg January" required={false}
                            className={`w-28 border-0  border-b-[1px]  placeholder:text-xs placeholder:font-semibold placeholder:text-zinc-500 
                            shadow-none focus:outline-none  focus:border-b-2  bg-transparent px-2py-2`} />

                        <span className="text-center items-center justify-center font-semibold mx-4">20</span>
                        <Input name="" type="text" placeholder="eg 10th" required={false}
                            className={`  w-24 border-0  border-b-[1px]  placeholder:text-xs placeholder:font-semibold placeholder:text-zinc-500 
                            shadow-none focus:outline-none  focus:border-b-2  bg-transparent px-2py-2`} />
                    </div>
                </>

                <>
                    <p>SIGNATURE</p>
                    <div className="bg-white p-4 w-full h-20">
                        <div className="text-app-primary text-center w-48 border-2 p-2 border-app-primary">Upload e-Signature</div>
                    </div>

                    <InputField
                        id="defendant"
                        name="defendant"
                        type="email"
                        label="NAME"
                        placeholder="e.g claimanr/counsel name"
                    />

                    <InputField
                        id="claimant"
                        name="claimant"
                        type="file"
                        label="UPLOAD WITNESS STATEMENT OF OATH*"
                        tooltipText="Enter the name of the claimant"
                        tooltipIcon={InfoIcon}
                        placeholder="eg. John Doe"
                    />

                </>
            </div>
        </div>
    );
};
