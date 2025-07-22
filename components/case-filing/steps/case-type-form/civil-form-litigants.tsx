import InputField from "@/components/ui/InputField";
import { useAppSelector } from "@/hooks/redux";
import React from "react";

export default function CivilFormLitigants() {

  const {
    caseType: { claimant, defendant },
    caseTypeErrors,
  } = useAppSelector((data) => data.caseFileForm);

  return (
    <div className="space-y-5">
      <p className="text-lg font-bold">
        The Address for Service, Phone Numbers and email Addresses of the
        Parties are:
      </p>
      <div className="flex gap-2">
        <div className=" w-full text-neutral-600 space-y-6">
          <p className="text-base font-bold">Complainant’s Details</p>
          <InputField
            id="claimant_address"
            name="claimant_address"
            disabled
            className="text-sm overflow-x-auto whitespace-nowrap"
            required
            value={claimant
              .map((c, i) => (c.address ? `${i + 1}: ${c.address}` : ` N/A`))
              .join(", ")}
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
              .map((c, i) =>
                c.phone_number ? `${i + 1}: ${c.phone_number}` : ` N/A`
              )
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
              .map((c, i) =>
                c.email_address ? `${i + 1}: ${c.email_address}` : `N/A`
              )
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
            disabled
            value={claimant
              .map((c, i) => (c.whatsapp ? `${i + 1}: ${c.whatsapp}` : ` N/A`))
              .join(", ")}
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
            value={defendant
              .map((d, i) => (d.address ? `${i + 1}: ${d.address}` : ` N/A`))
              .join(", ")}
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
              .map((d, i) =>
                d.phone_number ? `${i + 1}: ${d.phone_number}` : ` N/A`
              )
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
              .map((d, i) =>
                d.email_address ? `${i + 1}: ${d.email_address}` : ` N/A`
              )
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
            disabled
            value={defendant
              .map((d, i) => (d.whatsapp ? `${i + 1}: ${d.whatsapp}` : `N/A`))
              .join(", ")}
            error={caseTypeErrors?.defendant_whats_app ?? ""}
            placeholder="eg. 2347030338024"
          />
        </div>
      </div>
    </div>
  );
}
