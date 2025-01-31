"use client";
import React from "react";
import { SingleCaseHeader } from "../_components/single-case-header";
import { CaseOverview } from "../_components/case_overview";
import { CaseUpdates } from "../_components/case-updates";

export const demoData = {
  caseNumber: "CV/Wuse/233456789/2024",
  title:
    "Johnathan Smith and Associates vs. The Federal Housing Development Corporation",
  filedDate: "12/02/2024",
  claimant: {
    name: "John Doe",
    email: "johndoe@gmail.com",
    address: "22 Maitama Close",
    phone: "+23480123456",
  },
  court: {
    division: "Kuje",
    district: "Kuje District",
    magistrate: "Adebayo Adekoya",
  },
  caseType: {
    type: "Criminal",
    kind: "Recovery Of Premise",
    worth: "Less than a million",
  },
  filings: [
    {
      date: "12/02/2024",
      documents: [
        {
          title: "",
          items: [
            { name: "Originating Applications", amount: 500.0 },
            { name: "Motion Exparte", amount: 500.0 },
          ],
        },
        {
          title: "Exhibits",
          items: [{ name: "Car Light Picture", amount: 500.0 }],
        },
      ],
    },
    {
      date: "15/02/2024",
      documents: [
        {
          title: "",
          items: [
            { name: "Originating Applications", amount: 500.0 },
            { name: "Motion Exparte", amount: 500.0 },
          ],
        },
        {
          title: "Exhibits",
          items: [],
        },
      ],
    },
  ],
};

export default function SingleCasePage({ params }: { params: { id: string } }) {

  return (
    <div className="bg-zinc-100 ">
      <SingleCaseHeader params={params} />
      <div className="container py-4 grid grid-cols-12 gap-5">
        <div className="col-span-7 bg-white p-2">
          <CaseOverview {...demoData} />
        </div>{" "}
        <div className="col-span-5 bg-white p-2">
          <CaseUpdates />
        </div>
      </div>
    </div>
  );
}
