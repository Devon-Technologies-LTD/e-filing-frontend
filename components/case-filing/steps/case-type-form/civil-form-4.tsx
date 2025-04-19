"use client";
import { InfoIcon } from "lucide-react";
import InputField from "@/components/ui/InputField";
import "draft-js/dist/Draft.css";
import { useAppSelector } from "@/hooks/redux";
import {
  addCaseTypeError,
  ICaseTypes,
  updateCaseTypeName,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { ToolTipCard } from "@/components/ui/tool-tip-card";
import {  formatPart } from "@/lib/utils";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { DownloadSampleButton } from "@/components/ui/download-sample-document.";
import { LocationSelect } from "@/components/location-select";
import CivilFormLitigants from "./civil-form-litigants";
import CivilFormDatedThis from "./civil-form-dated-this";

export const CivilCaseForm4 = (documents: any) => {
  const dispatch = useDispatch();
  const {
    caseType: {
      court_division,
      case_type,
      sub_case_type,
      sum_claimed,
      cost_claimed,
      interest_claimed,
      claimant,
      defendant,
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
            value={formatPart(claimant)}
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
            name="defendant"
            type="text"
            label="DEFENDANT"
            disabled
            required
            value={formatPart(defendant)}
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
              showErrorInLabel
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

        <CivilFormLitigants />
        <CivilFormDatedThis />
        <div className="space-y-6">
          {documents?.documents?.map((doc: any) => (
            <div className="bg-white p-4 lg:w-1/2 w-full">
              <DocumentUploadComponent
                allowedUploadTypes={
                  doc?.title?.toLowerCase() === "e-signature"
                    ? null
                    : ["application/pdf"]
                }
                types={
                  doc?.title?.toLowerCase() === "e-signature"
                    ? undefined
                    : "PDF"
                }
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
