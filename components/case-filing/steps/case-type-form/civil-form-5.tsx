"use client";
import { useCallback, useState } from "react";
import { EditorState, Editor, ContentState } from "draft-js";
import { CalendarIcon, InfoIcon } from "lucide-react";
import InputField from "@/components/ui/InputField";
import "draft-js/dist/Draft.css";
import { getUserDivision } from "@/lib/actions/division";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/redux";
import {
  addCaseTypeError,
  ICaseTypes,
  updateCaseTypeName,
  updateMultipleCaseTypeFields,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { TextwithToolTip, ToolTipCard } from "@/components/ui/tool-tip-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { DownloadSampleButton } from "@/components/ui/download-sample-document.";
import { LocationSelect } from "@/components/location-select";

export const CivilCaseForm5 = (documents: any) => {
  const dispatch = useDispatch();
  const {
    caseType: {
      property_description,
      rental_value,
      relief_sought,
      case_type,
      sub_case_type,
      court_division,
      claimant,
      defendant,
    },

    caseTypeErrors,
  } = useAppSelector((data) => data.caseFileForm);
  const [propertyDescription, setPropertyDescripton] = useState(() =>
    EditorState.createWithContent(
      ContentState?.createFromText(property_description ?? "")
    )
  );
  const { data: user } = useAppSelector((state) => state.profile);
  const [reliefSought, setReliefSought] = useState(() =>
    EditorState.createWithContent(
      ContentState?.createFromText(relief_sought ?? "")
    )
  );

  const handleDescriptionChange: any = useCallback(
    (newEditorState: any) => {
      setPropertyDescripton(newEditorState);
      const content = newEditorState.getCurrentContent().getPlainText();
      dispatch(
        updateCaseTypeName({
          property_description: content,
        })
      );
      dispatch(
        addCaseTypeError({
          property_description: "",
        })
      );
    },
    [dispatch]
  );
  const handleReliefChange: any = useCallback(
    (newEditorState: any) => {
      setReliefSought(newEditorState);
      const content = newEditorState.getCurrentContent().getPlainText();
      dispatch(
        updateCaseTypeName({
          relief_sought: content,
        })
      );
      dispatch(
        addCaseTypeError({
          relief_sought: "",
        })
      );
    },
    [dispatch]
  );

  const handleChange = (name: keyof ICaseTypes, value: string | Date) => {
    dispatch(
      updateCaseTypeName({
        [name]: value,
      })
    );
    dispatch(
      addCaseTypeError({
        [name]: "",
      })
    );
  };

  const { data, isLoading: divisionFetching } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      return await getUserDivision();
    },
    placeholderData: keepPreviousData,
    staleTime: 50000,
  });
  const divisions: any = data?.data || [];

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-neutral-600">CIVIL FORM 5</p>
        <DownloadSampleButton
          fileName="sample_civil_form_5"
          imageSrc={"/downloadable-images/civil-form-5.png"}
        />
      </div>
      <div className="border-0 w-full border-t-2 space-y-8 border-black bg-neutral-100 p-4">
        <div className="space-y-2">
          <p className="text-base font-bold">
            IN THE DISTRICT COURT OF THE FEDERAL CAPITAL TERRITORY HOLDEN IN THE
          </p>
          <div className="flex lg:w-1/2">
            <LocationSelect
              disabled
              value={court_division}
              onChange={(value) => {
                handleChange("court_division", value);
              }}
              error={caseTypeErrors?.court_division ?? ""}
            />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-base font-semibold">BETWEEEN</p>
          <InputField
            id="claimant"
            disabled
            name="claimant"
            type="text"
            label="CLAIMANT"
            value={
              claimant.length > 1
                ? `${claimant[0].last_name} and ${claimant.length - 1} ORS`
                : claimant[0].last_name ?? ""
            }
            className="capitalize"
            tooltipContent={
              <ToolTipCard
                className="p-"
                title="WHO IS A COMPLAINT"
                description="the person who officially reports a problem or wrongdoing, usually to the police or a court, asking for action to be taken. They are the one making the complaint in a case."
              />
            }
            tooltipIcon={InfoIcon}
            placeholder="eg. John Doe"
            error={caseTypeErrors?.claimant_name ?? ""}
          />
        </div>
        <div className="space-y-3">
          <p className="text-base font-semibold">AND</p>
          <InputField
            id="defendant"
            disabled
            name="defendant"
            type="text"
            label="DEFENDANT(S)"
            value={
              defendant.length > 1
                ? `${defendant[0].last_name} and ${defendant.length - 1} ORS`
                : defendant[0].last_name ?? ""
            }
            tooltipContent={
              <ToolTipCard
                title="WHO IS A DEFENDANT?"
                description="The person or persons who responds to a claim or accusation, you made against them"
              />
            }
            tooltipIcon={InfoIcon}
            placeholder="eg. John Doe"
            error={caseTypeErrors?.defendant_name ?? ""}
          />
        </div>
        <div className="space-y-3">
          <div className="text-lg font-bold">
            At the suit of this complaint, this plaint is taking out with
            respect to
          </div>
          <p className="flex justify-between items-center gap-1 text-sm font-bold  text-neutral-600">
            <span className="flex items-center gap-1 ">
              <TextwithToolTip
                tooltipContent={
                  <ToolTipCard
                    title="DESCRIPTION/LOCATION OF PROPERTY"
                    description={`This section is for providing details about the property involved in the case. Include a clear description (e.g., type of property, size, features) and the exact location (e.g., address, landmarks) to help identify it. <br /> <br/>  Example: “A three-bedroom apartment located at No. 10, Maple Street, Lagos, with a blue gate and a fenced compound."`}
                  />
                }
              />{" "}
              GIVE DESCRIPTION AND ADDRESS/LOCATION OF PROPERTY
            </span>
            <span className="text-xs text-red-500 ">
              {caseTypeErrors?.property_description ?? ""}
            </span>{" "}
          </p>
          <div className="p-2 bg-white h-40">
            <Editor
              editorState={propertyDescription}
              onChange={handleDescriptionChange}
              placeholder="Describe property.."
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-lg font-bold">
            With annual rental value Of property
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-bold  text-neutral-600">
              <TextwithToolTip
                tooltipContent={
                  <ToolTipCard
                    title="ANNUAL RENTAL VALUE"
                    description={`This refers to the amount of money the property is rented for, usually on a monthly or yearly basis. It helps determine the financial value of the premises in a legal case. <br/> <br/>Example:<br /> “The rental value of the property is ₦500,000 per year.”`}
                  />
                }
              />{" "}
              VALUE IN FIGURES (VALUE AT THE TIME RELEVANT TO THE FACT){" "}
            </p>
            <InputField
              id="rental_value"
              name="rental_value"
              type="string"
              label=""
              value={rental_value}
              onChange={({ target }) => {
                handleChange("rental_value", target.value);
              }}
              placeholder="eg. 800m, 000"
              error={caseTypeErrors?.rental_value ?? ""}
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-lg font-bold">
            The relief(s) sought by the complaint are
          </div>
          <p className="flex justify-between  items-center gap-1 text-sm font-bold  text-neutral-600">
            <span className="flex items-center gap-1 ">
              <TextwithToolTip
                tooltipContent={
                  <ToolTipCard
                    className="max-w-[22rem]"
                    title="DESCRIBE/LIST RELIEFS"
                    description={`This is where you state what you are asking the court to do in your case. Reliefs are the specific legal remedies or actions you want the court to grant, such as payment of debts, eviction of a tenant, compensation for damages, or enforcement of an agreement. <br /> <br /> Example:  <li> An order for the tenant to vacate the premises.</li> <li>Payment of outstanding rent and damages.</li> <li> Refund of money owed. </li> <li>Enforcement of a contract agreement. </li>`}
                  />
                }
              />{" "}
              LIST/DESCRIBE RELIEF BY CLAIMANT
            </span>
            <span className="text-xs text-red-500 ">
              {caseTypeErrors?.relief_sought ?? ""}
            </span>
          </p>
          <div className="p-2 bg-white h-40">
            <Editor
              editorState={reliefSought}
              onChange={handleReliefChange}
              placeholder="Describe property.."
            />
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-lg font-bold">
            The Address for Service, Phone Numbers and email Addresses of the
            Parties are:
          </p>
          <div className="flex ">
            <div className=" w-full text-neutral-600 space-y-6">
              <p className="text-base font-bold">COMPLAINT DETAILS</p>
              <InputField
                id="claimant_address"
                name="claimant_address"
                disabled
                required
                showErrorInLabel
                value={claimant[0].address}
                type="text"
                label="PHYSICAL ADDRESS"
                placeholder="e.g Block 33 Flat 3 Kubwa Abuja "
                error={caseTypeErrors?.claimant_address ?? ""}
              />
              <InputField
                id="claimant_phone_number"
                name="claimant_phone_number"
                disabled
                showErrorInLabel
                value={claimant[0].phone_number}
                type="text"
                label="PHONE NUMBERS"
                placeholder="eg. 2347030338024"
                error={caseTypeErrors?.claimant_phone_number ?? ""}
              />
              <InputField
                id="claimant_email_address"
                name="claimant_email_address"
                disabled
                type="email"
                label="Email Address"
                value={claimant[0].email_address}
                error={caseTypeErrors?.claimant_email_address ?? ""}
                placeholder="eg. johndoe@gmail.com"
              />
              <InputField
                id="claimant_whats_app"
                name="claimant_whats_app"
                type="text"
                label="Whatsapp Number"
                value={claimant[0].whatsapp}
                onChange={({ target }) => {
                  const updatedClaimants = claimant.map((claimant) => ({
                    ...claimant,
                    ["whatsapp"]: target.value,
                  }));

                  dispatch(
                    updateMultipleCaseTypeFields({
                      fields: { claimant: updatedClaimants },
                    })
                  );
                  // handleChange("defendant_email_address", target.value);
                }}
                error={caseTypeErrors?.claimant_whats_app ?? ""}
                placeholder="eg. 2347030338024"
              />
            </div>
            <div className=" w-full text-neutral-600 space-y-6">
              <p className="text-base font-bold">DEFENDANT DETAILS</p>
              <InputField
                id="defendant_address"
                name="defendant_address"
                required
                showErrorInLabel
                value={defendant[0].address}
                type="text"
                onChange={({ target }) => {
                  const updatedClaimants = defendant.map((defendant) => ({
                    ...defendant,
                    ["address"]: target.value,
                  }));

                  dispatch(
                    updateMultipleCaseTypeFields({
                      fields: { defendant: updatedClaimants },
                    })
                  );
                  dispatch(
                    addCaseTypeError({
                      address: "",
                      defendant_address: "",
                    })
                  );
                  // handleChange("defendant_email_address", target.value);
                }}
                error={caseTypeErrors?.defendant_address ?? ""}
                label="PHYSICAL ADDRESS"
                placeholder="e.g Block 33 Flat 3 Kubwa Abuja "
              />
              <InputField
                id="defendant_phone_number"
                name="defendant_phone_number"
                showErrorInLabel
                value={defendant[0].phone_number}
                onChange={({ target }) => {
                  const updatedClaimants = defendant.map((defendant) => ({
                    ...defendant,
                    ["phone_number"]: target.value,
                  }));

                  dispatch(
                    updateMultipleCaseTypeFields({
                      fields: { defendant: updatedClaimants },
                    })
                  );
                  dispatch(
                    addCaseTypeError({
                      defendant_phone_number: "",
                    })
                  );
                  // handleChange("defendant_email_address", target.value);
                }}
                error={caseTypeErrors?.defendant_phone_number ?? ""}
                type="text"
                label="PHONE NUMBERS"
                placeholder="eg. 2347030338024"
              />
              <InputField
                id="defendant_email_address"
                name="defendant_email_address"
                type="email"
                label="Email Address"
                value={defendant[0].email_address}
                onChange={({ target }) => {
                  const updatedClaimants = defendant.map((defendant) => ({
                    ...defendant,
                    ["email_address"]: target.value,
                  }));

                  dispatch(
                    updateMultipleCaseTypeFields({
                      fields: { defendant: updatedClaimants },
                    })
                  );
                  // handleChange("defendant_email_address", target.value);
                }}
                error={caseTypeErrors?.defendant_email_address ?? ""}
                placeholder="eg. johndoe@gmail.com"
              />
              <InputField
                id="defendant_whats_app"
                name="defendant_whats_app"
                type="text"
                label="Whatsapp Number"
                value={defendant[0].whatsapp}
                onChange={({ target }) => {
                  const updatedClaimants = defendant.map((defendant) => ({
                    ...defendant,
                    ["whatsapp"]: target.value,
                  }));

                  dispatch(
                    updateMultipleCaseTypeFields({
                      fields: { defendant: updatedClaimants },
                    })
                  );
                  // handleChange("defendant_email_address", target.value);
                }}
                error={caseTypeErrors?.defendant_whats_app ?? ""}
                placeholder="eg. 2347030338024"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-bold">
            This plaint was taken out by claimant/counsel as the case may be
          </p>
          <p className=" flex items-center gap-3 text-base font-bold text-neutral-600">
            DATED THIS
          </p>
          <div className="flex items-end justify-start text-center">
            <Button
              disabled
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11",
                "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {format(new Date(), "PPP")}{" "}
            </Button>
          </div>
        </div>
        <InputField
          required
          id="counsel_name"
          name="counsel_name"
          disabled
          showErrorInLabel
          type="text"
          label="NAME"
          placeholder="e.g claimant/counsel name"
          value={`${user?.last_name} ${user?.first_name}`}
          onChange={({ target }) => {
            handleChange("counsel_name", target.value);
          }}
          error={caseTypeErrors?.counsel_name ?? ""}
        />

        <div className="space-y-6">
          {documents?.documents?.map((doc: any) => (
            <div className="bg-white p-4 lg:w-1/2 w-full">
              <DocumentUploadComponent
                required
                subTitle={case_type}
                title={doc.title}
                caseType={case_type}
                subCase={sub_case_type}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
