import InputField from "@/components/ui/InputField";
import { useAppSelector } from "@/hooks/redux";
import { updateMultipleCaseTypeFields } from "@/redux/slices/case-filing-slice";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

export default function CivilFormLitigants() {
  const dispatch = useDispatch();

  const {
    caseType: { claimant, defendant },
    caseTypeErrors,
  } = useAppSelector((data) => data.caseFileForm);

  const inputRef = useRef(null);

  const handleWhatsAppChange = (e: any) => {
    const cleanedInput = e.target.value.replace(/\D/g, "");
    const chunkSize = 11;
    const phoneChunks: any = [];

    for (let i = 0; i < cleanedInput.length; i += chunkSize) {
      phoneChunks.push(cleanedInput.slice(i, i + chunkSize));
    }

    const updatedClaimants = claimant.map((c, i) => ({
      ...c,
      whatsapp: phoneChunks[i] ?? "",
    }));

    dispatch(
      updateMultipleCaseTypeFields({
        fields: { claimant: updatedClaimants },
      })
    );
  };
  const handleDefWhatsAppChange = (e: any) => {
    const cleanedInput = e.target.value.replace(/\D/g, "");

    const chunkSize = 11;
    const phoneChunks: any = [];

    for (let i = 0; i < cleanedInput.length; i += chunkSize) {
      phoneChunks.push(cleanedInput.slice(i, i + chunkSize));
    }

    const updatedClaimants = defendant.map((c, i) => ({
      ...c,
      whatsapp: phoneChunks[i] ?? "",
    }));

    dispatch(
      updateMultipleCaseTypeFields({
        fields: { defendant: updatedClaimants },
      })
    );
  };

  return (
    <div className="space-y-5">
      <p className="text-lg font-bold">
        The Address for Service, Phone Numbers and email Addresses of the
        Parties are:
      </p>
      <div className="flex gap-2">
        <div className=" w-full text-neutral-600 space-y-6">
          <p className="text-base font-bold">COMPLAINT DETAILS</p>
          <InputField
            id="claimant_address"
            name="claimant_address"
            disabled
            className="text-sm overflow-x-auto whitespace-nowrap"
            required
            value={claimant.map((c, i) => `${i + 1}: ${c.address}`).join(", ")}
            type="text"
            error={caseTypeErrors?.claimant_address ?? ""}
            label="PHYSICAL ADDRESS"
            placeholder="e.g Block 33 Flat 3 Kubwa Abuja "
          />
          <InputField
            id="claimant_phone_number"
            name="claimant_phone_number"
            disabled
            className="text-sm overflow-x-auto whitespace-nowrap"
            value={claimant
              .map((c, i) => `${i + 1}: ${c.phone_number}`)
              .join(", ")}
            error={caseTypeErrors?.claimant_phone_number ?? ""}
            type="text"
            label="PHONE NUMBERS"
            placeholder="eg. 2347030338024"
          />
          <InputField
            id="claimant_email_address"
            name="claimant_email_address"
            disabled
            required
            type="email"
            label="Email Address"
            className="text-sm overflow-x-auto whitespace-nowrap"
            value={claimant
              .map((c, i) => `${i + 1}: ${c.email_address}`)
              .join(", ")}
            error={caseTypeErrors?.claimant_email_address ?? ""}
            placeholder="eg. johndoe@gmail.com"
          />
          <InputField
            id="claimant_whats_app"
            name="claimant_whats_app"
            type="text"
            label="Whatsapp Number"
            className="text-sm overflow-x-auto whitespace-nowrap"
            value={claimant.map((c) => c.whatsapp).join(", ")}
            onChange={handleWhatsAppChange}
            ref={inputRef}
            error={caseTypeErrors?.claimant_whats_app ?? ""}
            placeholder="eg. 2347030338024"
          />
        </div>
        <div className=" w-full space-y-6">
          <p className="text-base font-bold">DEFENDANT DETAILS</p>
          <InputField
            showErrorInLabel
            id="defendant_address"
            name="defendant_address"
            disabled
            className="text-sm overflow-x-auto whitespace-nowrap"
            required
            value={defendant.map((d, i) => `${i + 1}: ${d.address}`).join(", ")}
            error={caseTypeErrors?.defendant_address ?? ""}
            label="PHYSICAL ADDRESS"
            placeholder="e.g Block 33 Flat 3 Kubwa Abuja "
          />
          <InputField
            id="defendant_phone_number"
            name="defendant_phone_number"
            showErrorInLabel
            disabled
            className="text-sm overflow-x-auto whitespace-nowrap"
            value={defendant
              .map((d, i) => `${i + 1}: ${d.phone_number}`)
              .join(", ")}
            type="text"
            label="PHONE NUMBERS"
            placeholder="eg. 2347030338024"
          />
          <InputField
            id="defendant_email_address"
            name="defendant_email_address"
            type="email"
            label="Email Address"
            disabled
            className="text-sm overflow-x-auto whitespace-nowrap"
            value={defendant
              .map((d, i) => `${i + 1}: ${d.email_address}`)
              .join(", ")}
            error={caseTypeErrors?.defendant_email_address ?? ""}
            placeholder="eg. johndoe@gmail.com"
          />
          <InputField
            id="defendant_whats_app"
            name="defendant_whats_app"
            type="text"
            label="Whatsapp Number"
            className="text-sm overflow-x-auto whitespace-nowrap"
            value={defendant.map((d) => d.whatsapp).join(", ")}
            onChange={handleDefWhatsAppChange}
            error={caseTypeErrors?.defendant_whats_app ?? ""}
            placeholder="eg. 2347030338024"
          />
        </div>
      </div>
    </div>
  );
}
