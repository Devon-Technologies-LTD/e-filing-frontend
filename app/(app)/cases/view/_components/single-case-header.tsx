"use client";
import React from "react";
import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { getCaseTypeFields } from "@/lib/utils";
import {
  addDocument,
  clearForm,
  updateMultipleCaseTypeFields,
  updateStep,
} from "@/redux/slices/case-filing-slice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import CaseActionDropdown from "./CaseActionDropdown";
import RequestSheet from "./sheet/Request";
import AssignCaseSheet from "./sheet/AssignCaseSheet";
import ReAssignmentSheet from "./sheet/ReAssignmentSheet";
import ReAssignmentStatusSheet from "./sheet/ReAssignmentStatus";
import CaseRequestSheet from "./sheet/CaseRequestSheet";

export function SingleCaseHeader({
  data,
  params,
}: {
  params: { id: string };
  data: any;
}) {
  const id = decodeURIComponent(params.id);
  const { data: user } = useAppSelector((state) => state.profile);
  const userRole = user?.role;

  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleRefileProcesses = () => {
    const caseTypeFields = getCaseTypeFields(data);
    dispatch(clearForm());
    dispatch(updateStep(3));
    dispatch(updateMultipleCaseTypeFields({ fields: caseTypeFields }));
    dispatch(addDocument([]));
    navigate.push(`${params?.id}/refile-documents`);
  };
  console.log(data?.status);

  return (
    <div className="space-y-3 bg-white pt-4">
      <div className="container space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/cases" className="font-semibold">
            YOUR CASES
          </Link>
          <span className="text-zinc-500 font-bold">
            / {data?.case_suit_number}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-medium text-primary">
              {data?.case_suit_number}
            </h1>
            <div className="flex items-center gap-3">
              <StatusBadge status={data?.case_type_name} />
              <StatusBadge status={data?.status.toLowerCase()} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Magistrates Buttons */}
            {userRole === ROLES.ASSIGNING_MAGISTRATE && (
              <div className="flex gap-2">
                <AssignCaseSheet id={id} status={data?.status} trigger={<Button variant="outline" className="text-xs" >ASSIGN CASE</Button>} />
                {/* <AssignCaseSheet id={id} status={data?.status} trigger={<Button variant="outline" className="text-xs" >RE-ASSIGN CASE</Button>} />
                <ReAssignmentStatusSheet id={id} trigger={<Button variant="outline" className="text-xs" >VIEW REQUEST STATUS</Button>}/>
                <Button variant="outline" className="text-xs"  >REVIEW REQUEST</Button> */}
              </div>
            )}

            {userRole === ROLES.DIRECTOR_MAGISTRATE && (
              <CaseRequestSheet
                id={id}
                trigger={<Button variant="outline" className="text-xs" > REQUEST THIS CASE</Button>}
              />
            )}

            {userRole === ROLES.PRESIDING_MAGISTRATE || userRole === ROLES.DIRECTOR_MAGISTRATE && (
              <RequestSheet
                trigger={
                  <Button variant="outline" className="text-xs" > REQUEST RE-ASSIGNMENT</Button>
                }
              />
            )}
            <CaseActionDropdown user={user} id={id} />
            {[ROLES.LAWYER, ROLES.USER].includes(user?.role as ROLES) && (
              <div className="flex gap-2">
                <QrCode className="h-10 w-10 text-gray-400" />
                <Button
                  onClick={handleRefileProcesses}
                  disabled={
                    ![ROLES.LAWYER, ROLES.USER].includes(user?.role as ROLES)
                  }
                  className="bg-primary"
                >
                  FILE OTHER PROCESSES
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
