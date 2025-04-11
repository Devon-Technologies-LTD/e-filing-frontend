"use client";
import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
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
import CaseActionDropdown from "./CaseActionDropdown";
import RequestSheet from "./sheet/Request";
import AssignCaseSheet from "./sheet/AssignCaseSheet";
import CaseRequestSheet from "./sheet/CaseRequestSheet";
import ReviewRequestSheet from "./sheet/ReviewRequestSheet";
import SubmittedRequestSheet from "./sheet/SubmittedRequestSheet";
import CaseRequestStatusSheet from "./sheet/caseRequestStatus";
import ImageModalSection from "./ImageModalSection";

export function SingleCaseHeader({ data, params }: { params: { id: string }; data: any }) {
  const id = useMemo(() => decodeURIComponent(params.id), [params.id]);
  const { data: user } = useAppSelector((state) => state.profile);
  const userRole = user?.role;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRefileProcesses = useCallback(() => {
    const caseTypeFields = getCaseTypeFields(data);
    dispatch(clearForm());
    dispatch(updateStep(3));
    dispatch(updateMultipleCaseTypeFields({ fields: caseTypeFields }));
    dispatch(addDocument([]));
    router.push(`${params?.id}/refile-documents`);
  }, [data, dispatch, params?.id, router]);

  const renderStatusBadges = useMemo(() => {
    const badges = [<StatusBadge key="case-type" status={data?.case_type_name} />];
    const reassignmentStatus = data?.reassignment_status || "";
    const caseRequestStatus = data?.case_request_status || "";

    if (userRole !== ROLES.PRESIDING_MAGISTRATE) {
      if ((userRole === ROLES.USER) || (userRole === ROLES.LAWYER)) {
        if (data?.review_status === "denied") {
          badges.push(<StatusBadge key="status" status="Denied" />);
        } else {
          badges.push(<StatusBadge key="status" status={data.status} />);
        }
      } else {
        const lowerCaseStatus = data?.status.toLowerCase();
        if (reassignmentStatus != "" && (userRole === ROLES.ASSIGNING_MAGISTRATE)) {
          badges.push(<StatusBadge key="reassignment" status={reassignmentStatus} />);
        } else
          if (caseRequestStatus != "" && userRole === ROLES.DIRECTOR_MAGISTRATE) {
            badges.push(<StatusBadge key="case-request" status={caseRequestStatus} />);
          } else if (lowerCaseStatus === "to be assigned" && reassignmentStatus) {
            badges.push(
              <StatusBadge key="reassignment-lower" status={reassignmentStatus.toLowerCase()} />
            );
          }
          else {
            badges.push(<StatusBadge key="status" status={data?.status} />);
          }
      }
    } else {
      const { reassignment_status, status, case_request_status } = data || {};
      const lowerCaseStatus = (status || "").toLowerCase();
      console.log("case_request_status" + case_request_status);
      if (reassignment_status) {
        badges.push(<StatusBadge key="reassignment" status={reassignment_status} />);
      } else if (case_request_status) {
        badges.push(<StatusBadge key="reassignment" status={data?.case_request_status} />);
      } else if (lowerCaseStatus === "to be assigned" && reassignment_status) {
        badges.push(<StatusBadge key="reassignment-lower" status={reassignment_status.toLowerCase()} />);
      }
      else {
        badges.push(<StatusBadge key="status" status={status} />);
      }
    }
    // secound appended case status
    if (data?.review_status && (data?.status === "ASSIGNED") && (userRole === ROLES.ASSIGNING_MAGISTRATE) && (data.reassignment_status === "") ) {
      badges.push(<StatusBadge key="status" status={data?.review_status} />);
    }

    if (data?.is_emergency) {
      badges.push(<StatusBadge key="emergency" status="action required" />);
    }
    return badges;
  }, [data, userRole]);

  const renderActionButtons = useMemo(() => {
    if (data?.status === "JUDGEMENT DELIVERED" || data?.status === "STRUCK OUT" || data?.status?.toUpperCase() === "DENIED") {
      return null;
    }
    if (userRole === ROLES.ASSIGNING_MAGISTRATE) {
      if (
        data?.case_request_status?.toUpperCase() === "CASE REQUEST SUBMITTED" &&
        data?.case_request_status !== "DENIED" &&
        data?.case_request_status !== "Approved"
      ) {
        return (
          <CaseRequestStatusSheet
            id={id}
            trigger={<Button variant="outline" className="text-xs">REVIEW REQUEST</Button>}
          />
        );
      } else if (data?.reassignment_status?.toUpperCase() === "REASSIGNMENT REQUEST SUBMITTED") {
        return (
          <SubmittedRequestSheet
            id={id}
            trigger={<Button variant="outline" className="text-xs">REVIEW REQUEST</Button>}
          />
        );
      } else if (data?.hearing_status != "") {
        return (<></>);
      } else {
        const isOwnCase = data?.assigned_to === user?.id;
        const isAssigned = data?.status === "ASSIGNED";
        return (
          <AssignCaseSheet
            id={id}
            title={data.case_name}
            status={isOwnCase ? "RE-ASSIGN" : data?.status}
            trigger={
              <Button
                variant="outline"
                className="text-xs"
                disabled={isOwnCase || isAssigned}
              >
                {isOwnCase ? "RE-ASSIGN CASE" : "ASSIGN CASE"}
              </Button>
            }
          />
        );
      }
    }

    if (userRole === ROLES.DIRECTOR_MAGISTRATE) {
      const isUnderReview = (data?.status || "").toUpperCase() === "UNDER REVIEW";
      const hasSubmittedRequest = data?.case_request_status === "CASE REQUEST SUBMITTED";
      const isRequestDeniedOrApproved = data?.case_request_status === "DENIED" || data?.case_request_status === "Approved";
      const isOwnCase = data?.assigned_to === user?.id;
      const isToBeAssigned = data?.status === "TO BE ASSIGNED";

      if (isUnderReview && !hasSubmittedRequest && !isRequestDeniedOrApproved) {
        return (
          <CaseRequestSheet
            id={id}
            trigger={<Button variant="outline" className="text-xs">REQUEST THIS CASE</Button>}
          />
        );
      } else if (!data?.case_request_status && isOwnCase && !isToBeAssigned) {
        return (
          <RequestSheet
            id={id}
            trigger={<Button variant="outline" className="text-xs">REQUEST RE-ASSIGNMENT</Button>}
          />
        );
      }
    }

    if (userRole === ROLES.PRESIDING_MAGISTRATE && data?.assigned_to === user?.id) {
      const hasReassignmentStatus = data?.reassignment_status?.trim();
      const isToBeAssigned = data?.status === "TO BE ASSIGNED";
      const isHearing = data?.hearing_status;
      if (!hasReassignmentStatus && !isToBeAssigned && !isHearing) {
        return (
          <RequestSheet
            id={id}
            trigger={<Button variant="outline" className="text-xs">REQUEST RE-ASSIGNMENT</Button>}
          />
        );
      } else if (hasReassignmentStatus) {
        return (
          <ReviewRequestSheet
            id={id}
            trigger={<Button variant="outline" className="text-xs">VIEW REQUEST</Button>}
          />
        );
      }
    }

    return null;
  }, [data, id, user?.id, userRole]);

  const renderUserActions = useMemo(() => {
    if (![ROLES.LAWYER, ROLES.USER].includes(user?.role as ROLES)) {
      return null;
    }

    return (
      <div className="flex gap-2">
        <ImageModalSection data={data} />
        {/* {data?.seal_path && <img src={data.seal_path} className="h-10 w-10" alt="Seal" />} */}
        {/* {data?.qrcode_path && <img src={data.qrcode_path} className="h-10 w-10" alt="QR Code" />} */}
        <Button
          onClick={handleRefileProcesses}
          className="bg-primary"
        >
          FILE OTHER PROCESSES
        </Button>
      </div>
    );
  }, [data, handleRefileProcesses, user?.role]);

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
              {renderStatusBadges}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {renderActionButtons}
            <CaseActionDropdown data={data} user={user} id={id} />
            {renderUserActions}
          </div>
        </div>
      </div>
    </div>
  );
}