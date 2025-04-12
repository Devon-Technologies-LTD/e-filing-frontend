import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmCaseAssignment } from "../confirm_case_assignment";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Icons } from "@/components/svg/icons";
import { CaseAssignment } from "@/lib/actions/case-actions";
import { getInitials } from "@/constants";

const MagistrateCard = ({ user, caseId, activeModalUserId, setActiveModalUserId }: any) => {
    const [loading, setLoading] = useState(false);

    const handleAssignment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await CaseAssignment({ assigned_to_id: user.ID }, caseId);
            if (response.success) {
                toast.success("Case assigned successfully");
                setActiveModalUserId(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setActiveModalUserId(user.ID);
    };

    const handleCloseModal = () => {
        setActiveModalUserId(null);
    };



    return (
        <ConfirmCaseAssignment isOpen={activeModalUserId === user.ID} setIsOpen={handleCloseModal}>
            <div className="flex cursor-pointer hover:bg-slate-300 justify-between items-center px-4 py-6" onClick={handleOpenModal}>
                <div className="flex gap-2">
                    <Avatar>
                        <AvatarFallback className="text-app-primary bg-[#FDF5EC] border-app-primary border-2">{getInitials(`${user.first_name} ${user.last_name}`)}</AvatarFallback>
                    </Avatar>
                    <div className="grid">
                        <p className="text-stone-600 text-sm">{user.first_name} {user.last_name}</p>
                        <p className="font-bold text-xs">{user.email ?? "Email@gmail.com"}</p>
                        <p className="text-xs">{user.court_division ?? "-"}</p>
                    </div>
                </div>
                <p className="text-sm font-bold text-app-primary">{user.caseCount ?? ""} Cases</p>
            </div>
            <div className="space-y-8">
                <div className="flex flex-col items-center gap-1 pt-2">
                    <Icons.infocircle />
                    <div className="text-center text-primary space-y-2">
                        <p className="font-bold text-xl">Case Assignment</p>
                        <p className="text-black font-semibold text-sm max-w-sm mx-auto">
                            Assign this case to <b>{user.first_name} {user.last_name}</b>?
                        </p>
                    </div>
                </div>
                <AlertDialogFooter>
                    <Button className="text-sm bg-primary font-bold h-12" onClick={handleAssignment} disabled={loading}>
                        {loading ? "Processing..." : "CONFIRM ASSIGNMENT"}
                    </Button>
                    <AlertDialogCancel className="font-extrabold text-red-500 text-xs uppercase" onClick={handleCloseModal}>
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </div>
        </ConfirmCaseAssignment>
    );
};

export default MagistrateCard;
