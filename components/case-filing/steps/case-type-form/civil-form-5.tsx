"use client";
import { useCallback, useState } from "react";
import { EditorState, Editor, ContentState } from "draft-js";
import {  InfoIcon } from "lucide-react";
import InputField from "@/components/ui/InputField";
import "draft-js/dist/Draft.css";
import { useAppSelector } from "@/hooks/redux";
import {
  addCaseTypeError,
  ICaseTypes,
  updateCaseTypeName,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { TextwithToolTip, ToolTipCard } from "@/components/ui/tool-tip-card";
import { formatPart } from "@/lib/utils";
import DocumentUploadComponent from "@/components/ui/document-upload";
import { DownloadSampleButton } from "@/components/ui/download-sample-document.";
import { LocationSelect } from "@/components/location-select";
import CivilFormLitigants from "./civil-form-litigants";
import CivilFormDatedThis from "./civil-form-dated-this";

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
            value={formatPart(claimant)}
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

        <CivilFormLitigants />
        <CivilFormDatedThis />

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
