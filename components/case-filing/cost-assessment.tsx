import {
  CaseTypeData,
  CivilDocumentTitles,
  CriminalDocumentTitles,
  DEFAULT_EXHIBIT_FEE,
  DEFAULT_SEAL_FEE,
  FamilyDocumentTitles,
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
  variant = "default",
  recovery_amount,
  sub_case_type,
}: {
  documents: IDocumentFileType[];
  case_type: string;
  recovery_amount?: string;
  sub_case_type?: any;
  variant?: keyof typeof variants.header;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["get_document_fees"],
    queryFn: async () => {
      return await getDocumentFees();
    },
  });
  const dispatch = useDispatch();

  const getFeeByTitle = (title: any) => {
    const item = Array.isArray(data)
      ? data.find((item) => item.title?.toLowerCase() === title?.toLowerCase())
      : null;
    return item ? Number(item.fee) : 0;
  };

  const documentGroups = useMemo(
    () => ({
      criminal:
        documents?.filter((doc) =>
          Object.values(CriminalDocumentTitles).some(
            (title) => title?.toLowerCase() === doc.title?.toLowerCase()
          )
        ) || [],
      civil:
        documents?.filter(
          (doc) =>
            Object.values(CivilDocumentTitles).some(
              (title) => title?.toLowerCase() === doc.title?.toLowerCase()
            ) && doc.sub_title === sub_case_type
        ) || [],
      exhibits:
        documents?.filter(
          (doc) => doc.case_type_name.toLowerCase() === "exhibits"
        ) || [],
      other:
        documents?.filter((doc) =>
          Object.values(OtherDocumentMapping[case_type] ?? {}).some(
            (value) =>
              (value as string)?.toLowerCase() === doc.title?.toLowerCase()
          )
        ) || [],
    }),
    [documents, case_type, sub_case_type]
  );

  const costItems = useMemo(
    () => ({
      criminal: documentGroups.criminal.map((doc) => ({
        category: doc.case_type_name,
        name: doc.title,
        amount: getFeeByTitle(doc.title),
      })),
      civil: documentGroups.civil.map((doc) => ({
        category: doc.case_type_name,
        name: doc.title,
        amount: getFeeByTitle(doc.title),
      })),
      exhibits: documentGroups.exhibits.map((doc) => ({
        category: doc.case_type_name,
        name: doc.title,
        amount: DEFAULT_EXHIBIT_FEE,
      })),
      other: documentGroups.other.map((doc) => ({
        category: doc.case_type_name,
        name: doc.title,
        amount: getFeeByTitle(doc.title) || DEFAULT_EXHIBIT_FEE,
      })),
    }),
    [documentGroups, data]
  );

  const displayedItems = useMemo(() => {
    let items =
      case_type === CaseTypeData.CRIMINAL_CASE
        ? costItems.criminal
        : case_type === CaseTypeData.CIVIL_CASE
        ? costItems.civil
        : [];

    if (case_type === CaseTypeData.CIVIL_CASE && recovery_amount) {
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
    return items;
  }, [case_type, costItems, recovery_amount, sub_case_type]);

  const totalAmount = useMemo(() => {
    return [
      ...displayedItems,
      ...costItems.other,
      ...costItems.exhibits,
      { amount: DEFAULT_SEAL_FEE },
    ].reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [displayedItems, costItems]);

  useEffect(() => {
    dispatch(setTotalAmount(totalAmount));
  }, [totalAmount, dispatch]);

  const formatAmount = (amount: any) =>
    amount?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  console.log("documentGroups", documentGroups);
  console.log("costItems", costItems);
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
        ) : !Array.isArray(data) || !data.length ? (
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

            {/* Other Documents */}
            {costItems.other.length > 0 && (
              <div className="space-y-1">
                {costItems.other.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-1 justify-between items-center text-sm"
                  >
                    <span className="text-xs font-medium">{item.name}</span>
                    <span className="text-base font-medium">
                      ₦{formatAmount(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}

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
