"use client";
import React from "react";
import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAppSelector } from "@/hooks/redux";
// import { ROLES } from "@/types/auth";
import { getCaseTypeFields } from "@/lib/utils";
import { addDocument, clearForm, updateMultipleCaseTypeFields, updateStep } from "@/redux/slices/case-filing-slice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export function SingleCaseHeader({
  data,
  params,
}: {
  params: { id: string };
  data: any;
}) {
  const id = decodeURIComponent(params.id);
  // const { data: user } = useAppSelector((state) => state.profile);
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

  return (
    <div className="space-y-3 bg-white pt-4 ">
      <div className="container space-y-3">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/cases" className="font-semibold">
              YOUR CASES
            </Link>
            <span className="text-zinc-500 font-bold">/ {id}</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-medium text-primary">{id}</h1>
              <div className="flex items-center gap-3">
                <StatusBadge status={data?.case_type_name} />
                <StatusBadge status={data?.status} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <QrCode className="h-10 w-10 text-gray-400" />
              </div>
              <Button
                // disabled={[ROLES.LAWYER, ROLES.USER].includes(
                //   user?.role as ROLES
                // )}
                onClick={() => {
                  handleRefileProcesses();
                }}
                className="bg-primary"
              >
                FILE OTHER PROCESSES
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
