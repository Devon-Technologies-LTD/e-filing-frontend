import { CaseTypeData, CivilCaseSubType, DEFAULT_SEAL_FEE } from "@/constants";
import { IDataProps } from "./side-nav";
import { useMemo } from "react";
import { getTitleByRecoveryAmount } from "@/lib/utils";

interface CostBreakdownProps {
  data: IDataProps;
}

export function CostBreakdown({ data }: CostBreakdownProps) {
  const { documents, case_type_name, recovery_amount, sub_case_type_name } =
    data;
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦ ");
  };
  const getFeeByTitle = (title: any) => {
    const item = Array.isArray(data)
      ? data.find((item) => item.title?.toLowerCase() === title?.toLowerCase())
      : null;
    return item ? Number(item.fee) : 0;
  };
  const filteredCriminalDocuments = documents?.filter(
    (doc) => doc.case_type_name === CaseTypeData.CRIMINAL_CASE
  );
  const filteredCivilDocuments = documents?.filter(
    (doc) => doc.case_type_name === CaseTypeData.CIVIL_CASE
  );
  const filteredFamilyDocuments = documents?.filter(
    (doc) => doc.case_type_name === CaseTypeData.FAMILY_CASE
  );

  const filteredExhibitsDocuments = documents?.filter(
    (doc) => doc.case_type_name === "EXHIBITS"
  );
  const costCriminalItems = filteredCriminalDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: doc.amount,
  }));
  const costCivilItems = filteredCivilDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: doc.amount,
  }));
  const costFamilyItems = filteredFamilyDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: doc.amount,
  }));
  const costExhibitsItems = filteredExhibitsDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: doc.amount,
  }));

  const displayedItems = useMemo(() => {
    let items =
      case_type_name === CaseTypeData.CRIMINAL_CASE
        ? costCriminalItems
        : case_type_name === CaseTypeData.CIVIL_CASE
        ? costCivilItems
        : [];

    if (case_type_name === CaseTypeData.CIVIL_CASE && recovery_amount) {
      const recoveryTitle = getTitleByRecoveryAmount({
        recoveryAmount: recovery_amount as any,
        type: sub_case_type_name as CivilCaseSubType,
      });
      items = [
        ...items,
        {
          name: recoveryTitle,
          category: CaseTypeData.CIVIL_CASE,
          amount: getFeeByTitle(recoveryTitle),
        },
      ];
    }
    return items;
  }, [case_type_name, recovery_amount, sub_case_type_name]);

  const totalAmount = useMemo(() => {
    return [
      ...displayedItems,
      ...costExhibitsItems,
      { amount: DEFAULT_SEAL_FEE },
    ]?.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [displayedItems]);

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="text-base font-bold text-primary">
          Total Cost Breakdown
        </div>
        <span className="text-base font-bold text-black">
          {formatAmount(totalAmount)}
        </span>
      </div>
      <div className="space-y-3">
        <div className="text-sm font-semibold">{case_type_name}</div>
        <div>
          {filteredCriminalDocuments?.length > 0 && (
            <>
              {case_type_name === CaseTypeData.CRIMINAL_CASE && (
                <div className="space-y-1">
                  <div className="bg-zinc-100 py-1.5 w-full flex justify-between text-xs font-semibold">
                    <span className="text-xs font-extrabold text-black">
                      UPLOADED DOCUMENTS
                    </span>
                    <span className="font-semibold">Amount </span>
                  </div>
                  {costCriminalItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-xs font-medium">{item.name}</span>
                      <span className="text-base font-medium">
                        {formatAmount(item?.amount ?? 0)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {filteredCivilDocuments?.length > 0 && (
            <>
              {case_type_name === CaseTypeData.CIVIL_CASE && (
                <div className="space-y-1">
                  <div className="bg-zinc-100 py-1.5 w-full flex justify-between text-xs font-semibold">
                    <span className="text-xs font-extrabold text-black">
                      UPLOADED DOCUMENTS
                    </span>
                    <span className="font-semibold">Amount </span>
                  </div>
                  {costCivilItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-xs font-medium">{item.name}</span>
                      <span className="text-base font-medium">
                        {formatAmount(item?.amount ?? 0)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {filteredFamilyDocuments?.length > 0 && (
            <>
              {case_type_name === CaseTypeData.FAMILY_CASE && (
                <div className="space-y-1">
                  <div className="bg-zinc-100 py-1.5 w-full flex justify-between text-xs font-semibold">
                    <span className="text-xs font-extrabold text-black">
                      UPLOADED DOCUMENTS
                    </span>
                    <span className="font-semibold">Amount </span>
                  </div>
                  {costFamilyItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-xs font-medium">{item.name}</span>
                      <span className="text-base font-medium">
                        {formatAmount(item?.amount ?? 0)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {filteredExhibitsDocuments?.length > 0 && (
          <div className="space-y-1">
            <div className="bg-zinc-100 py-1.5 w-full flex justify-between text-xs font-semibold">
              {" "}
              <span className="text-xs font-extrabold text-black">
                SUBMITTED EXHIBITS{" "}
              </span>
              <span className="font-semibold">Amount </span>
            </div>
            {costExhibitsItems?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-xs font-medium">{item.name}</span>
                <span className="text-base font-medium">
                  {formatAmount(item?.amount ?? 0)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-[#641E16] font-medium">
          <span className="font-extrabold text-xs">Seal Generation</span>
          <span className="text-base font-medium">
            {formatAmount(DEFAULT_SEAL_FEE)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t text-sm font-bold">
          <span className="uppercase">Total</span>
          <span>{formatAmount(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}
