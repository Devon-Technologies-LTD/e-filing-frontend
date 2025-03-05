"use client";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import AllMagistrates from "./all-magistrate";
import PendingInvites from "./pending-invites";
import Registerars from "./registerars";

export default function ChiefJudgeUserManagement() {
  const params = useParams();
  const tab = params.tab as TCaseFilterType;
  const getRenderedPage = () => {
    switch (tab) {
      case "all":
        return AllMagistrates;
      case "registerars":
        return Registerars;
      default:
        return PendingInvites;
    }
  };
  const PageComponent = getRenderedPage();
  return (
    <div className="space-y-12">
      <PageComponent />
    </div>
  );
}
