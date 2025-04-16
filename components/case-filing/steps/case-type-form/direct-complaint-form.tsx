import { useState, useCallback } from "react";
import { ContentState, EditorState } from "draft-js";
import InputField from "@/components/ui/InputField";
import { InfoIcon } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { useDispatch } from "react-redux";
import { updateCaseTypeName } from "@/redux/slices/case-filing-slice";
import { DownloadSampleButton } from "@/components/ui/download-sample-document.";
import { LocationSelect } from "@/components/location-select";
import { RichTextEditor } from "@/components/rich-text-editor";
export const DirectCriminalComplaintForm = () => {
  const {
    caseType: { direct_complain, court_division, claimant, defendant },
    caseTypeErrors,
  } = useAppSelector((data) => data.caseFileForm);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState?.createFromText(direct_complain ?? " ")
    )
  );

  const dispatch = useDispatch();

  const handleEditorChange: any = useCallback(
    (newEditorState: any) => {
      setEditorState(newEditorState);
      const content = newEditorState.getCurrentContent().getPlainText();
      dispatch(
        updateCaseTypeName({
          direct_complain: content,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-neutral-600">FORM DETAILS</p>
        <DownloadSampleButton
          fileName="direct_criminal_complaint_sample"
          imageSrc={"/downloadable-images/DCC 1.png"}
        />
      </div>
      <div className="border-0 w-full border-t-2 space-y-6 border-black bg-neutral-100 p-4">
        <p className="text-base font-semibold">BETWEEEN</p>
        <InputField
          id="claimant"
          name="claimant"
          type="text"
          label="CLAIMANT"
          disabled
          value={
            claimant.length > 1
              ? `${claimant[0].last_name} and ${claimant.length - 1} ORS`
              : claimant[0].last_name ?? ""
          }
          tooltipText="Enter the name of the claimant"
          tooltipIcon={InfoIcon}
          placeholder="eg. John Doe"
          error={caseTypeErrors?.claimant_name ?? ""}
        />
        <p className="text-base font-bold">AND</p>
        <InputField
          id="defendant"
          name="defendant"
          type="text"
          disabled
          label="DEFENDANT"
          value={
            defendant.length > 1
              ? `${defendant[0].last_name} and ${defendant.length - 1} ORS`
              : defendant[0].last_name ?? ""
          }
          tooltipText="Enter the name of the defendant"
          tooltipIcon={InfoIcon}
          error={caseTypeErrors?.defendant_name ?? ""}
          placeholder="eg. John Doe"
        />
        <div className="text-base font-bold">
          <p>THE REGISTRAR</p>
          <p>CHIEF JUSTICE COURT</p>
        </div>
        <div className="flex lg:w-1/2">
          <LocationSelect
            value={court_division}
            onChange={(value) => {
              dispatch(updateCaseTypeName({ court_division: value }));
            }}
          />
        </div>
        <div className="text-base flex items-center gap-3 font-bold">
          <p>DIRECT CRIMINAL COMPLAINT AGAINST</p>
          <span className="text-xs text-red-500 ">
            {caseTypeErrors?.direct_complain ?? ""}
          </span>
        </div>
        <RichTextEditor
          editorState={editorState}
          setEditorState={handleEditorChange}
        />
      </div>
    </div>
  );
};
