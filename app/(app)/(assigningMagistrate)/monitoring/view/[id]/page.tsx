import SingleCasePage from "@/app/(app)/cases/view/[id]/page";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  return <SingleCasePage params={params} />;
}
