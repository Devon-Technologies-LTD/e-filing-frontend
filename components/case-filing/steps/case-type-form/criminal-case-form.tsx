import DocumentUploadComponent from "@/components/ui/document-upload";
import { useAppSelector } from "@/hooks/redux";
import React, { useCallback } from "react";
import {
  CaseTypeData,
  CriminalCaseSubType,
  DocumentTitlesEnum,
} from "@/constants";
import { DirectCriminalComplaintForm } from "./direct-complaint-form";

export default function CriminalCaseForm() {
  const {
    caseType: { case_type, sub_case_type },
    caseTypeErrors,
  } = useAppSelector((value) => value.caseFileForm);

  const renderCriminalCaseContent = useCallback(() => {
    switch (sub_case_type) {
      case CriminalCaseSubType.FIRST_INFORMATION_REPORT:
        return (
          <div className="lg:w-1/2">
            <DocumentUploadComponent
              required
              errorMessage={caseTypeErrors?.firDoc ?? ""}
              subTitle={CaseTypeData.CRIMINAL_CASE}
              title={DocumentTitlesEnum.FirstInformationReportFIR}
              caseType={case_type}
              subCase={sub_case_type}
            />
          </div>
        );
      case CriminalCaseSubType.REQUEST_FOR_REMAND_ORDER:
        return (
          <div className="lg:w-1/2">
            <DocumentUploadComponent
              required
              errorMessage={caseTypeErrors?.exparte ?? ""}
              subTitle={CaseTypeData.CRIMINAL_CASE}
              title={DocumentTitlesEnum.RequestForRemandOrderExparte}
              caseType={case_type}
              subCase={sub_case_type}
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
