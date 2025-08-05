import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import { verifyExemptionCode } from "@/lib/actions/case-file";
import { useFormState } from "react-dom";

export default function ExemptionVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(verifyExemptionCode, {
    data: null,
    status: "idle",
    message: "",
    errors: null,
    success: false,
  });

  const handleOpenChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsOpen(open);
    // Reset state when modal closes
    if (!open && state.status === "success") {
      // Reset the state by creating a new initial state
      // Reset the state by creating a new initial state
      // You can reset the state here if needed, e.g. by calling a state setter or similar logic
    }
  };

  const renderContent = () => {
    console.log("Rendering content with state:", state);
    if (state.status === "success") {
      return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-center">
            Verified Successfully
          </h3>
        </div>
      );
    }

    if (isPending) {
      return (
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">
              Verifying Authenticity
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Please Hold while We verify your Status
            </p>
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin m-1"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="exemptionId" className="text-sm text-gray-600">
            Exemption ID
          </Label>
          <Input
            id="exemptionId"
            name="exemptionId"
            type="text"
            placeholder="Enter exemption code"
            className="w-full"
            disabled={isPending}
          />
          {state.status === "error" && (
            <p className="text-sm text-red-600">{state.message ?? ""}</p>
          )}
        </div>

        <Button
          onClick={(e) => {
            const formData = new FormData();
            const input = document.getElementById(
              "exemptionId"
            ) as HTMLInputElement;
            formData.append("exemptionId", input.value);
            formAction(formData);
          }}
          className="w-full bg-red-800 hover:bg-red-900 text-white"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "SUBMIT"
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className="p-8">
      <Button
        onClick={() => setIsOpen(true)}
        className="font-bold lg:flex hidden bg-[#7C2D121A] text-primary text-sm flex-end h-11"
      >
        Input exemption code if applicable
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            {state.status === "idle" && (
              <DialogTitle className="text-lg font-semibold">
                Input Exemption Code
              </DialogTitle>
            )}

            {state.status !== "success" && !isPending && (
              <p className="text-sm text-gray-600 mt-2">
                Ensure the code entered here is the code given to you from the
                Central registry, this only applied to specific Unit/Departments
              </p>
            )}
          </DialogHeader>

          <div className="mt-4">{renderContent()}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
