import { useAppSelector } from "@/hooks/redux";
import React, { useCallback } from "react";
import { CivilCaseSubType } from "../../constants";
import { CivilCaseForm5 } from "./civil-form-5";
import { CivilCaseForm4 } from "./civil-form-4";
import { CivilCaseForm8 } from "./civil-form-8";

export default function CivilCaseForm() {
  const {
    caseType: { case_type, sub_case_type, recovery_amount },
  } = useAppSelector((value) => value.caseFileForm);

  const renderCivilCaseContent = useCallback(() => {
    switch (sub_case_type) {
      case CivilCaseSubType.RECOVERY_OF_PREMISE:
        return <CivilCaseForm5 />;
      case CivilCaseSubType.PLAINT_FOR_DEFAULT_SUMMONS:
        return <CivilCaseForm4 />;
      case CivilCaseSubType.PLAINT_FOR_SPECIFIC_SUMMONS:
        return <CivilCaseForm8 />;
      default:
        return null;
    }
  }, [case_type, sub_case_type]);

  return <div>{recovery_amount && renderCivilCaseContent()}</div>;
}
