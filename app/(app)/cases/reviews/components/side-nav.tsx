"use client";
import { cn } from "@/lib/utils";
import { CostBreakdown } from "./cost-breakdown";
import { CaseStatus } from "@/constants";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";

export interface IDataProps {
  id: string;
  status: CaseStatus;
  case_suit_number: string;
  documents: IDocumentFileType[];
  case_type_name: string;
  recovery_amount: string;
  sub_case_type_name: string;
}

interface Iprops {
  data: IDataProps;
}
export function SideNav({ data }: Iprops) {
  console.log("first sdddd", data);
  function getTitle(status: CaseStatus) {
    switch (status) {
      case CaseStatus.UnderReview:
        return "Review case files before it is assigned";
      case CaseStatus.Approved:
        return "The case has been approved and assigned";
      case CaseStatus.Denied:
        return "This case filing document was denied";
      default:
        return "";
    }
  }

  const steps = ["Case Types", "Upload Documents", "Submitted Exhibits"];
  return (
    <div className=" max-h-screen bg-white border-r pr-12">
      <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
        <div className="sticky top-0 bg-white z-10 space-y-2">
          <div className="text-3xl font-medium leading-8 text-primary">
            {data?.status ? getTitle(data?.status?.toLowerCase() as any) : ""}
          </div>
        </div>
        <div className="space-y-3 ">
          <div className={`space-y-6`}>
            <div className="space-y-2">
              <div className="h-0.5 w-full bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-[#C4704B] transition-all duration-300 ease-in-out" />
              </div>
            </div>
            <nav className="space-y-3 flex flex-col">
              {steps.map((step, index) => {
                const isActive = index === 0;
                return (
                  <p
                    key={index}
                    className={cn(
                      "block cursor-default cursor- text-neutral-400 w-fit font-bold text-left px-0 py-1 text-sm transition-colors",
                      isActive && "border-primary border-b-2 text-primary"
                    )}
                  >
                    {step}
                  </p>
                );
              })}
            </nav>
          </div>{" "}
        </div>
        <div className="space-y-3 ">
          <CostBreakdown data={data} />
        </div>
      </div>
    </div>
  );
}
