"use client";
import { CaseForm } from "@/components/case-filing/case-form";
import { CaseTypeData } from "@/constants";
import { getCaseFilesById } from "@/lib/actions/case-file";
import {
  replaceCivilCaseDocument,
  replaceCriminalCaseDocument,
  replaceExhibitsCaseDocument,
  replaceFamilyCaseDocument,
  replaceOtherDocuments,
  updateLegalCounsels,
  updateMultipleCaseFileFields,
  updateMultipleCaseTypeFields,
} from "@/redux/slices/case-filing-slice";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CaseFilingPage = () => {
  const params = useParams();
  const caseFileId = params?.id;
  const dispatch = useDispatch();

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: ["get_case_draft_by_id"],
    queryFn: async () => {
      return await getCaseFilesById(caseFileId as string);
    },
    enabled: !!caseFileId,
  });

  console.log("firstin client", data);

  useEffect(() => {
    if (data) {
      dispatch(
        updateMultipleCaseFileFields({
          fields: {
            case_file_id: data.id ?? "",
            claimant_address: data.claimant.name ?? "",
            claimant_email_address: data.claimant.email_address ?? "",
            claimant_name: data.claimant.name ?? "",
            claimant_phone_number: data.claimant.phone_number ?? "",
            claimant_whats_app: data.claimant.whats_app ?? "",
            court_division: data.court_division_id ?? "",
            defendant_address: data.defendant.address ?? "",
            defendant_email_address: data.defendant.email_address ?? "",
            defendant_name: data.defendant.name ?? "",
            defendant_phone_number: data.defendant.phone_number ?? "",
            defendant_whats_app: data.defendant.whats_app ?? "",
            title: data.title ?? "",
          },
        })
      );
      dispatch(
        updateMultipleCaseTypeFields({
          fields: {
            case_type: data.casetype[0]?.case_type_name ?? "",
            case_type_id: data.casetype[0]?.id ?? "",
            cost_claimed: data.casetype[0].cost_claimed ?? "",
            dated_this: data.casetype[0].dated_this ?? "",
            direct_complain: data.casetype[0].direct_complain ?? "",
            interest_claimed: data.casetype[0].interest_claimed,
            notes: data.casetype[0].notes ?? "",
            property_description: data.casetype[0].property_description ?? "",
            recovery_amount: data.casetype[0].recovery_amount ?? "",
            registrar: data.casetype[0].registrar ?? "",
            relief_sought: data.casetype[0].relief_sought ?? "",
            rental_value: data.casetype[0].rental_value ?? "",
            sub_case_type: data.casetype[0].sub_case_type_name ?? "",
            sum_claimed: data.casetype[0].sum_claimed ?? "",
            summon_court_description:
              data.casetype[0]?.summon_details?.court_description ?? "",
            summon_date: data.casetype[0]?.summon_details.data ?? "",
            summon_state_location:
              data.casetype[0]?.summon_details?.state_location ?? "",
            summon_time: data.casetype[0]?.summon_details?.time ?? "",
            value_worth: data.casetype[0]?.value_worth ?? "",
          },
        })
      );
      dispatch(updateLegalCounsels(data.casetype[0].legal_counsels));
      const criminalCaseDocuments = data.documents?.filter(
        (doc: any) => doc.sub_title === CaseTypeData.CRIMINAL_CASE
      ) ||[];
      const familyCaseDocuments =
        data.documents?.filter(
          (doc: any) => doc.sub_title === CaseTypeData.FAMILY_CASE
        ) || [];
      const civilCaseDocuments =
        data.documents?.filter(
          (doc: any) => doc.sub_title === CaseTypeData.CIVIL_CASE
        ) || [];
      const otherDocuments =
        data.documents?.filter(
          (doc: any) => doc.sub_title === "OTHER DOCUMENTS"
        ) || [];
      const exhibits =
        data.documents?.filter((doc: any) => doc.sub_title === "EXHIBITS") || [];
      dispatch(replaceCriminalCaseDocument(criminalCaseDocuments));
      dispatch(replaceFamilyCaseDocument(familyCaseDocuments));
      dispatch(replaceExhibitsCaseDocument(exhibits));
      dispatch(replaceOtherDocuments(otherDocuments));
      dispatch(replaceCivilCaseDocument(civilCaseDocuments));
    }
  }, [data]);
  return (
    <div>
      <CaseForm />
    </div>
  );
};

export default CaseFilingPage;
