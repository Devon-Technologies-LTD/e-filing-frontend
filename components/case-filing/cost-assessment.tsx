import {
  CaseTypeData,
  CriminalCaseSubType,
  CriminalDocumentTitles,
  DEFAULT_CHARGES_PERCENTAGE,
  DEFAULT_EXHIBIT_FEE,
  DEFAULT_SEAL_FEE,
} from "@/constants";
import { getDocumentFees } from "@/lib/actions/public";
import { cn, getTitleByRecoveryAmount } from "@/lib/utils";
import {
  IDocumentFileType,
  setTotalAmount,
} from "@/redux/slices/case-filing-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { OtherDocumentMapping } from "./steps/document-upload/form";

const variants = {
  header: {
    default: "",
    view: "bg-secondary-foreground p-3",
  },
  body: {
    default: "",
    view: " p-3",
  },
};

export default function CostAssessment({
  documents,
  case_type,
  isRefiling = false,
  variant = "default",
  recovery_amount,
  sub_case_type,
}: {
  documents: IDocumentFileType[];
  case_type: string;
  isRefiling?: boolean;
  recovery_amount?: string;
  sub_case_type?: any;
  variant?: keyof typeof variants.header;
}) {
  const { data: fees, isLoading } = useQuery({
    queryKey: ["get_document_fees"],
    queryFn: async () => {
      return await getDocumentFees();
    },
  });
  const data = [
    ...(fees?.document_fees ?? []),
    ...(fees?.sub_document_fees ?? []),
  ];
  const dispatch = useDispatch();

  const getFeeByTitle = (title: any) => {
    const item = Array.isArray(data)
      ? data?.find((item) => item.title?.toLowerCase() === title?.toLowerCase())
      : null;
    return item ? Number(item.fee) : 0;
  };

  const documentGroups = useMemo(
    () => ({
      case_docs:
        documents?.filter(
          (doc) =>
            doc.case_type_name.toLowerCase() === case_type.toLowerCase() &&
            doc.sub_title.toLowerCase() === sub_case_type.toLowerCase()
        ) || [],
      other_documents:
        documents?.filter(
          (doc) =>
            doc.case_type_name.toLowerCase() === case_type.toLowerCase() &&
            doc.sub_title.toLowerCase() === "other documents"
        ) || [],

      exhibits:
        documents?.filter(
          (doc) => doc.case_type_name.toLowerCase() === "exhibits"
        ) || [],
    }),
    [documents, case_type, sub_case_type]
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

  const displayedItems = useMemo(() => {
    let items = [
      ...(costItems.case_docs || []),
      ...(costItems.other_documents || []),
    ];

    if (
      !isRefiling &&
      case_type === CaseTypeData.CIVIL_CASE &&
      recovery_amount
    ) {
      const recoveryTitle = getTitleByRecoveryAmount({
        recoveryAmount: recovery_amount as any,
        type: sub_case_type,
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
      !isRefiling &&
      case_type === CaseTypeData.CRIMINAL_CASE &&
      sub_case_type === CriminalCaseSubType.DIRECT_COMPLAIN
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
  }, [case_type, costItems, recovery_amount, sub_case_type]);

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

  // const totalAmount = useMemo(() => {
  //   return [
  //     ...displayedItems,
  //     ...costItems.exhibits,
  //     { amount: DEFAULT_SEAL_FEE },
  //   ]?.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  // }, [displayedItems, costItems]);

  useEffect(() => {
    dispatch(setTotalAmount(totalAmount));
  }, [totalAmount, dispatch]);

  const formatAmount = (amount: any) =>
    amount?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="space-y-4">
      <div className={cn(variants.header[variant])}>
        <h1 className="text-base font-bold text-primary">Cost Assessment</h1>
      </div>
      <div className={cn(variants.body[variant])}>
        <h2 className="text-sm font-bold capitalize">
          {case_type?.toLowerCase()}
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : !Array.isArray(data) || !data?.length ? (
          <p className="py-6">Unable to fetch document fees</p>
        ) : (
          <div className="space-y-3 uppercase">
            <div className="flex justify-between text-xs font-semibold">
              <p>DOCUMENTS</p>
              <h3>Amount</h3>
            </div>

            {/* Main Documents */}
            {displayedItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-1 justify-between items-start text-sm"
              >
                <span className="text-sm font-medium capitalize">
                  {item.name}
                </span>
                <span className="text-base font-medium">
                  ₦{formatAmount(item.amount)}
                </span>
              </div>
            ))}

            {/* Exhibits */}
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
                      ₦{formatAmount(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Seal Fee */}
            <div className="flex justify-between items-center text-sm">
              <p className="text-primary text-xs font-semibold">
                Seal Generation
              </p>
              <span className="text-base font-medium">
                ₦{formatAmount(DEFAULT_SEAL_FEE)}
              </span>
            </div>
            
            {/* Additional Charges (10%) */}
            <div className="flex justify-between items-center text-sm">
              <p className="text-primary text-xs font-semibold">
                Additional Charges (10%)
              </p>
              <span className="text-base font-medium">
                ₦{formatAmount(additionalCharges)}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center font-medium">
              <span className="text-xs font-bold">TOTAL</span>
              <span className="text-base font-medium">
                ₦{formatAmount(totalAmount)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
