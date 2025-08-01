"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { FORM_STEPS, REFILING_FORM_STEPS } from "@/constants/form";
import { FileTypeIcon, MoveLeft } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { useCaseOverviewFormValidator } from "./validators/case-overview-validator";
import { useSaveForm } from "./hooks";
import {
  addCaseTypeError,
  updatePaymentType,
  updateStep,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { ConfirmationModal } from "../confirmation-modal";
import { Icons } from "../svg/icons";
import { AlertDialogCancel, AlertDialogFooter } from "../ui/alert-dialog";
import { useState } from "react";
import { useCivilCaseFormValidator } from "./validators/civil-case-form-validator";
import { CaseTypeData } from "@/constants";
import { useCriminalCaseFormValidator } from "./validators/criminal-case-validator";
import { toast } from "sonner";
import { useFamilyCaseFormValidator } from "./validators/family-case-validaotr";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Iprops {
  isRefiling?: boolean;
}
export function StepperNavigation({ isRefiling }: Iprops) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { current_step, caseType, legal_counsels, documents, totalAmount } =
    useAppSelector((store) => store.caseFileForm);
  const { validate } = useCaseOverviewFormValidator({
    store: caseType,
  });
  const step = isRefiling ? current_step - 2 : current_step;
  const formSteps = isRefiling ? REFILING_FORM_STEPS : FORM_STEPS;
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
  const {
    mutation: { mutate: saveAsDraft, isPending: draftPending },
  } = useSaveForm({
    step: current_step,
    isDraft: true,
  });
  const {
    mutation: { mutate: saveForm, isPending: formPending },
    generateRRRMutation,
    initializePaymentFunction,
    setShowPaystackInfoModal,
    showPaystackInfoModal,
  } = useSaveForm({
    step: current_step,
    isDraft: false,
    amount: totalAmount,
  });

  const router = useRouter();

  const handleNextStep = async () => {
    if (current_step === 1) {
      //  dispatch(updateStep(step + 1));
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
        // await validateCivilCase(() => dispatch(updateStep(current_step + 1)));
        await validateCivilCase(() =>
          saveForm({
            case_file_id: caseType.case_file_id,
            data: {
              ...caseType,
            },
            legal_counsels,
          })
        );
      }
      if (caseType.case_type === CaseTypeData.CRIMINAL_CASE) {
        await validateCriminalCase(() =>
          // dispatch(updateStep(current_step + 1))
          saveForm({
            case_file_id: caseType.case_file_id,
            data: {
              ...caseType,
            },
            legal_counsels,
          })
        );
      }
      if (caseType.case_type === CaseTypeData.FAMILY_CASE) {
        // await validateFamilyCase(() => dispatch(updateStep(current_step + 1)));
        await validateFamilyCase(() =>
          saveForm({
            case_file_id: caseType.case_file_id,
            data: {
              ...caseType,
            },
            legal_counsels,
          })
        );
      }
    } else if (current_step === 5) {
      saveForm({
        case_file_id: caseType.case_file_id,
        data: {
          ...caseType,
        },
        legal_counsels,
      });
    } else if (current_step === 6) {
      if (isRefiling) {
        router.back();
      } else {
        router.push("/cases");
      }
    } else {
      // dispatch(updateStep(current_step + 1));
      saveForm({
        case_file_id: caseType.case_file_id,
        data: {
          ...caseType,
        },
        legal_counsels,
      });
    }
  };
  const handleSaveAndContinue = async () => {
    if (!caseType.court_division) {
      toast.error("Case title and division is required before saving as draft");
    } else
      saveAsDraft({
        case_file_id: caseType.case_file_id,
        data: {
          ...caseType,
        },
        legal_counsels,
      });
  };

  const handlePreviousStep = () => {
    if (step === 1) {
      if (isRefiling) {
        router.back();
      } else {
        router.push(`/cases`);
        dispatch(updateStep(1));
      }
    } else {
      dispatch(updateStep(current_step - 1));
    }
  };

  return (
    <>
      <CardFooter className="flex h-20 container py-0 justify-between">
        <div className="w-1/2">
          <Button
            variant="outline"
            className="font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11"
            onClick={handlePreviousStep}
            disabled={step === formSteps.length}
          >
            <MoveLeft /> Back
          </Button>
        </div>

        <div className="w-1/2 flex gap-3 justify-end ">
          {!isRefiling ? (
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
                      You can return anytime to complete your case filing.
                      Remember to submit it before the deadline to avoid delays.
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
          ) : (
            <div></div>
          )}

          <Button
            size={"lg"}
            className="font-bold flex-end text-sm h-11"
            onClick={() => {
              handleNextStep();
              dispatch(updatePaymentType("remita"));
            }}
            disabled={formPending || generateRRRMutation.isPending}
          >
            {formPending || generateRRRMutation.isPending ? (
              <>Loading...</>
            ) : current_step === 5 ? (
              `Pay ₦ ${totalAmount?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} with Remita`
            ) : (
              "Next"
            )}
          </Button>

          {current_step === 5 && (
            <Button
              size={"lg"}
              className="font-bold bg-blue-500 flex-end text-sm h-11"
              onClick={() => {
                handleNextStep();
                dispatch(updatePaymentType("paystack"));
              }}
              disabled={formPending || generateRRRMutation.isPending}
            >
              {formPending || generateRRRMutation.isPending ? (
                <>Loading...</>
              ) : (
                `Pay ₦ ${totalAmount?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} with Paystack`
              )}
            </Button>
          )}
        </div>
      </CardFooter>

      <Dialog
        open={showPaystackInfoModal}
        onOpenChange={setShowPaystackInfoModal}
      >
        <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] p-0">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between w-full">
              <DialogTitle className="flex items-center">
                <FileTypeIcon />
                <span className="ml-2">Unable to load remita gateway</span>
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="overflow-auto p-6 space-y-8 font-semibold max-h-[calc(90vh-80px)]">
            <p>
              Unable to load remita gateway would you like to switch to
              Paystack?
            </p>{" "}
            <div className="flex flex-col  sm:flex-row gap-4">
              <Button
                type="button"
                disabled={false}
                onClick={() => {
                  setShowPaystackInfoModal(false);
                  dispatch(updatePaymentType("paystack"));
                  initializePaymentFunction();
                }}
                className="h-10 font-bold disabled:bg-blue-100 disabled:shadow-lg disabled:text-white"
              >
                Yes, Proceed to Paystack
              </Button>
              {
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setShowPaystackInfoModal(false);
                  }}
                  className="h-10 font-bold text-sm text-black"
                >
                  Back
                </Button>
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
