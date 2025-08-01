import type React from "react";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { useState } from "react";
import { Icons } from "@/components/svg/icons";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getDecisionHistory } from "@/lib/actions/case-file";

interface DecisionUpdateProps {
  id: string;
}

interface DecisionData {
  decision: string;
  reason: string;
  file_path: string;
  decision_date: string;
}

export function DecisionUpdate({ id }: DecisionUpdateProps) {
  const tabs = [{ id: "history", label: "Decision History" }];
  const [activeTab, setActiveTab] = useState("history");

  const { data, isLoading, isError, error, } = useQuery<DecisionData, Error>({
    queryKey: ["documentDecision", id],
    queryFn: async () => {
      const response = await getDecisionHistory(id);

      // Check for judgment error
      if (
        response?.data?.message === "judgement has not been delivered" ||
        !response?.data?.data?.decision
      ) {
        throw new Error("Judgment has not been delivered");
      }

      return {
        decision: response.data.data.decision,
        reason: response.data.data.reason,
        file_path: response.data.data.file_path,
        decision_date: response.data.data.decision_date,
      };
    },
    enabled: !!id,
  });

  const decisionDate = data?.decision_date ? new Date(data.decision_date) : null;
  const isValidDate = decisionDate instanceof Date && !isNaN(decisionDate.getTime());


  return (
    <div className="bg-white space-y-4 w-full overflow-hidden p-4 rounded-lg shadow-sm">
      <div className="flex justify-between w-full items-center gap-4">
        <h2 className="flex items-center gap-3 font-semibold text-semibold">
          <Icons.recent /> DECISION UPDATES
        </h2>
        <p className="text-xs font-medium">
          {data ? "1 Update available" : "No Updates"}
        </p>
      </div>

      <ReusableTabs
        tablistClassName="text-xs"
        tabs={tabs}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      />

      <div className="py-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-10 text-gray-500 text-sm">
            Loading updates...
          </div>
        ) : isError ? (
          <div className="text-center text-sm text-red-500">
            {error.message}
          </div>
        ) : (
          <div className="border-b py-3 space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex space-x-2 w-2/3 items-center">
                <Icons.check />
                <div>
                  <span className="text-sm font-semibold">
                    {data?.decision ?? ""}
                  </span>
                  <div className="text-md text-gray-700">
                    <span className="font-medium"> {data?.reason} </span>
                  </div>
                </div>
              </div>
            </div>
            {isValidDate && (
              <span className="text-xs text-stone-600 font-bold opacity-60 flex justify-end">
                {format(decisionDate, "MMM dd, yyyy")}
              </span>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
