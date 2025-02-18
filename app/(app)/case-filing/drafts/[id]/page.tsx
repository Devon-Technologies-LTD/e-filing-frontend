"use client";
import { CaseForm } from "@/components/case-filing/case-form";
import { CaseTypeData } from "@/constants";
import { getCaseFilesById } from "@/lib/actions/case-file";
import { getCaseFileFields, getCaseTypeFields } from "@/lib/utils";
import {
  addDocument,
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
      const caseFileFields = getCaseFileFields(data);
      const caseTypeFields = getCaseTypeFields(data);

      dispatch(updateMultipleCaseFileFields({ fields: caseFileFields }));
      dispatch(updateMultipleCaseTypeFields({ fields: caseTypeFields }));
      dispatch(
        updateLegalCounsels(
          data?.casetype?.length > 0 ? data?.casetype[0]?.legal_counsels : []
        )
      );
      dispatch(addDocument(data.documents));
    }
  }, [data, dispatch]);
  return (
    <div>
      <CaseForm />
    </div>
  );
};

export default CaseFilingPage;
