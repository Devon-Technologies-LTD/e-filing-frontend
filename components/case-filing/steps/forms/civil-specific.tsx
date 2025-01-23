
"use client";
import { useState } from "react";
import { EditorState } from 'draft-js';
import { InfoIcon } from 'lucide-react';
import InputField from "@/components/ui/InputField";
import 'draft-js/dist/Draft.css';
import { LocationSelect } from "./family";
import DatedThis from "@/components/DatedThis";
import Signature from "@/components/signature";
import { RichTextEditor } from "./civil";



export const CivilSpecific = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <p className="text-xs">CIVIL FORM 8</p>
                <p className="text-xs font-bold text-app-primary">DOWNLOAD SAMPLE DOCUMENT</p>
            </div>
            <div className="border-0 w-full border-t-2 space-y-6 border-black bg-neutral-100 p-4">
                <div className="space-y-2">
                    <p className="text-base font-bold">IN THE DISTRICT COURT OF THE FEDERAL CAPITAL TERRITORY HOLDEN IN THE</p>
                    <LocationSelect
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                    />
                </div>

                <p className="text-base font-bold">BETWEEEN</p>
                <InputField
                    id="claimant"
                    name="claimant"
                    type="text"
                    label="CLAIMANT"
                    tooltipText="Enter the name of the claimant"
                    tooltipIcon={InfoIcon}
                    placeholder="eg. John Doe"
                />
                <p className="text-base font-bold">AND</p>
                <InputField
                    id="claimant"
                    name="claimant"
                    type="text"
                    label="DEFENDANT(S)"
                    tooltipText="Enter the name of the DEFENDANT(S)"
                    tooltipIcon={InfoIcon}
                    placeholder="eg. John Doe"
                />
                <>
                    <div className="text-base font-bold">
                        Summons for service on Mr/Mrs
                    </div>
                    <InputField
                        id="defendant"
                        name="defendant"
                        type="number"
                        label="NAME OF DEFENDANT"
                        tooltipText="Enter the name of the defendant"
                        tooltipIcon={InfoIcon}
                        placeholder="eg. 800m, 000"
                    />
                    <InputField
                        id="defendant"
                        name="defendant"
                        type="number"
                        label="PHYSICAL ADDRESS OF DEFENDANT"
                        tooltipText="Enter the name of the defendant"
                        tooltipIcon={InfoIcon}
                        placeholder="eg. e.g 22 Jahun Close Asokoro Abuja"
                    />
                </>
                <>
                    <div className="text-base font-bold">
                        At the suit of this claimant, you are hereby summoned to appear before the District Court
                    </div>
                    <InputField
                        id="defendant"
                        name="defendant"
                        type="number"
                        label="NAME/DESCRIPTION DISTRICT COURT"
                        tooltipText="Enter the name of the defendant"
                        tooltipIcon={InfoIcon}
                        placeholder="eg. describe the very court by number"
                    />
                    <InputField
                        id="defendant"
                        name="defendant"
                        type="number"
                        label="STATE LOCATION OF THE COURT"
                        tooltipText="Enter the name of the defendant"
                        tooltipIcon={InfoIcon}
                        placeholder="eg. Abuja"
                    />
                    <InputField
                        id="defendant"
                        name="defendant"
                        type="number"
                        label="TIME"
                        tooltipText="Enter the name of the "
                        tooltipIcon={InfoIcon}
                        placeholder="eg. 9:00 PM"
                    />
                    <DatedThis
                        title=""
                        subtitle="ON THE"
                        dayPlaceholder="e.g. 5th"
                        monthPlaceholder="e.g. March"
                        yearPlaceholder="e.g. 2024"
                    />
                </>
                <>
                    <div className="text-base font-bold">
                        to answer to the claims endorsed on the plaint accompanying this summons
                    </div>
                    <DatedThis
                        title=""
                        subtitle="ON THE"
                        dayPlaceholder="e.g. 5th"
                        monthPlaceholder="e.g. March"
                        yearPlaceholder="e.g. 2024"
                    />
                    <Signature />
                </>

                <>

                    <InputField
                        id="defendant"
                        name="defendant"
                        type="email"
                        label="NAME"
                        placeholder="e.g claimanr/counsel name"
                    />

                    <RichTextEditor
                        editorState={editorState}
                        setEditorState={setEditorState}
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
