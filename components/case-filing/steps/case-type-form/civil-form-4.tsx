"use client";
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
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { ToolTipCard } from "@/components/ui/tool-tip-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { DownloadSampleButton } from "@/components/ui/download-sample-document.";
import { CaseTypeData, CivilDocumentTitles } from "@/constants";
import { LocationSelect } from "@/components/location-select";

export const CivilCaseForm4 = () => {
  const dispatch = useDispatch();
  const {
    caseType: {
      claimant_name,
      defendant_name,
      court_division,
      claimant_phone_number,
      claimant_address,
      claimant_email_address,
      claimant_whats_app,
      defendant_address,
      defendant_email_address,
      defendant_phone_number,
      defendant_whats_app,
      case_type,
      sub_case_type,
      sum_claimed,
      dated_this,
      cost_claimed,
      interest_claimed,
      recovery_amount,
      counsel_name,
    },
    caseTypeErrors,
  } = useAppSelector((data) => data.caseFileForm);

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
        <p className="text-sm font-bold text-neutral-600">CIVIL FORM 4</p>
        <DownloadSampleButton
          fileName="sample_civil_form_4"
          imageSrc={"/downloadable-images/civil-form-4.png"}
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
            name="claimant"
            type="text"
            label="CLAIMANT"
            disabled
            required
            value={claimant_name}
            tooltipContent={
              <ToolTipCard
                className="p-"
                title="WHO IS A COMPLAINT"
                description="the person who officially reports a problem or wrongdoing, usually to the police or a court, asking for action to be taken. They are the one making the complaint in a case."
              />
            }
            tooltipIcon={InfoIcon}
            placeholder="eg. John Doe"
            onChange={({ target }) => {
              handleChange("claimant_name", target.value);
            }}
            error={caseTypeErrors?.claimant_name ?? ""}
          />
        </div>
        <div className="space-y-3">
          <p className="text-base font-semibold">AND</p>
          <InputField
            id="defendant"
            name="defendant"
            type="text"
            label="DEFENDANT"
            disabled
            required
            value={defendant_name}
            tooltipContent={
              <ToolTipCard
                title="WHO IS A DEFENDANT?"
                description="The person or persons who responds to a claim or accusation, you made against them"
              />
            }
            tooltipIcon={InfoIcon}
            placeholder="eg. John Doe"
            onChange={({ target }) => {
              handleChange("defendant_name", target.value);
            }}
            error={caseTypeErrors?.defendant_name ?? ""}
          />
        </div>

        <div className="space-y-3">
          <p className="text-lg font-bold">
            At the suit of this complaint, this plaint is taking out with the
            following monetary claim(s):
          </p>
          <div className="space-y-6">
            <InputField
              id="sum_claimed"
              name="sum_claimed"
              value={sum_claimed}
              type="text"
              onChange={({ target }) => {
                handleChange("sum_claimed", target.value);
              }}
              error={caseTypeErrors?.sum_claimed ?? ""}
              tooltipContent={
                <ToolTipCard
                  className="p-"
                  title="SUM CLAIMED IN WORDS"
                  description="This is where you write the total amount of money being claimed in words instead of numbers. It ensures clarity and prevents errors or disputes about the exact amount being requested. <br /> <br/> Example:<br /> If the sum claimed is ₦1,500,000, you would write: “One million, five hundred thousand naira only."
                />
              }
              tooltipIcon={InfoIcon}
              label="SUM CLAIMED IN WORDS AND FIGURES"
              placeholder="e.g eight hundred thousand Naira. (800,000) "
            />
            <InputField
              id="cost_claimed"
              name="cost_claimed"
              value={cost_claimed}
              type="text"
              onChange={({ target }) => {
                handleChange("cost_claimed", target.value);
              }}
              error={caseTypeErrors?.cost_claimed ?? ""}
              tooltipContent={
                <ToolTipCard
                  className="p-"
                  title="COST CLAIMED"
                  description="This refers to additional expenses incurred while pursuing the case, which the claimant is asking the court to order the defendant to pay. It can include legal fees, court filing fees, and other related costs. <br/> <br/> Example: <br/> The claimant seeks ₦50,000 as reimbursement for legal and court filing expenses."
                />
              }
              tooltipIcon={InfoIcon}
              label="COST CLAIMED (IF ANY)"
              placeholder="e.g eight hundred thousand Naira. (800,000) "
            />{" "}
            <InputField
              id="interest_claimed"
              name="interest_claimed"
              value={interest_claimed}
              type="text"
              onChange={({ target }) => {
                handleChange("interest_claimed", target.value);
              }}
              error={caseTypeErrors?.interest_claimed ?? ""}
              tooltipContent={
                <ToolTipCard
                  className="p-"
                  title="INTEREST CLAIMED"
                  description="This refers to any extra amount being requested on top of the main sum, usually as compensation for delays in payment. It can be a fixed amount or a percentage applied over a period of time. <br/> <br/> Example:<br/> The claimant seeks 10% interest per annum on the outstanding amount from the due date until full payment is made."
                />
              }
              tooltipIcon={InfoIcon}
              label="INTEREST CLAIMED (IF ANY)"
              placeholder="e.g 10% Percent"
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
              <p className="text-base font-bold">COMPLAINANT DETAILS</p>
              <InputField
                id="claimant_address"
                name="claimant_address"
                disabled
                required
                value={claimant_address}
                type="text"
                onChange={({ target }) => {
                  handleChange("claimant_address", target.value);
                }}
                error={caseTypeErrors?.claimant_address ?? ""}
                label="PHYSICAL ADDRESS"
                placeholder="e.g Block 33 Flat 3 Kubwa Abuja "
              />
              <InputField
                id="claimant_phone_number"
                name="claimant_phone_number"
                disabled
                required
                value={claimant_phone_number}
                onChange={({ target }) => {
                  handleChange("claimant_phone_number", target.value);
                }}
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
                value={claimant_email_address}
                onChange={({ target }) => {
                  handleChange("claimant_email_address", target.value);
                }}
                error={caseTypeErrors?.claimant_email_address ?? ""}
                placeholder="eg. johndoe@gmail.com"
              />
              <InputField
                id="claimant_whats_app"
                name="claimant_whats_app"
                type="text"
                label="Whatsapp Number"
                value={claimant_whats_app}
                onChange={({ target }) => {
                  handleChange("claimant_whats_app", target.value);
                }}
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
                value={defendant_address}
                type="text"
                required
                onChange={({ target }) => {
                  handleChange("defendant_address", target.value);
                }}
                error={caseTypeErrors?.defendant_address ?? ""}
                label="PHYSICAL ADDRESS"
                placeholder="e.g Block 33 Flat 3 Kubwa Abuja "
              />
              <InputField
                id="defendant_phone_number"
                name="defendant_phone_number"
                showErrorInLabel
                required
                value={defendant_phone_number}
                onChange={({ target }) => {
                  handleChange("defendant_phone_number", target.value);
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
                value={defendant_email_address}
                onChange={({ target }) => {
                  handleChange("defendant_email_address", target.value);
                }}
                error={caseTypeErrors?.defendant_email_address ?? ""}
                placeholder="eg. johndoe@gmail.com"
              />
              <InputField
                id="defendant_whats_app"
                name="defendant_whats_app"
                type="text"
                label="Whatsapp Number"
                value={defendant_whats_app}
                onChange={({ target }) => {
                  handleChange("defendant_whats_app", target.value);
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
            <span className="flex ">
              DATED THIS <span className="text-red-500 ml-1">*</span>
            </span>
            <span className="text-xs text-red-500 ">
              {caseTypeErrors?.dated_this ?? ""}
            </span>
          </p>
          <div className="flex items-end justify-start text-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11",
                    !dated_this && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {dated_this ? (
                    format(dated_this, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}{" "}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dated_this}
                  onSelect={(date) => {
                    if (date) handleChange("dated_this", date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-base items-center gap-3 text-neutral-600 font-bold">
              SIGNATURE{" "}
              <span className="text-xs text-red-500 ">
                {caseTypeErrors?.signature ?? ""}
              </span>
            </p>
            <div className="bg-white p-4 lg:w-1/2 w-full">
              <DocumentUploadComponent
                required
                subTitle={CaseTypeData.CIVIL_CASE}
                title={"E-SIGNATURE"}
                caseType={case_type}
                subCase={sub_case_type}
              />
            </div>
          </div>

          <InputField
            id="counsel_name"
            name="counsel_name"
            type="text"
            label="NAME"
            placeholder="e.g claimant/counsel name"
            value={counsel_name}
            onChange={({ target }) => {
              handleChange("counsel_name", target.value);
            }}
            error={caseTypeErrors?.counsel_name ?? ""}
          />
          <div className="mt-3 lg:w-1/2">
            <DocumentUploadComponent
              required
              subTitle={CaseTypeData.CIVIL_CASE}
              title={CivilDocumentTitles.OtherPlaintsDocument}
              caseType={case_type}
              subCase={sub_case_type}
              errorMessage={caseTypeErrors?.plaintParticulars ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
