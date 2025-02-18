import DocumentUploadComponent from "@/components/ui/document-upload";
import { useAppSelector } from "@/hooks/redux";
import React, { useCallback } from "react";
import { CaseTypeData, CriminalCaseSubType } from "@/constants";
import { DirectCriminalComplaintForm } from "./direct-complaint-form";
import { useDispatch } from "react-redux";

export default function CriminalCaseForm() {
  const dispatch = useDispatch();
  const {
    caseType: { case_type, sub_case_type },

  } = useAppSelector((value) => value.caseFileForm);

  const handleSuccess = (data: any) => {
    console.log(data)
  };
  const handleError = (error: any) => {
    console.error("Upload/Update failed:", error);
  };

  const renderCriminalCaseContent = useCallback(() => {
    switch (sub_case_type) {
      case CriminalCaseSubType.FIRST_INFORMATION_REPORT:
        return (
          <div className="lg:w-1/2">
            <DocumentUploadComponent
              subTitle={CaseTypeData.CRIMINAL_CASE}
              title={CriminalCaseSubType.FIRST_INFORMATION_REPORT}
              caseType={case_type}
              subCase={sub_case_type}
              onSuccess={(data) => handleSuccess(data)}
              onError={handleError}
            />
          </div>
        );
      case CriminalCaseSubType.REQUEST_FOR_REMAND_ORDER:
        return (
          <div className="lg:w-1/2">
            <DocumentUploadComponent
              subTitle={CaseTypeData.CRIMINAL_CASE}
              title={CriminalCaseSubType.REQUEST_FOR_REMAND_ORDER}
              caseType={case_type}
              subCase={sub_case_type}
              onSuccess={(data) => handleSuccess(data)}
              onError={handleError}
            />
          </div>
        );
      case CriminalCaseSubType.DIRECT_COMPLAIN:
        return <DirectCriminalComplaintForm />;
      default:
        return null;
    }
  }, [case_type, sub_case_type]);

  return <div>{renderCriminalCaseContent()}</div>;
}
