"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ROLES } from "@/types/auth";
import ScheduleSheet from "./sheet/SchuduleSheet";
import DeliverJugdementSheet from "./sheet/DeliverSheet";
import ReAssignmentSheet from "./sheet/ReAssignmentSheet";
import StruckSheet from "./sheet/StruckSheet";
import HearingSheet from "./sheet/HearingSheet";

interface CaseActionDropdownProps {
    user: any,
    data: any,
    id: string,
}

const CaseActionDropdown: React.FC<CaseActionDropdownProps> = ({ user, id, data }) => {
    const userRole = user?.role;
    if (
        ![ROLES.ASSIGNING_MAGISTRATE, ROLES.DIRECTOR_MAGISTRATE, ROLES.PRESIDING_MAGISTRATE, ROLES.CHIEF_JUDGE].includes(userRole!)
    ) {
        return null;
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="default">Case Action</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="p-2 grid text-left space-y-2">
                        {data?.assigned_to == user?.id
                            && ((userRole === ROLES.ASSIGNING_MAGISTRATE || userRole === ROLES.PRESIDING_MAGISTRATE || userRole === ROLES.DIRECTOR_MAGISTRATE)
                                && (data?.status !== "TO BE ASSIGNED" && data?.status !== "JUDGEMENT DELIVERED" && data.status !== "STRUCK OUT"))
                            && (
                                <>
                                    <ScheduleSheet id={id}
                                        trigger={
                                            <DropdownMenuLabel className="w-full text-left">
                                                SCHEDULE A HEARING
                                            </DropdownMenuLabel>
                                        }
                                    />
                                </>
                            )}
                        {(data?.assigned_to == user?.id && data?.hearing_status !== "" && data.status !== "STRUCK OUT" && data.status !== "JUDGEMENT DELIVERED") && (
                            <>
                                <DeliverJugdementSheet id={id}
                                    trigger={
                                        <DropdownMenuLabel className="w-full text-left">
                                            DELIVER JUDGMENT
                                        </DropdownMenuLabel>
                                    }
                                />
                                <StruckSheet id={id}
                                    trigger={
                                        <DropdownMenuLabel className="w-full text-left">
                                            STRIKE OUT
                                        </DropdownMenuLabel>
                                    }
                                />
                            </>
                        )}
                        <HearingSheet
                            id={id}
                            trigger={
                                <DropdownMenuLabel className="w-full text-left">
                                    HEARING HISTORY
                                </DropdownMenuLabel>
                            }
                        />
                        <ReAssignmentSheet
                            id={id}
                            trigger={
                                <DropdownMenuLabel className="w-full text-left">
                                    RE-ASSIGNMENT HISTORY
                                </DropdownMenuLabel>
                            }
                        />
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>


        </>
    );
};

export default CaseActionDropdown;
