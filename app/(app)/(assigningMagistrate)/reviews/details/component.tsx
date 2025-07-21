import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const CaseActions: React.FC<{ handlePreviousStep: () => void }> = ({ handlePreviousStep }) => {
    const [isDenyDialogOpen, setIsDenyDialogOpen] = useState(false);
    const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
    return (
        <>
            <CardFooter className="flex h-20 py-0 justify-between">
                <div className="w-full">
                    <Button
                        variant="outline"
                        className="font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11"
                        onClick={handlePreviousStep}
                    >
                        <MoveLeft className="mr-2" /> Back
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11"
                        onClick={() => setIsDenyDialogOpen(true)}
                    >
                        DENY CASE
                    </Button>
                    <Button
                        variant="default"
                        className="font-semibold h-11"
                        onClick={() => setIsApproveDialogOpen(true)}
                    >
                        APPROVE CASE
                    </Button>
                </div>
            </CardFooter>

            {/* Deny Confirmation Dialog */}
            <Dialog open={isDenyDialogOpen} onOpenChange={setIsDenyDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Denial</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to deny this case?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDenyDialogOpen(false)}>Cancel</Button>
                        <Link href="/login">
                            <Button variant="destructive">Confirm Deny</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Approve Confirmation Dialog */}
            <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Approval</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to approve this case?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
                        <Button variant="default" onClick={() => console.log("Case Approved")}>Confirm Approve</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default function SideBarComponent({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div>
            <div className="sticky top-0 bg-white z-10 space-y-2">
                <div className="text-xs font-semibold text-gray-600">
                    CASE REVIEWS / {id}
                </div>
                <div className="text-3xl font-medium leading-8 text-primary">
                    This is awesome
                </div>
            </div>
        </div>
    );
};
export { CaseActions, SideBarComponent };
