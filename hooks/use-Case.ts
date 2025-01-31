/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { ICase, TCaseType } from '../types/case';
import { mockCases } from '@/lib/dummy-data';

export const useCases = () => {
  const [activeTab, setActiveTab] = useState<TCaseType>("RECENT");

  //TODO: Change Implementation when you get API
  const filterCases = (type: TCaseType): ICase[] => {
    switch (type) {
      case "RECENT":
        return mockCases.filter((c: any) => c.status);
      case "ACTIVE":
        return mockCases.filter(
          (c: { status: string }) => c.status === "IN PROGRESS"
        );
      case "CONCLUDED":
        return mockCases.filter(
          (c: { status: string }) => c.status === "JUDGEMENT DELIVERED"
        );
      case "UNASSIGNED":
        return mockCases.filter((c: { magistrate: any }) => !c.magistrate);
      default:
        return mockCases;
    }
  };

  return { activeTab, setActiveTab, cases: filterCases(activeTab) };
};