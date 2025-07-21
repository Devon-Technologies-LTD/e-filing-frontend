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
import CaseRequestViewStatus from "./sheet/CaseRequestViewStatus";

export function SingleCaseHeader({
  data,
  params,
}: {
  params: { id: string };
  data: any;
}) {
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
    router.push(`${params.id}/refile-documents`);
  }, [data, dispatch, params.id, router]);

  const renderStatusBadges = useMemo(() => {
    const badges = [<StatusBadge key="case-type" status={data?.case_type_name} />];

    const reviewStatus = data?.review_status;
    const reassignmentStatus = (data?.reassignment_status || "")?.toLowerCase();
    const caseRequestStatus = (data?.case_request_status || "")?.toLowerCase();
    const generalStatus = (data?.status || "")?.toLowerCase();
    const isEmergency = data?.is_emergency;
    const userRole = user?.role;

    if (reviewStatus && [ROLES.DIRECTOR_MAGISTRATE, ROLES.ASSIGNING_MAGISTRATE, ROLES.PRESIDING_MAGISTRATE].includes(userRole!)) {
      badges.push(<StatusBadge key="review-status" status={reviewStatus} />);
    }

    if ([ROLES.USER, ROLES.LAWYER].includes(userRole!)) {
      badges.push(
        <StatusBadge
          key="user-status"
          status={reviewStatus === "denied" ? "Denied" : data?.status}
        />
      );
      
    } else {
      const normalizedReassignmentStatus = reassignmentStatus?.toLowerCase();
      const normalizedCaseRequestStatus = caseRequestStatus?.toLowerCase();
      (data?.status || "")?.toLowerCase()
      if (["JUDGEMENT DELIVERED", "STRUCK OUT"].includes(data?.status?.toUpperCase())) {
        badges.push(
          <StatusBadge key="fallback-status" status={data.status} />
        );
      } else {
        if (reassignmentStatus && normalizedReassignmentStatus !== "under review" && !generalStatus.toLowerCase().includes("hearing")) {
          const reassignedStatus = (normalizedReassignmentStatus === "approved" || normalizedReassignmentStatus === "denied") ? data?.status : normalizedReassignmentStatus;
          badges.push(
            <StatusBadge key="reassignment" status={reassignedStatus} />
          );
        } else if (normalizedCaseRequestStatus === "approved") {
          badges.push(<StatusBadge key="case-request" status="ASSIGNED" />);
        } else if (caseRequestStatus?.toUpperCase() === "CASE REQUEST SUBMITTED") {
          badges.push(<StatusBadge key="case-request" status={normalizedCaseRequestStatus} />);
        } else if (generalStatus && !["approved", "under review", "denied"].includes(generalStatus.toLowerCase())) {
          badges.push(
            <StatusBadge key="fallback-status" status={data.status} />
          );
        }

      }
    }

    if (isEmergency) {
      badges.push(<StatusBadge key="emergency" status="action required" />);
    }

    return badges;
  }, [data, userRole]);

  const renderActionButtons = useMemo(() => {
    const status = data?.status?.toUpperCase();
    const reassignmentStatus = data?.reassignment_status?.toUpperCase();
    const requestStatus = data?.case_request_status;
    const isOwnCase = data?.assigned_to === user?.id;

    if (["JUDGEMENT DELIVERED", "STRUCK OUT", "DENIED"].includes(status)) {
      return null;
    }

    if (userRole === ROLES.ASSIGNING_MAGISTRATE) {
      if (requestStatus?.toUpperCase() === "CASE REQUEST SUBMITTED" && !["DENIED", "APPROVED"].includes(requestStatus)) {
        return (
          <CaseRequestStatusSheet
            id={id}
            trigger={
              <Button variant="outline" className="text-xs">
                REVIEW REQUEST
              </Button>
            }
          />
        );
      }

      if (reassignmentStatus === "REASSIGNMENT REQUEST SUBMITTED") {
        return (
          <SubmittedRequestSheet
            id={id}
            trigger={
              <Button variant="outline" className="text-xs">
                REVIEW REQUEST
              </Button>
            }
          />
        );
      }

      if (!data?.hearing_status) {
        const isAssigned = status === "ASSIGNED";
        return (
          <AssignCaseSheet
            id={id}
            title={data.case_name}
            status={isOwnCase ? "RE-ASSIGN" : data.status}
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

      return null;
    }

    if (userRole === ROLES.DIRECTOR_MAGISTRATE) {
      const isUnderReview = ["UNDER REVIEW", "APPROVED"].includes(status);
      const isDeniedOrApproved = ["DENIED", "APPROVED"].includes(requestStatus);
      const isToBeAssigned = status === "TO BE ASSIGNED";
      const caseRequestStatus = (data?.case_request_status || "")?.toUpperCase();

      if ((isUnderReview || isToBeAssigned) && !isDeniedOrApproved  && caseRequestStatus != "CASE REQUEST SUBMITTED") {
        return (
          <CaseRequestSheet
            id={id}
            trigger={
              <Button variant="outline" className="text-xs">
                REQUEST THIS CASE
              </Button>
            }
          />
        );
      }

      if (!requestStatus && isOwnCase && !isToBeAssigned) {
        return (
          <RequestSheet
            id={id}
            trigger={
              <Button variant="outline" className="text-xs">
                REQUEST RE-ASSIGNMENT
              </Button>
            }
          />
        );
      }

      if (isOwnCase) {
        return (
          <CaseRequestViewStatus
            id={id}
            trigger={
              <Button variant="outline" className="text-xs">
                VIEW REQUEST
              </Button>
            }
          />
        );
      }
    }

    if (userRole === ROLES.PRESIDING_MAGISTRATE && isOwnCase) {
      const hasReassignment = data?.reassignment_status?.trim();
      const isToBeAssigned = data?.status === "TO BE ASSIGNED";
      const isHearing = !!data?.hearing_status;

      if ((!hasReassignment || hasReassignment == "Approved") && !isToBeAssigned && !isHearing) {
        return (
          <RequestSheet
            id={id}
            trigger={
              <Button variant="outline" className="text-xs">
                REQUEST RE-ASSIGNMENT
              </Button>
            }
          />
        );
      }

      if (hasReassignment !== "Approved" || hasReassignment) {
        return (
          <ReviewRequestSheet
            id={id}
            trigger={
              <Button variant="outline" className="text-xs">
                VIEW REQUEST
              </Button>
            }
          />
        );
      }
    }

    return null;
  }, [data, id, user?.id, userRole]);

  const renderUserActions = useMemo(() => {
    if (![ROLES.LAWYER, ROLES.USER].includes(userRole!)) return null;

    return (
      <div className="flex gap-2">
        <ImageModalSection data={data} />
        <Button onClick={handleRefileProcesses} className="bg-primary">
          FILE OTHER PROCESSES
        </Button>
      </div>
    );
  }, [data, handleRefileProcesses, userRole]);
  return (
    <div className="space-y-3 bg-white pt-4">
      <div className="container space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/cases" className="font-semibold">
            YOUR CASES
          </Link>
          <span className="font-bold">/ {data?.case_suit_number}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-medium text-primary">
              {data?.case_suit_number}
            </h1>
            <div className="flex items-center gap-3">{renderStatusBadges}</div>
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