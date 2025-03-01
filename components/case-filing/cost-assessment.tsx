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
import { useEffect } from "react";
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

  const filteredCriminalDocuments =
    documents?.filter((doc) =>
      Object.values(CriminalDocumentTitles).some(
        (caseType) => caseType?.toLowerCase() === doc.title?.toLowerCase()
      )
    ) || [];
  const filteredCivilDocuments =
    documents?.filter(
      (doc) =>
        Object.values(CivilDocumentTitles).some(
          (value) => value?.toLowerCase() === doc.title?.toLowerCase()
        ) && doc.sub_title === sub_case_type
    ) || [];

  const filteredFamilyDocuments =
    documents?.filter((doc) =>
      Object.values(FamilyDocumentTitles).some(
        (value) => value?.toLowerCase() === doc.title?.toLowerCase()
      )
    ) || [];

  const filteredOtherDocuments =
    documents?.filter((doc) =>
      Object.values(OtherDocumentMapping[case_type] ?? {}).some(
        (value: any) => value?.toLowerCase() === doc.title?.toLowerCase()
      )
    ) || [];

  const filteredExhibitsDocuments =
    documents?.filter(
      (doc) => doc.case_type_name.toLowerCase() === "exhibits"
    ) || [];

  const costCriminalItems =
    filteredCriminalDocuments?.map((doc) => ({
      category: doc.case_type_name,
      name: doc.title,
      amount: getFeeByTitle(doc.title),
    })) || [];

  const costCivilItems =
    filteredCivilDocuments?.map((doc) => ({
      category: doc.case_type_name,
      name: doc.title,
      amount: getFeeByTitle(doc.title),
    })) || [];

  // const costFamilyItems = filteredFamilyDocuments?.map((doc) => ({
  //   category: doc.case_type_name,
  //   name: doc.title,
  //   amount: getFeeByTitle(doc.title),
  // }));

  const costExhibitsItems =
    filteredExhibitsDocuments?.map((doc) => ({
      category: doc.case_type_name,
      name: doc.title,
      amount: DEFAULT_EXHIBIT_FEE,
    })) || [];

  const costOtherDocuments =
    filteredOtherDocuments?.map((doc) => ({
      category: doc.case_type_name,
      name: doc.title,
      amount: getFeeByTitle(doc.title) || DEFAULT_EXHIBIT_FEE,
    })) || [];

  const displayedItems =
    case_type === CaseTypeData.CRIMINAL_CASE
      ? costCriminalItems || []
      : case_type === CaseTypeData.CIVIL_CASE
      ? costCivilItems || []
      : [];

  if (case_type === CaseTypeData.CIVIL_CASE && recovery_amount) {
    const recoveryTitle = getTitleByRecoveryAmount({
      recoveryAmount: recovery_amount as any,
      type: sub_case_type,
    });

    displayedItems.push({
      name: recoveryTitle,
      category: CaseTypeData.CIVIL_CASE,
      amount: getFeeByTitle(recoveryTitle),
    });
  }

  const sealFee = [{ amount: DEFAULT_SEAL_FEE }];

  const totalAmount = [
    ...displayedItems,
    ...costOtherDocuments,
    ...costExhibitsItems,
    ...sealFee,
  ]
    ?.map((item) => item.amount || 0)
    .reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    dispatch(setTotalAmount(totalAmount));
  }, [totalAmount, dispatch]);

  return (
    <div>
      <div className="space-y-4">
        <div className={cn(variants.header[variant])}>
          <h1 className="text-base font-bold text-primary">Cost Assessment</h1>
        </div>
        <div className={cn(variants.body[variant])}>
          <div className="space-y-4">
            <h2 className="text-sm font-bold capitalize">
              {case_type?.toLowerCase() || ""}
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-semibold">
                <p className=""> DOCUMENTS</p>
                <h3>Amount</h3>
              </div>
            </div>
            {isLoading ? (
              <></>
            ) : (
              <>
                {Array.isArray(data) && data && data?.length > 0 ? (
                  <>
                    <div className="space-y-3 uppercase">
                      <div className="space-y-1 uppercase">
                        {case_type === CaseTypeData.CIVIL_CASE && (
                          <>
                            {/* CIVIL CASE PRICES */}
                            {recovery_amount ? (
                              <div className="flex gap-4 justify-between items-start text-sm">
                                <p className="text-sm font-medium capitalize">
                                  {getTitleByRecoveryAmount({
                                    recoveryAmount: recovery_amount as any,
                                    type: sub_case_type as any,
                                  })}
                                </p>
                                <span className="text-base font-medium">
                                  ₦
                                  {getFeeByTitle(
                                    getTitleByRecoveryAmount({
                                      recoveryAmount: recovery_amount as any,
                                      type: sub_case_type as any,
                                    })
                                  )?.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </div>
                            ) : (
                              ""
                            )}

                            {/* CIVIL CASE DOCUMENTS */}
                            {filteredCivilDocuments?.length > 0 && (
                              <>
                                {costCivilItems.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center text-sm"
                                  >
                                    <span className="text-sm font-medium capitalize">
                                      {item.name}
                                    </span>
                                    <span className="text-base font-medium">
                                      ₦
                                      {item.amount &&
                                        item?.amount?.toLocaleString("en-US", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })}
                                    </span>
                                  </div>
                                ))}
                              </>
                            )}
                          </>
                        )}

                        {filteredCriminalDocuments?.length > 0 && (
                          <>
                            {case_type === CaseTypeData.CRIMINAL_CASE && (
                              <>
                                {costCriminalItems.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center text-sm"
                                  >
                                    <span className="text-xs">{item.name}</span>
                                    <span className="text-base font-medium">
                                      ₦
                                      {item.amount &&
                                        item?.amount?.toLocaleString("en-US", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })}
                                    </span>
                                  </div>
                                ))}
                              </>
                            )}
                          </>
                        )}

                        {filteredOtherDocuments?.length > 0 && (
                          <>
                            {costOtherDocuments?.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center text-sm"
                              >
                                <span className="text-xs">{item.name}</span>
                                <span className="text-base font-medium">
                                  ₦
                                  {item.amount &&
                                    item?.amount.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                </span>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                      {filteredExhibitsDocuments?.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-primary text-xs font-semibold">
                            Exhibits
                          </p>
                          {costExhibitsItems?.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-xs">{item.name}</span>
                              <span className="text-base font-medium">
                                ₦{" "}
                                {item.amount &&
                                  item?.amount.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <p className="text-primary text-xs font-semibold">
                            Seal Generation
                          </p>
                          <span className="text-base font-medium">
                            ₦
                            {DEFAULT_SEAL_FEE?.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-xs font-bold">TOTAL</span>
                        <span className="text-base font-medium">
                          ₦
                          {totalAmount?.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="py-6">Unable to fetch document fees</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
