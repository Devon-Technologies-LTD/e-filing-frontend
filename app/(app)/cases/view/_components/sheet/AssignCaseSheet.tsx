import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getAdminDivision } from "@/lib/actions/division";
import { getUserManagement } from "@/lib/actions/user-management";
import { useAppSelector } from "@/hooks/redux";
import { LocationAdmin } from "@/components/location-admin";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmCaseAssignment } from "../confirm_case_assignment";
import { toast } from "sonner";
import { AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Icons } from "@/components/svg/icons";
import { CaseAssignment } from "@/lib/actions/case-actions";

const AssignCaseSheet = ({ trigger, id }: { trigger: React.ReactNode; id: string }) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { caseType, caseTypeErrors } = useAppSelector((data) => data.caseFileForm);
    const [selectedCourtDivision, setSelectedCourtDivision] = useState<string>(caseType.court_division);

    const { data: divisionData } = useQuery({
        queryKey: ["divisions"],
        queryFn: getAdminDivision,
        staleTime: 50000,
    });

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ["userManagement", 1],
        queryFn: async () => getUserManagement({ page: 1, size: 100 }),
        staleTime: 100000,
    });

    const handleAssignment = async (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await CaseAssignment({ assigned_to_id: userId }, id);
            if (response.success) {
                toast.success("Case assigned successfully");
                setIsOpen(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name: string | undefined) => {
        if (!name) return "CN";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <Sheet>
            <SheetTrigger>{trigger}</SheetTrigger>
            <SheetContent  side="right" className="bg-white md:w-[505px] min-w-[505px]">
                <div className="space-y-10 mx-auto">
                    <div className="space-y-6 w-full">
                        <div>
                            <p className="font-bold text-xl">Assign Case to a Presiding Magistrate</p>
                            <p className="font-semibold text-sm">
                                This case will be under the purview of this new presiding magistrate once set.
                            </p>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
                                <Input
                                    type="search"
                                    variant="ghost"
                                    autoComplete="off"
                                    placeholder="e.g. magistrate name"
                                    className="pl-9 border-app-secondary h10 w-full"
                                />
                            </div>
                            <LocationAdmin
                                placeholder="All Districts"
                                value={selectedCourtDivision}
                                onChange={setSelectedCourtDivision}
                                error={caseTypeErrors?.court_division}
                            />
                        </div>
                        <ScrollArea className="h-[600px] w-full p-4">
                            {userLoading ? (
                                <p>Loading...</p>
                            ) : userData?.data?.length ? (
                                userData.data.map((user: any) => (
                                    <ConfirmCaseAssignment
                                        key={user.ID}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        trigger={
                                            <div className="flex cursor-pointer hover:bg-slate-300 justify-between items-center px-4 py-6">
                                                <div className="flex gap-2">
                                                    <Avatar>
                                                        <AvatarFallback className="text-app-primary bg-[#FDF5EC] border-app-primary border-2">
                                                            {getInitials(user.first_name + " " + user.last_name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid">
                                                        <p className="text-stone-600 text-sm">{user.first_name} {user.last_name}</p>
                                                        <p className="font-bold text-xs">{user.email ?? "Email@gmail.com"}</p>
                                                        <p className="text-xs">{user.court_division ?? "-"}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-bold text-app-primary">{user.caseCount ?? "120"} Cases</p>
                                            </div>
                                        }
                                    >
                                        <div className="space-y-8">
                                            <div className="flex flex-col items-center gap-1 pt-2">
                                                <Icons.infocircle />
                                                <div className="text-center text-primary space-y-2">
                                                    <p className="font-bold text-xl">Case Assignment</p>
                                                    <p className="text-black font-semibold text-sm max-w-sm mx-auto">
                                                        You are about to assign case {id} to magistrate <b>{user.first_name} {user.last_name}</b>.
                                                    </p>
                                                    <p className="text-black font-semibold text-sm max-w-sm mx-auto">
                                                        Are you sure you want to proceed?
                                                    </p>
                                                </div>
                                            </div>
                                            <AlertDialogFooter>
                                                <Button
                                                    className="text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500"
                                                    onClick={(e) => handleAssignment(e, user.id)}
                                                    disabled={loading}
                                                >
                                                    {loading ? "Processing..." : "CONFIRM ASSIGNMENT"}
                                                </Button>
                                                <AlertDialogCancel
                                                    className="font-extrabold text-red-500 text-xs uppercase"
                                                    onClick={() => setIsOpen(false)}
                                                    disabled={loading}
                                                >
                                                    Cancel
                                                </AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </div>
                                    </ConfirmCaseAssignment>
                                ))
                            ) : (
                                <p className="py-6">No user data available</p>
                            )}
                        </ScrollArea>
                    </div>
                </div>
                <Button className="w-full">SUBMIT REQUEST</Button>
            </SheetContent>
        </Sheet>
    );
};

export default AssignCaseSheet;
