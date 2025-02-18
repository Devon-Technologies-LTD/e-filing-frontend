"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { FORM_STEPS } from "@/constants/form";
import { MoveLeft } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { useCaseOverviewFormValidator } from "./validators/useCaseOverviewValidator";
import { useCreateCaseFile, useSaveFormAsDraft } from "./hooks";
import {
  updateCaseFileField,
  updateStep,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { ConfirmationModal } from "../confirmation-modal";
import { Icons } from "../svg/icons";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { useState } from "react";

export function StepperNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const saveForm = useSaveFormAsDraft();

  const dispatch = useDispatch();
  const {
    caseFile: caseFileStateValues,
    current_step,
    caseType,
    legal_counsels
  } = useAppSelector((store) => store.caseFileForm);
  const { validate } = useCaseOverviewFormValidator({
    store: caseFileStateValues,
  });
  // const { toast } = useToast();

  const router = useRouter();

  const createCaseFile = useCreateCaseFile();

  const handleNextStep = async () => {
    if (current_step === 1) {
      await validate(() =>
        createCaseFile.mutate(
          {
            claimant: {
              address: caseFileStateValues.claimant_address,
              email_address: caseFileStateValues.claimant_email_address,
              name: caseFileStateValues.claimant_name,
              phone_number: caseFileStateValues.claimant_phone_number,
            },
            defendant: {
              name: caseFileStateValues.defendant_name,
            },
            court_division_id: caseFileStateValues.court_division,
            title: caseFileStateValues.title,
          },
          {
            onSuccess: (data) => {
              console.log("case file id data", data);
              if (!data.success) {
                return;
              } else {
                dispatch(
                  updateCaseFileField({
                    field: "case_file_id",
                    value: data?.id,
                  })
                );

                dispatch(updateStep(current_step + 1));
              }
            },
          }
        )
      );
    } else {
      dispatch(updateStep(current_step + 1));
    }
  };
  const handleSaveAndContinue = async () => {
    // if (current_step === 1) {
    //   await validate(() =>
    //     createCaseFile.mutate(
    //       {
    //         claimant: {
    //           address: caseFileStateValues.claimant_address,
    //           email_address: caseFileStateValues.claimant_email_address,
    //           name: caseFileStateValues.claimant_name,
    //           phone_number: caseFileStateValues.claimant_phone_number,
    //         },
    //         defendant: {
    //           name: caseFileStateValues.defendant_name,
    //         },
    //         court_division_id: caseFileStateValues.court_division,
    //         title: caseFileStateValues.title,
    //       },
    //       {
    //         onSuccess: (data) => {
    //           dispatch(
    //             updateCaseFileField({ field: "case_file_id", value: data?.id })
    //           );
    //         },
    //       }
    //     )
    //   );
    // } else {
    //   dispatch(updateStep(current_step + 1));
    // }

    saveForm.mutate({
      step: current_step,
      case_file_id: caseFileStateValues.case_file_id,
      data: {
        ...caseFileStateValues,
        ...caseType,
      },
      legal_counsels
    });
  };

  const handlePreviousStep = () => {
    if (current_step === 1) {
      router.push(`/cases`);
      dispatch(updateStep(1));
    } else {
      dispatch(updateStep(current_step - 1));
    }
  };

  return (
    <CardFooter className="flex h-20 container py-0 justify-between">
      <div className="w-1/2">
        <Button
          variant="outline"
          className="font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11"
          onClick={handlePreviousStep}
        >
          <MoveLeft /> Back
        </Button>
      </div>
      <div className="w-1/2 flex justify-end ">
        <ConfirmationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={
            <Button
              size={"lg"}
              variant={"ghost"}
              className="font-bold flex-end text-sm h-11"
              disabled={current_step === FORM_STEPS.length}
            >
              Save and continue later
            </Button>
          }
        >
          <section className="space-y-8">
            <div className="flex flex-col items-center gap-1 pt-2">
              <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
                <Icons.saveIcon />
              </div>
              <div className="text-center text-primary space-y-2">
                <p className="font-bold text-xl">Save Your Progress</p>
                <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
                  You can return anytime to complete your case filing. Remember
                  to submit it before the deadline to avoid delays.
                </p>
              </div>
            </div>

            <AlertDialogFooter className="flex items-center sm:justify-center w-full">
              <Button
                className=" text-sm bg-primary font-bold h-12 disabled:bg-neutral-200 disabled:text-zinc-500 disabled:font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveAndContinue();
                }}
                disabled={saveForm.isPending}
              >
                {saveForm.isPending ? "Saving..." : "SAVE PROGRESS"}
              </Button>

              <AlertDialogCancel
                className="font-extrabold text-red-800 text-xs uppercase"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                RETURN TO FILING{" "}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </section>
        </ConfirmationModal>

        <Button
          size={"lg"}
          className="font-bold flex-end text-sm h-11"
          onClick={handleNextStep}
          disabled={
            current_step === FORM_STEPS.length || createCaseFile.isPending
          }
        >
          {createCaseFile.isPending ? <>Loading...</> : "  Next"}
        </Button>
      </div>
    </CardFooter>
  );
}
