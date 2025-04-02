import {
  CaseTypeData,
  CriminalCaseSubType,
  CriminalDocumentTitles,
  DEFAULT_CHARGES_PERCENTAGE,
  DEFAULT_EXHIBIT_FEE,
  DEFAULT_SEAL_FEE,
} from "@/constants";
import { IDataProps } from "./side-nav";
import { useMemo } from "react";
import { getTitleByRecoveryAmount } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getDocumentFees } from "@/lib/actions/public";

interface CostBreakdownProps {
  data: IDataProps;
}

export function CostBreakdown({ data }: CostBreakdownProps) {
  const { documents, case_type_name, sub_case_type_name } = data;
  const recovery_amount = data?.casetype?.recovery_amount ?? "";
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦ ");
  };
  const { data: fees, isLoading } = useQuery({
    queryKey: ["get_document_fees"],
    queryFn: async () => {
      return await getDocumentFees();
    },
  });
  const amountData = [
    ...(fees?.document_fees ?? []),
    ...(fees?.sub_document_fees ?? []),
  ];
  const getFeeByTitle = (title: any) => {
    const item = Array.isArray(amountData)
      ? amountData.find(
          (item) => item.title?.toLowerCase() === title?.toLowerCase()
        )
      : null;
    return item ? Number(item.fee) : 0;
  };
  const documentGroups = useMemo(
    () => ({
      case_docs:
        documents?.filter(
          (doc) =>
            doc.case_type_name.toLowerCase() === case_type_name.toLowerCase() &&
            doc.sub_title.toLowerCase() === sub_case_type_name.toLowerCase()
        ) || [],
      other_documents:
        documents?.filter(
          (doc) =>
            doc.case_type_name.toLowerCase() === case_type_name.toLowerCase() &&
            doc.sub_title.toLowerCase() === "other documents"
        ) || [],
      exhibits:
        documents?.filter(
          (doc) => doc.case_type_name.toLowerCase() === "exhibits"
        ) || [],
    }),
    [documents, case_type_name, sub_case_type_name]
  );

  const costItems = useMemo(
    () => ({
      case_docs: documentGroups.case_docs.map((doc) => ({
        category: doc.case_type_name,
        name: doc.title,
        amount: doc.amount,
      })),
      other_documents: documentGroups.other_documents.map((doc) => ({
        category: doc.case_type_name,
        name: doc.title,
        amount: doc.amount,
      })),
      exhibits: documentGroups.exhibits.map((doc) => ({
        category: doc.case_type_name,
        name: doc.title,
        amount: DEFAULT_EXHIBIT_FEE,
      })),
    }),
    [documentGroups, data]
  );

  // const displayedItems = useMemo(() => {
  //   let items =
  //     case_type_name === CaseTypeData.CRIMINAL_CASE
  //       ? costCriminalItems
  //       : case_type_name === CaseTypeData.CIVIL_CASE
  //       ? costCivilItems
  //       : [];

  //   if (case_type_name === CaseTypeData.CIVIL_CASE && recovery_amount) {
  //     const recoveryTitle = getTitleByRecoveryAmount({
  //       recoveryAmount: recovery_amount as any,
  //       type: sub_case_type_name as CivilCaseSubType,
  //     });
  //     items = [
  //       ...items,
  //       {
  //         name: recoveryTitle,
  //         category: CaseTypeData.CIVIL_CASE,
  //         amount: getFeeByTitle(recoveryTitle),
  //       },
  //     ];
  //   }
  //   return items;
  // }, [case_type_name, recovery_amount, sub_case_type_name]);

  const displayedItems = useMemo(() => {
    let items = [
      ...(costItems.case_docs || []),
      ...(costItems.other_documents || []),
    ];

    if (case_type_name === CaseTypeData.CIVIL_CASE && recovery_amount) {
      const recoveryTitle = getTitleByRecoveryAmount({
        recoveryAmount: recovery_amount as any,
        type: sub_case_type_name as any,
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
    if (
      case_type_name === CaseTypeData.CRIMINAL_CASE &&
      sub_case_type_name === CriminalCaseSubType.DIRECT_COMPLAIN
    ) {
      items = [
        ...items,
        {
          name: CriminalCaseSubType.DIRECT_COMPLAIN.toLowerCase(),
          category: CaseTypeData.CRIMINAL_CASE,
          amount: getFeeByTitle(CriminalDocumentTitles.DIRECT_COMPLAIN),
        },
      ];
    }
    return items;
  }, [case_type_name, costItems, recovery_amount, sub_case_type_name]);

  const subtotal = useMemo(() => {
    return [
      ...displayedItems,
      ...costItems.exhibits,
      { amount: DEFAULT_SEAL_FEE },
    ]?.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [displayedItems, costItems]);

  const additionalCharges = useMemo(() => {
    return subtotal * (DEFAULT_CHARGES_PERCENTAGE / 100);
  }, [subtotal]);

  const totalAmount = useMemo(() => {
    return subtotal + additionalCharges;
  }, [subtotal, additionalCharges]);

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
        {displayedItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-1 justify-between items-start text-sm"
          >
            <span className="text-sm font-medium capitalize">{item.name}</span>
            <span className="text-base font-medium">
              {formatAmount(item.amount!)}
            </span>
          </div>
        ))}
        {costItems.exhibits.length > 0 && (
          <div className="space-y-1">
            <p className="text-primary text-xs font-semibold">Exhibits</p>
            {costItems.exhibits.map((item, index) => (
              <div
                key={index}
                className="flex gap-1 justify-between items-center text-sm"
              >
                <span className="text-xs">{item.name}</span>
                <span className="text-base font-medium">
                  {formatAmount(item.amount)}
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
        <div className="flex justify-between items-center text-sm">
          <p className="text-primary text-xs font-semibold">
            Additional Charges (10%)
          </p>
          <span className="text-base font-medium">
            {formatAmount(additionalCharges)}
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
