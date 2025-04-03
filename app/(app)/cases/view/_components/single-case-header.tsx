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
import CaseRequestSheet from "./sheet/CaseRequestSheet";
import ReviewRequestSheet from "./sheet/ReviewRequestSheet";
import SubmittedRequestSheet from "./sheet/SubmittedRequestSheet";
import CaseRequestStatusSheet from "./sheet/caseRequestStatus";

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
  console.log(data?.assigned_to);
  console.log(userRole);

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

              {userRole !== ROLES.PRESIDING_MAGISTRATE && (
                <>
                  {userRole === ROLES.DIRECTOR_MAGISTRATE &&
                  data?.case_request_status !== "" ? (
                    <StatusBadge status={data?.case_request_status} />
                  ) : (data?.status || "")?.toLowerCase() ===
                    "to be assigned" ? (
                    <StatusBadge
                      status={(data?.case_request_status || "")?.toLowerCase()}
                    />
                  ) : data?.case_request_status !== "" ? (
                    <StatusBadge status={data?.case_request_status} />
                  ) : (
                    <StatusBadge status={data.status} />
                  )}
                </>
              )}

              {userRole === ROLES.PRESIDING_MAGISTRATE && (
                <>
                  {/* Show Reassignment Status Badge if status is not empty */}
                  {data?.reassignment_status && (
                    <StatusBadge status={data.reassignment_status} />
                  )}
                  {data?.status == "UNDER REVIEW" &&
                    data?.review_status == "UNDER REVIEW" && (
                      <StatusBadge status={data.status} />
                    )}
                  {/* Show Status Badge if the case is "to be assigned" */}
                  {(data?.status || "").toLowerCase() === "to be assigned" &&
                    data?.reassignment_status && (
                      <StatusBadge
                        status={(
                          data?.reassignment_status || ""
                        )?.toLowerCase()}
                      />
                    )}
                </>
              )}
              {data?.is_emergency && <StatusBadge status="action required" />}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {(data?.status !== "JUDGEMENT DELIVERED" && data?.status !== "STRUCK OUT") && (
              <>
                {userRole === ROLES.ASSIGNING_MAGISTRATE && (
                  <>
                    {data?.case_request_status?.toUpperCase() === "CASE REQUEST SUBMITTED" ? (
                      <CaseRequestStatusSheet
                        id={id}
                        trigger={<Button variant="outline" className="text-xs">REVIEW REQUEST</Button>}
                      />
                    ) : data?.status?.toUpperCase() === "TO BE ASSIGNED" ? (
                      <SubmittedRequestSheet
                        id={id} trigger={<Button variant="outline" className="text-xs">REVIEW REQUEST</Button>} />
                    ) : (
                      <div className="flex gap-2">
                        <AssignCaseSheet
                          id={id}
                          status={data?.assigned_to === user?.id ? "RE-ASSIGN" : data?.status}
                          trigger={
                            <Button
                              variant="outline"
                              className="text-xs"
                              disabled={data?.assigned_to === user?.id || data?.status === "ASSIGNED"}
                            >
                              {data?.assigned_to === user?.id ? "RE-ASSIGN CASE" : "ASSIGN CASE"}
                            </Button>
                          }
                        />
                      </div>
                    )}
                  </>
                )}

                {userRole === ROLES.DIRECTOR_MAGISTRATE && (
                  <>
                    {/* Request This Case */}
                    {((data?.status || "").toUpperCase() === "UNDER REVIEW") && (data.case_request_status != "CASE REQUEST SUBMITTED") && (
                      <CaseRequestSheet
                        id={id}
                        trigger={<Button variant="outline" className="text-xs">REQUEST THIS CASE</Button>}
                      />
                    )}
                    {/* Request Re-assignment */}
                    {!data?.case_request_status && data?.assigned_to === user?.id && data?.status !== "TO BE ASSIGNED" && (
                      <RequestSheet
                        trigger={<Button variant="outline" className="text-xs">REQUEST RE-ASSIGNMENT</Button>}
                      />
                    )}
                  </>
                )}

                {userRole === ROLES.PRESIDING_MAGISTRATE && data?.assigned_to === user?.id && (
                  <>
                    {/* Request Re-assignment */}
                    {!data?.reassignment_status && data?.status !== "TO BE ASSIGNED" && (
                      <RequestSheet
                        trigger={<Button variant="outline" className="text-xs">REQUEST RE-ASSIGNMENT</Button>}
                      />
                    )}

                        {/* Review Request */}
                        {data?.reassignment_status?.trim() && (
                          <ReviewRequestSheet
                            trigger={
                              <Button variant="outline" className="text-xs">
                                REVIEW REQUEST
                              </Button>
                            }
                          />
                        )}
                      </>
                    )}
                </>
              )}
            <CaseActionDropdown data={data} user={user} id={id} />
            {[ROLES.LAWYER, ROLES.USER].includes(user?.role as ROLES) && (
              <div className="flex gap-2">
                <img src={data?.seal_path} className="h-10 w-10"/>
                <img src={data?.qrcode_path} className="h-10 w-10"/>
                {/* <QrCode className="h-10 w-10 text-gray-400" /> */}
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
