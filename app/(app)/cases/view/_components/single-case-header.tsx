"use client";
import React from "react";
import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  return (
    <div className="space-y-3 bg-white pt-4">
      <div className="container space-y-3">
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
            {/* Magistrates Buttons */}
            {userRole === ROLES.ASSIGNING_MAGISTRATES && (
              <div className="flex gap-2">
                <Button variant="outline" className="bg-primary">
                  ASSIGN CASE
                </Button>
                <Button variant="outline" className="bg-primary">
                  REVIEW CASE
                </Button>
              </div>
            )}

            {userRole === ROLES.DIRECTOR_MAGISTRATES && (
              <Button variant="outline" className="bg-primary">
                REQUEST THIS CASE
              </Button>
            )}

            {userRole === ROLES.PRESIDING_MAGISTRATES && (
              <Button variant="outline" className="bg-primary">
                REQUEST RE-ASSIGNMENT
              </Button>
            )}

            {/* Case Action Dropdown */}
            {[ROLES.ASSIGNING_MAGISTRATES, ROLES.DIRECTOR_MAGISTRATES, ROLES.PRESIDING_MAGISTRATES, ROLES.CHIEF_JUDGE].includes(userRole) && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="default">Case Action</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {userRole === ROLES.CHIEF_JUDGE && (
                    <>
                      <DropdownMenuLabel>HEARING HISTORY</DropdownMenuLabel>
                      <DropdownMenuLabel>RE-ASSIGNMENT HISTORY</DropdownMenuLabel>
                    </>
                  )}
                  {userRole === ROLES.PRESIDING_MAGISTRATES && (
                    <>
                      <DropdownMenuLabel>SCHEDULE A MEETING</DropdownMenuLabel>
                      <DropdownMenuLabel>DELIVER JUDGE</DropdownMenuLabel>
                      <DropdownMenuLabel>STRUCK OUT</DropdownMenuLabel>
                      <DropdownMenuLabel>HEARING HISTORY</DropdownMenuLabel>
                      <DropdownMenuLabel>RE-ASSIGNMENT HISTORY</DropdownMenuLabel>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Lawyer & User Section */}
            {[ROLES.LAWYER, ROLES.USER].includes(user?.role as ROLES) && (
              <div className="flex gap-2">
                <QrCode className="h-10 w-10 text-gray-400" />
                <Button disabled className="bg-primary">
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
