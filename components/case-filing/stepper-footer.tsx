"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { FORM_STEPS } from "@/constants/form";
import { MoveLeft } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { useCaseOverviewFormValidator } from "./validators/case-overview-validator";
import { useSaveForm } from "./hooks";
import { addCaseTypeError, updateStep } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { ConfirmationModal } from "../confirmation-modal";
import { Icons } from "../svg/icons";
import { AlertDialogCancel, AlertDialogFooter } from "../ui/alert-dialog";
import { useState } from "react";
import { useCivilCaseFormValidator } from "./validators/civil-case-form-validator";
import { CaseTypeData } from "@/constants";
import { useCriminalCaseFormValidator } from "./validators/criminal-case-validator";
import { useFamilyCaseFormValidator } from "./validators/family-case-validaotr";

export function StepperNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { current_step, caseType, legal_counsels, documents } = useAppSelector(
    (store) => store.caseFileForm
  );
  const { validate } = useCaseOverviewFormValidator({
    store: caseType,
  });
  const { validate: validateCivilCase } = useCivilCaseFormValidator({
    store: caseType,
    documents,
  });
  const { validate: validateCriminalCase } = useCriminalCaseFormValidator({
    store: caseType,
    documents,
  });
  const { validate: validateFamilyCase } = useFamilyCaseFormValidator({
    documents,
  });
  const { mutate: saveAsDraft, isPending: draftPending } = useSaveForm({
    step: current_step,
    isDraft: true,
  });
  const { mutate: saveForm, isPending: formPending } = useSaveForm({
    step: current_step,
    isDraft: false,
  });

  const router = useRouter();

  const handleNextStep = async () => {
    if (current_step === 1) {
      await validate(() =>
        saveForm({
          case_file_id: caseType.case_file_id,
          data: {
            ...caseType,
          },
          legal_counsels,
        })
      );
    } else if (current_step === 2) {
      if (!caseType.case_type) {
        dispatch(
          addCaseTypeError({
            case_type: "Please select a case type",
          })
        );
      }
      if (caseType.case_type === CaseTypeData.CIVIL_CASE) {
        await validateCivilCase(() => dispatch(updateStep(current_step + 1)));
      }
      if (caseType.case_type === CaseTypeData.CRIMINAL_CASE) {
        await validateCriminalCase(() =>
          dispatch(updateStep(current_step + 1))
        );
      }
      if (caseType.case_type === CaseTypeData.FAMILY_CASE) {
        await validateFamilyCase(() => dispatch(updateStep(current_step + 1)));
      }
    } else if (current_step === 5) {
      saveForm({
        case_file_id: caseType.case_file_id,
        data: {
          ...caseType,
        },
        legal_counsels,
      });
    } else {
      dispatch(updateStep(current_step + 1));
    }
  };
  const handleSaveAndContinue = async () => {
    saveAsDraft({
      case_file_id: caseType.case_file_id,
      data: {
        ...caseType,
      },
      legal_counsels,
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
          <div className="space-y-8">
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
                disabled={draftPending}
              >
                {draftPending ? "Saving..." : "SAVE PROGRESS"}
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
          </div>
        </ConfirmationModal>

        <Button
          size={"lg"}
          className="font-bold flex-end text-sm h-11"
          onClick={handleNextStep}
          disabled={current_step === FORM_STEPS.length || formPending}
        >
          {formPending ? (
            <>Loading...</>
          ) : current_step === 5 ? (
            "Submit"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </CardFooter>
  );
}
