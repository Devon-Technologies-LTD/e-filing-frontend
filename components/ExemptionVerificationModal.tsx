
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
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { verifyExemptionCode, verifyExemptionCode2 } from "@/lib/actions/case-file";
import { ICaseTypes, updateCaseTypeName } from "@/redux/slices/case-filing-slice";
type ExemptionVerificationModalProps = {
  handleExemptionStep: () => void;
  setExmptionCode: (code: string) => void;
};

export default function ExemptionVerificationModal({ handleExemptionStep, setExmptionCode }: ExemptionVerificationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [state, setState] = useState<{
    status: "idle" | "success" | "error";
    message?: string;
    errors?: string;
    data?: any;
  }>({ status: "idle" });

  const [exemptionCode, setExemptionCode] = useState("");
  const handleOpenChange = (open: boolean | ((prevState: boolean) => boolean)) => {
    setIsOpen(open);
    if (!open) {
      setState({ status: "idle" });
      setExemptionCode("");
    }
  };

  const handleSubmit = () => {
    if (!exemptionCode.trim()) {
      setState({
        status: "error",
        message: "Exemption ID is required",
        errors: "Please enter a valid exemption code"
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await verifyExemptionCode2(exemptionCode.trim());
        console.log(result.success);
        if (result.success) {
          setState({
            status: "success",
            message: "Verification successful",
            data: result.data
          });
          setExmptionCode(exemptionCode);
          //
          return;
        } else {
          setState({
            status: "error",
            message: "Invalid Exemption Code ",
            data: result.data
          });
        }
      } catch (error) {
        setState({
          status: "error",
          message: "Verification failed",
          errors: "An unexpected error occurred. Please try again."
        });
      }
    });
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter' && !isPending && exemptionCode.trim()) {
      handleSubmit();
    }
  };

  const renderSuccessContent = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-center text-green-800">
        Verified Successfully
      </h3>
      <p className="text-sm text-gray-600 text-center">
        Your exemption code has been validated successfully
      </p>
      <Button
        onClick={() => {
          handleExemptionStep();
          handleOpenChange(false);
        }}
        className="mt-4 bg-green-600 hover:bg-green-700"
      >
        Continue
      </Button>
    </div>
  );

  const renderLoadingContent = () => (
    <div className="border-2 border-dashed border-blue-300 rounded-lg p-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h3 className="text-lg font-semibold text-blue-700">
          Verifying Authenticity
        </h3>
        <p className="text-sm text-gray-600 text-center">
          Please wait while we verify your exemption status
        </p>
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );

  const renderFormContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="exemptionId" className="text-sm font-medium text-gray-700">
          Exemption ID
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="exemptionId"
          name="exemptionId"
          type="text"
          placeholder="Enter exemption code"
          className="w-full"
          value={exemptionCode}
          onChange={(e) => setExemptionCode(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isPending}
        />
        {state.status === "error" && (
          <div className="flex items-start space-x-2 text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm font-medium">{state.message}</p>
              {state.errors && (
                <p className="text-sm mt-1 text-red-500">{state.errors}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold"
        disabled={isPending || !exemptionCode.trim()}
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

  const renderContent = () => {
    if (state.status === "success") {
      return renderSuccessContent();
    }

    if (isPending) {
      return renderLoadingContent();
    }

    return renderFormContent();
  };

  return (
    <div className="p-8">
      <Button
        onClick={() => setIsOpen(true)}
        className="font-bold lg:flex hidden bg-red-50 text-red-800 text-sm h-11 hover:bg-red-100 border border-red-200"
      >
        Input exemption code if applicable
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            {(state.status === "idle" || state.status === "error") && (
              <>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Input Exemption Code
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Ensure the code entered here is the code given to you from the
                  Central Registry. This only applies to specific Units/Departments.
                </p>
              </>
            )}
          </DialogHeader>

          <div className="mt-4">{renderContent()}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function dispatch(arg0: { payload: Partial<ICaseTypes>; type: "case-filing-form/updateCaseTypeName"; }) {
  throw new Error("Function not implemented.");
}
