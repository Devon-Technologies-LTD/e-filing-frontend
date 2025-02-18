import React from "react";
import { Icons } from "@/components/svg/icons";

interface HearingRecord {
    caseNumber: string;
    parties: string;
    description: string;
    hearingDate: string;
    hearingTime: string;
    displayDate: string;
}

interface UpcomingHearingProps {
    hearings: HearingRecord[];
}

export default function UpcomingHearing({ hearings }: UpcomingHearingProps) {
    return (
        <>
            {hearings.length > 0 && (
                <div className="mb-36">
                    <div className="flex items-center  justify-between bg-white border-b-2 py-3">
                        <p className="font-semibold container">UPCOMING HEARING</p>
                    </div>
                    <div className="space-y-6 container">
                        {hearings.map((hearing, index) => (
                            <div key={index} className="flex my-4 py-4 hover:border-b-app-primary hover:bg-gray-300 cursor-pointer border-b-2  flex-row justify-between items-center">
                                <div className="flex space-x-2 w-2/3 items-center">
                                    <Icons.calender className="size-10 flex-shrink-0" />
                                    <span className="text-sm">
                                        Your hearing for {hearing.caseNumber} ({hearing.parties} - {hearing.description}) is on {hearing.hearingDate} at {hearing.hearingTime}.
                                    </span>
                                </div>
                                <div className="flex row-auto flex-row text-sm text-app-primary space-x-2 w-auto">
                                    <span>{hearing.hearingTime}</span>
                                    <span>{hearing.displayDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
