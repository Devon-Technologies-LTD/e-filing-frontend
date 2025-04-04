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

    if (userRole !== ROLES.PRESIDING_MAGISTRATE) {
      let status = "";
      if (userRole === ROLES.DIRECTOR_MAGISTRATE && data?.case_request_status !== "") {
        status = data.case_request_status;
      } else if (data?.status === "TO BE ASSIGNED" && data?.case_request_status !== "") {
        status = data?.case_request_status;
      } else if (data?.reassignment_status !== "") {
        status = data.reassignment_status;
      } else {
        status = data.status;
      }
      badges.push(<StatusBadge key="status" status={status} />);
    } else {
      const { reassignment_status, status } = data || {};
      const lowerCaseStatus = (status || "").toLowerCase();

      if (reassignment_status) {
        badges.push(<StatusBadge key="reassignment" status={reassignment_status} />);
      } else if (lowerCaseStatus === "to be assigned" && reassignment_status) {
        badges.push(<StatusBadge key="reassignment-lower" status={reassignment_status.toLowerCase()} />);
      } else {
        badges.push(<StatusBadge key="status" status={status} />);
      }
    }

    if (data?.is_emergency) {
      badges.push(<StatusBadge key="emergency" status="action required" />);
    }

    return badges;
  }, [data, userRole]);

  const renderActionButtons = useMemo(() => {
    if (data?.status === "JUDGEMENT DELIVERED" || data?.status === "STRUCK OUT") {
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
      } else 
      if (data?.status?.toUpperCase() === "TO BE ASSIGNED") {
        return (
          <SubmittedRequestSheet
            id={id}
            trigger={<Button variant="outline" className="text-xs">REVIEW REQUEST</Button>}
          />
        );
      } else {
        const isOwnCase = data?.assigned_to === user?.id;
        const isAssigned = data?.status === "ASSIGNED";
        return (
          <AssignCaseSheet
            id={id}
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
            trigger={<Button variant="outline" className="text-xs">REQUEST RE-ASSIGNMENT</Button>}
          />
        );
      }
    }

    if (userRole === ROLES.PRESIDING_MAGISTRATE && data?.assigned_to === user?.id) {
      const hasReassignmentStatus = data?.reassignment_status?.trim();
      const isToBeAssigned = data?.status === "TO BE ASSIGNED";

      if (!hasReassignmentStatus && !isToBeAssigned) {
        return (
          <RequestSheet
            trigger={<Button variant="outline" className="text-xs">REQUEST RE-ASSIGNMENT</Button>}
          />
        );
      } else if (hasReassignmentStatus) {
        return (
          <ReviewRequestSheet
            trigger={<Button variant="outline" className="text-xs">REVIEW REQUEST</Button>}
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
        {data?.seal_path && <img src={data.seal_path} className="h-10 w-10" alt="Seal" />}
        {data?.qrcode_path && <img src={data.qrcode_path} className="h-10 w-10" alt="QR Code" />}
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

// "use client";
// import React from "react";
// import Link from "next/link";
// import { QrCode } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { StatusBadge } from "@/components/ui/status-badge";
// import { useAppSelector } from "@/hooks/redux";
// import { ROLES } from "@/types/auth";
// import { getCaseTypeFields } from "@/lib/utils";
// import {
//   addDocument,
//   clearForm,
//   updateMultipleCaseTypeFields,
//   updateStep,
// } from "@/redux/slices/case-filing-slice";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import CaseActionDropdown from "./CaseActionDropdown";
// import RequestSheet from "./sheet/Request";
// import AssignCaseSheet from "./sheet/AssignCaseSheet";
// import CaseRequestSheet from "./sheet/CaseRequestSheet";
// import ReviewRequestSheet from "./sheet/ReviewRequestSheet";
// import SubmittedRequestSheet from "./sheet/SubmittedRequestSheet";
// import CaseRequestStatusSheet from "./sheet/caseRequestStatus";

// export function SingleCaseHeader({
//   data,
//   params,
// }: {
//   params: { id: string };
//   data: any;
// }) {
//   const id = decodeURIComponent(params.id);
//   const { data: user } = useAppSelector((state) => state.profile);
//   const userRole = user?.role;

//   const navigate = useRouter();
//   const dispatch = useDispatch();

//   const handleRefileProcesses = () => {
//     const caseTypeFields = getCaseTypeFields(data);
//     dispatch(clearForm());
//     dispatch(updateStep(3));
//     dispatch(updateMultipleCaseTypeFields({ fields: caseTypeFields }));
//     dispatch(addDocument([]));
//     navigate.push(`${params?.id}/refile-documents`);
//   };
//   console.log(data?.status);
//   console.log(data?.assigned_to);
//   console.log(userRole);

//   return (
//     <div className="space-y-3 bg-white pt-4">
//       <div className="container space-y-3">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-xs text-zinc-500">
//           <Link href="/cases" className="font-semibold">
//             YOUR CASES
//           </Link>
//           <span className="text-zinc-500 font-bold">
//             / {data?.case_suit_number}
//           </span>
//         </div>

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <h1 className="text-2xl font-medium text-primary">
//               {data?.case_suit_number}
//             </h1>
//             <div className="flex items-center gap-3">
//               <StatusBadge status={data?.case_type_name} />

//               {userRole !== ROLES.PRESIDING_MAGISTRATE && (() => {
//                 let status = "";
//                 const { reassignment_status, review_status } = data || {};
//                 if (userRole === ROLES.DIRECTOR_MAGISTRATE && data?.case_request_status !== "") {
//                   status = data.case_request_status;
//                 }
//                 else if (data?.status == "TO BE ASSIGNED" && data?.case_request_status != "") {
//                   status = data?.case_request_status;
//                 } else if (data?.reassignment_status !== "") {
//                   status = data.reassignment_status;
//                 } else {
//                   status = data.status;
//                 }
//                 return <StatusBadge status={status} />;
//               })()}

//               {userRole === ROLES.PRESIDING_MAGISTRATE && (() => {
//                 const { reassignment_status, status, review_status } = data || {};
//                 const lowerCaseStatus = (status || "").toLowerCase();

//                 if (reassignment_status) {
//                   return <StatusBadge status={reassignment_status} />;
//                 } else if (lowerCaseStatus === "to be assigned" && reassignment_status) {
//                   return <StatusBadge status={reassignment_status.toLowerCase()} />;
//                 } else {
//                   return <StatusBadge status={status} />;
//                 }
//                 return null;
//               })()}


//               {data?.is_emergency && <StatusBadge status="action required" />}
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             {(data?.status !== "JUDGEMENT DELIVERED" && data?.status !== "STRUCK OUT") && (
//               <>
//                 {userRole === ROLES.ASSIGNING_MAGISTRATE && (
//                   <>
//                     {(data?.case_request_status?.toUpperCase() === "CASE REQUEST SUBMITTED"
//                       && data?.case_request_status !== "DENIED" && data?.case_request_status !== "Approved") ? (
//                       <CaseRequestStatusSheet
//                         id={id}
//                         trigger={<Button variant="outline" className="text-xs">REVIEW REQUEST</Button>}
//                       />
//                     ) : data?.status?.toUpperCase() === "TO BE ASSIGNED" ? (
//                       <SubmittedRequestSheet
//                         id={id} trigger={<Button variant="outline" className="text-xs">REVIEW REQUEST</Button>} />
//                     ) : (
//                       <div className="flex gap-2">
//                         <AssignCaseSheet
//                           id={id}
//                           status={data?.assigned_to === user?.id ? "RE-ASSIGN" : data?.status}
//                           trigger={
//                             <Button
//                               variant="outline"
//                               className="text-xs"
//                               disabled={data?.assigned_to === user?.id || data?.status === "ASSIGNED"}
//                             >
//                               {data?.assigned_to === user?.id ? "RE-ASSIGN CASE" : "ASSIGN CASE"}
//                             </Button>
//                           }
//                         />
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {userRole === ROLES.DIRECTOR_MAGISTRATE && (
//                   <>
//                     {/* Request This Case */}
//                     {((data?.status || "").toUpperCase() === "UNDER REVIEW") && (data.case_request_status != "CASE REQUEST SUBMITTED") &&
//                       (data?.case_request_status !== "DENIED" && data?.case_request_status !== "Approved") && (
//                         <CaseRequestSheet
//                           id={id}
//                           trigger={<Button variant="outline" className="text-xs">REQUEST THIS CASE</Button>}
//                         />
//                       )}
//                     {/* Request Re-assignment */}
//                     {!data?.case_request_status && data?.assigned_to === user?.id && data?.status !== "TO BE ASSIGNED" && (
//                       <RequestSheet
//                         trigger={<Button variant="outline" className="text-xs">REQUEST RE-ASSIGNMENT</Button>}
//                       />
//                     )}
//                   </>
//                 )}

//                 {userRole === ROLES.PRESIDING_MAGISTRATE && data?.assigned_to === user?.id && (
//                   <>
//                     {/* Request Re-assignment */}
//                     {!data?.reassignment_status && data?.status !== "TO BE ASSIGNED" && (
//                       <RequestSheet
//                         trigger={<Button variant="outline" className="text-xs">REQUEST RE-ASSIGNMENT</Button>}
//                       />
//                     )}

//                     {/* Review Request */}
//                     {data?.reassignment_status?.trim() && (
//                       <ReviewRequestSheet
//                         trigger={
//                           <Button variant="outline" className="text-xs">
//                             REVIEW REQUEST
//                           </Button>
//                         }
//                       />
//                     )}
//                   </>
//                 )}
//               </>
//             )}
//             <CaseActionDropdown data={data} user={user} id={id} />
//             {[ROLES.LAWYER, ROLES.USER].includes(user?.role as ROLES) && (
//               <div className="flex gap-2">
//                 <img src={data?.seal_path} className="h-10 w-10" />
//                 <img src={data?.qrcode_path} className="h-10 w-10" />
//                 {/* <QrCode className="h-10 w-10 text-gray-400" /> */}
//                 <Button
//                   onClick={handleRefileProcesses}
//                   disabled={
//                     ![ROLES.LAWYER, ROLES.USER].includes(user?.role as ROLES)
//                   }
//                   className="bg-primary"
//                 >
//                   FILE OTHER PROCESSES
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
