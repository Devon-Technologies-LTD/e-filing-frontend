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
    user: any;
    id: string,
}

const SHEET_TITLES: Record<string, string> = {
    Hearing: "Schedule Case Hearing",
    Deliver: "Deliver Judge",
    Struck: "Struck Out",
    "Hearing History": "Hearing History",
    "Re-Assignment History": "Re-Assignment History",
};

const CaseActionDropdown: React.FC<CaseActionDropdownProps> = ({ user, id }) => {
    const [openSheet, setOpenSheet] = useState(false);
    const [sheetTitle, setSheetTitle] = useState<string>("");

    const handleOpenSheet = (title: string) => {
        setSheetTitle(title);
        setOpenSheet(true);
    };

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
                        <ScheduleSheet id={id}
                            trigger={
                                <DropdownMenuLabel className="w-full text-left">
                                    SCHEDULE A HEARING
                                </DropdownMenuLabel>
                            }
                        />
                        <DeliverJugdementSheet id={id}
                            trigger={
                                <DropdownMenuLabel className="w-full text-left">
                                    DELIVER JUDGMENT
                                </DropdownMenuLabel>
                            }
                        />
                        <ReAssignmentSheet id={id}
                            trigger={
                                <DropdownMenuLabel className="w-full text-left">
                                    RE-ASSIGNMENT HISTORY
                                </DropdownMenuLabel>
                            }
                        />
                        <HearingSheet id={id}
                            trigger={
                                <DropdownMenuLabel className="w-full text-left">
                                    HEARING HISTORY
                                </DropdownMenuLabel>
                            }
                        />
                        <StruckSheet id={id}
                            trigger={
                                <DropdownMenuLabel className="w-full text-left">
                                    STRUCK OUT
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
