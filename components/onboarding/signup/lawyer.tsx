"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InputField from "@/components/ui/InputField";
import { useFormState } from "react-dom";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { SignupAction } from "@/lib/actions/login";
import { CLIENT_ERROR_STATUS } from "@/lib/_constants";
import { LoginPasswordField } from "@/components/auth/password-component";
import DragDropUploaderNIN from "./DragDropUploaderNIN";
// import DragDropUploaderIPN from "./DragDropUploaderIPN";

const LawyerComponent = () => {
  const { toast } = useToast();
  // const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [state, dispatch] = useFormState(SignupAction, undefined);
  const [loading, setLoading] = useState<boolean>(false);

  function isFieldErrorObject(
    error: string | Record<string, string[]>
  ): error is Record<string, string[]> {
    return typeof error !== "string";
  }

  const errors =
    state?.errors && isFieldErrorObject(state.errors) ? state.errors : {};
  useEffectAfterMount(() => {
    if (state && CLIENT_ERROR_STATUS.includes(state?.status)) {
      toast({
        title: state?.message,
        description:
          typeof state.errors === "string"
            ? state.errors
            : Object.values(state.errors || {}).flat().join(", ") || "An error occurred.",
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px",
        },
      });
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    dispatch(formData);
  };

  useEffect(() => {
    if (state) {
      setLoading(false);
    }
  }, [state]);


  return (
    <div className="flex flex-col md:flex-row w-full h-full md:space-y-0 md:space-x-6">
      <form
        id="lawyer-form"
        onSubmit={handleSubmit}
        className="md:w-2/3 space-y-10"
      >
        <input type="hidden" name="role" value="LAWYER" />
        <input type="hidden" name="first_name" value="first_user" />
        <input type="hidden" name="last_name" value="last_user" />
        <input type="hidden" name="gender" value="male" />
        <div
          className="w-full flex-1 space-y-6 overflow-y-auto scrollbar-hide px-4 md:px-0"
          style={{ height: "calc(100vh - 300px)" }}
        >
          <div>
            <p className="font-bold text-sm text-neutral-500">
              Fields marked with an asterisk (*) are required.
            </p>

            <br />
            <InputField
              id="email"
              type="email"
              label="EMAIL ADDRESS"
              name="email"
              placeholder="name@gmail.com"
              required
              error={errors.email?.[0]}
            />

            {/* <div className="mt-6">
              <Select onValueChange={(value) => setSelectedMethod(value)}>
                <SelectTrigger className="w-full border-0 border-b-[1px] border-slate-300 font-bold text-neutral-700">
                  <SelectValue
                    className="text-neutral-700 text-md font-bold"
                    placeholder="Select an Identification Method"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white text-zinc-900">
                  <SelectItem
                    value="NIN"
                    className="text-sm font-semibold text-zinc-900 hover:text-gray-600"
                  >
                    National Identity Number (NIN) *
                  </SelectItem>
                  <SelectItem
                    value="IPN"
                    className="text-sm font-semibold text-zinc-900"
                  >
                    International Passport Number (IPN)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
          {/* {selectedMethod === "NIN" && ( */}
          <div className="space-y-6">
            <div>
              <InputField
                id="nin"
                type="text"
                label="National Identity Number (NIN)"
                name="nin"
                placeholder="e.g. 09876543212345"
                required
                error={errors.nin?.[0]}
              />
              <p className="text-sm font-bold mt-4 text-neutral-600">
                UPLOAD NATIONAL IDENTITY CARD*
              </p>
            </div>
            <DragDropUploaderNIN />
          </div>
          {/* )} */}
          {/* {selectedMethod === "IPN" && (
            <div className="space-y-6">
              <div>
                <InputField
                  id="ipn"
                  type="text"
                  label="International Password Number (IPN)*"
                  name="ipn"
                  placeholder="e.g. 09876543212345"
                  required
                  error={errors.ipn?.[0]}
                />
                <p className="text-sm font-bold mt-4 text-neutral-600">
                  UPLOAD INTERNATIONAL PASSPORT BIOPAGE*
                </p>
              </div>
              <DragDropUploaderIPN />
            </div>
          )} */}
          <div className="space-y-6">
            <InputField
              id="court"
              type="text"
              label="SUPREME COURT NUMBER (SCN)"
              name="scn"
              placeholder="e.g BA234RT75W"
              required
              error={errors.scn?.[0]}
            />
            <InputField
              id="phone"
              type="text"
              label="PHONE NUMBER"
              name="phone_number"
              placeholder="e.g +2347030338024"
              required
              error={errors.phone_number?.[0]}
            />
            <LoginPasswordField showStrength={true} label="PASSWORD" name="password" placeholder="Enter Password" />
            <LoginPasswordField label="CONFIRM PASSWORD" name="confirm_password" placeholder="Confirm Password" />

          </div>
        </div>
        <p className="text-sm text-red-500 h-2 text-center">
          {typeof state?.errors === "string"
            ? state.errors
            : Object.values(state?.errors || {}).flat().join(", ")}
        </p>
        {/* Loading State */}
        <p className="text-xs text-red-500 h-2 mt-3 text-center">
          {state && state?.message}
        </p>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="spinner"></div> {/* Add spinner */}
          </div>
        )}
      </form>
    </div>
  );
};

export { LawyerComponent };
