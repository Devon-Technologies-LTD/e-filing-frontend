"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function CaseDocumentListSkeleton() {
  return (
    <div className="bg-zinc-100 h-full overflow-auto animate-pulse flex flex-col">
      <div>
        {/* SingleCaseHeader Skeleton */}
        <div className="bg-white p-4 ">
          <div className="container space-y-3">
            <div className="h-8 w-1/3 bg-gray-300 rounded mb-2" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Tabs and Dropdown Skeleton */}
        <div className="bg-white shadow-md">
          <div className="container flex justify-between items-center pt-2 pb-4">
            {/* ReusableTabs Skeleton */}
            <div className="flex space-x-4">
              <div className="h-6 w-20 bg-gray-300 rounded" />
              <div className="h-6 w-20 bg-gray-300 rounded" />
              <div className="h-6 w-20 bg-gray-300 rounded" />
            </div>

            {/* Dropdown Skeleton */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-300 rounded-full" />
              <ChevronDown className="h-4 w-4 text-gray-300 ml-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <section className="py-4 flex-1">
        <div className="container py-4 h-full grid grid-cols-12 gap-5">
          {/* CaseOverview Skeleton */}
          <div className="col-span-7 space-y-6 bg-white p-2 rounded-lg">
            <CaseDetailsSkeleton />
          </div>

          {/* CaseUpdates Skeleton */}
          <div className="col-span-5 bg-white p-2 rounded-lg">
            <CaseUpdatesSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
}

export function CaseDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Case Header Skeleton */}
      <div className="space-y-1 p-4 flex justify-between items-center">
        <div className="h-6 w-1/3 bg-gray-300 rounded" />{" "}
        <div className="max-w-lg space-y-2">
          <div className="h-6 w-3/4 bg-gray-300 rounded" /> {/* Title */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-1/3 bg-gray-300 rounded" />{" "}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-16 bg-gray-300 rounded" /> {/* "Filed on" */}
          <div className="h-5 w-32 bg-gray-300 rounded" /> {/* Date */}
        </div>
      </div>

      {/* ScrollArea Skeleton */}
      <div className=" overflow-y-auto rounded-md px-4">
        <div className="space-y-6">
          {/* Claimant Information Skeleton */}
          {/* <div className="space-y-3">
            <div className="h-6 w-1/3 bg-gray-300 rounded" />{" "}
            <div className="space-y-2">
              <div className="h-4 w-1/2 bg-gray-300 rounded" /> 
              <div className="h-4 w-2/3 bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-300 rounded" /> 
              <div className="h-4 w-1/4 bg-gray-300 rounded" /> 
            </div>
          </div> */}
          <ClaimantInfoSkeleton />
          <ClaimantInfoSkeleton />
          {/* Cost Assessment Skeleton */}
          <div className="space-y-3">
            <div className="h-6 w-1/3 bg-gray-300 rounded" />{" "}
            <div className="space-y-10">
              
              <div className="h-16 w-full bg-gray-300 rounded" />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseUpdatesSkeleton() {
  return (
    <div className="bg-white space-y-4 w-full overflow-hidden p-4 rounded-lg shadow-sm animate-pulse">
      <div className="flex justify-between w-full items-center gap-4">
        <h2 className="flex items-center gap-3">
          <div className="h-5 w-5 bg-gray-300 rounded-full" /> {/* Icon */}
          <div className="h-6 w-32 bg-gray-300 rounded" />{" "}
        </h2>
        <div className="h-4 w-24 bg-gray-300 rounded" />{" "}
      </div>

      <div className="flex space-x-4">
        <div className="h-6 w-16 bg-gray-300 rounded" /> {/* Tab 1 */}
        <div className="h-6 w-16 bg-gray-300 rounded" /> {/* Tab 2 */}
        <div className="h-6 w-16 bg-gray-300 rounded" /> {/* Tab 3 */}
      </div>

      <div className=" overflow-y-auto rounded-md">
        <div className="py-4 space-y-4">
          <div className="space-y-6">
            <div className="h-12 w-full bg-gray-300 rounded" /> {/* Item 1 */}
            <div className="h-12 w-full bg-gray-300 rounded" /> {/* Item 2 */}
            <div className="h-12 w-full bg-gray-300 rounded" /> {/* Item 3 */}
            <div className="h-12 w-full bg-gray-300 rounded" /> {/* Item 3 */}
            <div className="h-12 w-full bg-gray-300 rounded" /> {/* Item 3 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClaimantInfoSkeleton() {
  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-secondary-foreground p-3">
        <div className="h-6 w-1/3 bg-gray-300 rounded" />{" "}
        {/* "Claimant Information" */}
      </div>

      {/* Content Skeleton */}
      <div className="bg-white p-3">
        <div className="grid grid-cols-1 divide-x-2 divide-neutral-100 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* LabelValuePair Skeletons */}
          <div className="space-y-1">
            <div className="h-4 w-1/3 bg-gray-300 rounded" /> {/* Label */}
            <div className="h-5 w-2/3 bg-gray-300 rounded" /> {/* Value */}
          </div>
          <div className="space-y-1">
            <div className="h-4 w-1/3 bg-gray-300 rounded" /> {/* Label */}
            <div className="h-5 w-2/3 bg-gray-300 rounded" /> {/* Value */}
          </div>
          <div className="space-y-1">
            <div className="h-4 w-1/3 bg-gray-300 rounded" /> {/* Label */}
            <div className="h-5 w-2/3 bg-gray-300 rounded" /> {/* Value */}
          </div>
          <div className="space-y-1">
            <div className="h-4 w-1/3 bg-gray-300 rounded" /> {/* Label */}
            <div className="h-5 w-2/3 bg-gray-300 rounded" /> {/* Value */}
          </div>
        </div>
      </div>
    </div>
  );
}
