import React, { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
// import { AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Icons } from "@/components/svg/icons";
import { CaseAssignment } from "@/lib/actions/case-actions";
import { DivisionAdmin } from "@/components/division-admin";
import { ICaseTypes, updateCaseTypeName } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { DEFAULT_PAGE_SIZE } from "@/constants";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



const AssignCaseSheet = ({ trigger, id, status }: { trigger: React.ReactNode; id: string, status: string }) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourtSubDivision, setSelectedCourtSubDivision] = useState("");
    const queryClient = useQueryClient();

    const { caseType, caseTypeErrors } = useAppSelector((data) => data.caseFileForm);
    const dispatch = useDispatch();
    const { data: user } = useAppSelector((state) => state.profile);

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ["presidingM", currentPage],
        queryFn: async () => getUserManagement({
            page: currentPage,
            size: DEFAULT_PAGE_SIZE,
            role: "PRESIDING_MAGISTRATE",
            court_division_id: user?.court_division_id,
        }),
        staleTime: 100000,
    });
    const filteredUsers = userData?.data?.filter((user: any) =>
        (searchTerm ? (user.first_name + " " + user.last_name).toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
        (selectedCourtSubDivision ? user.court_division === selectedCourtSubDivision : true)
    );
    const handleAssignment = async (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await CaseAssignment({ assigned_to_id: userId }, id);
            if (response.success) {
                // queryClient.invalidateQueries(["get_single_case_by_id"]);
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

    const handleCourtSubDivisionChange = (value: string) => {
        setSelectedCourtSubDivision(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.trim());
    };

    const clearFilter = () => {
        setSelectedCourtSubDivision("");
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
            <SheetTrigger disabled={status === "ASSIGNED"}
                className={`bg-white  ${status === "ASSIGNED" ? "bg-gray-200 cursor-none border border-gray-100" : "bg-white border-black"}`}
            >{trigger}</SheetTrigger>
            <SheetContent side="right" className="md:w-[505px] bg-white min-w-[505px]">
                <div className="space-y-10 mx-auto">
                    <div className="space-y-6 w-full">
                        <p className="font-bold text-xl">Assign Case to a Presiding Magistrate</p>
                        <div className="flex gap-2 justify-between">
                            <div className="relative w-full border-b-2 border-0 border-app-primary">
                                <Search className="absolute border-0 left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
                                <Input
                                    type="search"
                                    placeholder="e.g. magistrate name"
                                    className="pl-9 border-app-secondary h10 w-full placeholder:text-gray-400"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="relative w-full flex items-center">
                                <DivisionAdmin
                                    id={user?.court_division_id ?? ""}
                                    placeholder="Select A Sub Division"
                                    value={selectedCourtSubDivision}
                                    onChange={handleCourtSubDivisionChange}
                                    error={caseTypeErrors?.sub_division}
                                />
                                {selectedCourtSubDivision && (
                                    <button onClick={clearFilter} className="ml-2 text-red-500 text-sm">✖</button>
                                )}
                            </div>
                        </div>
                        <ScrollArea className="h-[600px] w-full p-4">
                            {userLoading ? (
                                <p>Loading...</p>
                            ) : filteredUsers?.length ? (
                                filteredUsers.map((user: any) => (
                                    <AlertDialog key={user.id} >
                                        <AlertDialogTrigger asChild>
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
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <div className="space-y-8 bg-white">
                                                        <div className="flex flex-col items-center gap-1 pt-2">
                                                            {/* Ensure Icons.infocircle is properly imported */}
                                                            <Icons.infocircle />
                                                            <div className="text-center text-primary space-y-2">
                                                                <p className="font-bold text-xl">Case Assignment</p>
                                                                <p className="text-black font-semibold text-sm max-w-sm mx-auto">
                                                                    You are about to assign to magistrate <b>{user.first_name} {user.last_name}</b>.
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
                                                                disabled={loading}
                                                            >
                                                                Cancel
                                                            </AlertDialogCancel>
                                                        </AlertDialogFooter>
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ))
                            ) : (
                                <p className="py-6">No user data available</p>
                            )}
                        </ScrollArea>

                    </div>
                </div >
                <ConfirmCaseAssignment
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    trigger={<Button className="w-full h-12">ASSIGN TO MYSELF</Button>}
                >
                    <div className="space-y-8">
                        <div className="flex flex-col items-center gap-1 pt-2">
                            <Icons.infocircle />
                            <div className="text-center text-primary space-y-2">
                                <p className="font-bold text-xl">Case Assignment</p>
                                <p className="text-black font-semibold text-sm max-w-sm mx-auto">
                                    You are about to assign case {id} to magistrate <b>{user?.first_name} {user?.last_name}</b>.
                                </p>
                                <p className="text-black font-semibold text-sm max-w-sm mx-auto">
                                    Are you sure you want to proceed?
                                </p>
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <Button
                                className="text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500"
                                onClick={(e) => handleAssignment(e, user?.id ?? "")}
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

            </SheetContent >
        </Sheet >
    );
};
export default AssignCaseSheet;