"use client";
import { getCaseFilesById } from "@/lib/actions/case-file";
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
    
  }, [data, dispatch]);
  return (
    <div>
      {caseFileId ? (
        <h1>Editing Case File: {caseFileId}</h1>
      ) : (
        <h1>Creating a New Case File</h1>
      )}
    </div>
  );
};

export default CaseFilingPage;
