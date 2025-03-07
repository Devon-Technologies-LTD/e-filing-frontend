"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { CaseStatus } from "@/constants";
import { ApproveCase } from "./approve-case";
import { DenyCase } from "./deny-case";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { useState } from "react";

interface IDataProps {
  id: string;
  status: CaseStatus;
  case_suit_number: string;
}

interface Iprops {
  data: IDataProps;
}

const DeniedReasonsModal = ({
  isOpen = true,
  setIsOpen,
  data,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: Record<string, any>;
}) => {
  return (
    <ConfirmationModal
      contentClassName="max-w-lg"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="space-y-3">
        <div className="space-y-6">
          <section>
            <p className="font-bold text-xl">Reason for Denial</p>
            <p className="text-sm font-semibold">Denied on:</p>
          </section>
          <section className="space-y-1">
            <Label
              htmlFor="denial-reason"
              className=" flex justify-between items-center text-base font-bold "
            >
              Reason{" "}
            </Label>
            <Textarea
              disabled
              id="denial-reason"
              value={data.denial_reason}
              placeholder="Type here"
              className="placeholder:text-neutral-400 text-base font-semibold min-h-[200px] border-0 outline-none shadow-none focus-visible:ring-0 border-b-2 border-b-app-tertiary bg-neutral-100 resize-none"
            />
          </section>
        </div>
        <AlertDialogFooter className="flex items-center sm:justify-start w-full">
          <Button
            type="button"
            size={"medium"}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="text-sm bg-primary font-bold  disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
          >
            CONTINUE
          </Button>
        </AlertDialogFooter>
      </div>
    </ConfirmationModal>
  );
};

export function ReviewActions({ data }: Iprops) {
  const router = useRouter();
  const [isReasonsModalOpen, setIsReasonsModalOpen] = useState(true);
  return (
    <CardFooter className="flex h-20 container py-0 justify-between">
      <div className="w-1/2">
        <Button
          variant="outline"
          className="font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11"
          onClick={() => {
            router.back();
          }}
        >
          <MoveLeft /> Back
        </Button>
      </div>

      {data?.status?.toLowerCase() === CaseStatus.UnderReview && (
        <div className="w-1/2 flex gap-3 justify-end ">
          <DenyCase record={data.id} />
          <ApproveCase record={data.id} />
        </div>
      )}
      {data?.status?.toLowerCase() === CaseStatus.Denied && (
        <div className="w-1/2 flex gap-3 justify-end ">
          <Button
            size={"lg"}
            variant={"outline"}
            onClick={() => {
              setIsReasonsModalOpen(true);
            }}
            className="font-bold border-2 uppercase flex-end text-sm h-11"
          >
            Reason for denial
          </Button>
        </div>
      )}

      {data.status?.toLowerCase() === CaseStatus.Denied && (
        <DeniedReasonsModal
          isOpen={isReasonsModalOpen}
          setIsOpen={setIsReasonsModalOpen}
          data={data}
        />
      )}
    </CardFooter>
  );
}
