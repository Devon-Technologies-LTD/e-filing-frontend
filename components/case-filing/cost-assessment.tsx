import {
  CaseTypeData,
  CivilCaseSubType,
  CivilDocumentTitles,
  CriminalCaseSubType,
  FamilyCaseSubType,
  OtherDocuments,
} from "@/constants";
import { getDocumentFees } from "@/lib/actions/public";
import { cn } from "@/lib/utils";
import {
  IDocumentFileType,
  setTotalAmount,
} from "@/redux/slices/case-filing-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
}: {
  documents: IDocumentFileType[];
  case_type: string;
  variant?: keyof typeof variants.header;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get_document_fees"],
    queryFn: async () => {
      return await getDocumentFees();
    },
  });
  const dispatch = useDispatch();

  console.log("asessmentttt/", data);

  const getFeeByTitle = (title: any) => {
    const item = Array.isArray(data)
      ? data.find((item) => item.title?.toLowerCase() === title?.toLowerCase())
      : null;
    return item ? Number(item.fee) : 0;
  };

  const filteredCriminalDocuments = documents?.filter((doc) =>
    Object.values(CriminalCaseSubType).some(
      (caseType) => caseType.toLowerCase() === doc.title.toLowerCase()
    )
  );
  const filteredCivilDocuments = documents?.filter((doc) =>
    Object.values(CivilDocumentTitles).some(
      (value) => value.toLowerCase() === doc.title.toLowerCase()
    )
  );

  const filteredFamilyDocuments = documents?.filter((doc) =>
    Object.values(FamilyCaseSubType).some(
      (value) => value.toLowerCase() === doc.title.toLowerCase()
    )
  );

  const filteredOtherDocuments = documents?.filter((doc) =>
    Object.values(OtherDocuments).some(
      (value) => value.toLowerCase() === doc.title.toLowerCase()
    )
  );

  const filteredExhibitsDocuments = documents?.filter(
    (doc) => doc.case_type_name.toLowerCase() === "exhibits"
  );

  const costCriminalItems = filteredCriminalDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: getFeeByTitle(doc.title),
  }));
  const costCivilItems = filteredCivilDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: getFeeByTitle(doc.title),
  }));
  const costFamilyItems = filteredFamilyDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: getFeeByTitle(doc.title),
  }));

  console.log("cost assessment", costFamilyItems);
  const costExhibitsItems = filteredExhibitsDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: 500,
  }));
  const costOtherDocuments = filteredOtherDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: 500,
  }));
  console.log("cost assessment other docs", costOtherDocuments);

  // const totalAmount = [
  //   ...costCriminalItems,
  //   ...costCivilItems,
  //   ...costFamilyItems,
  //   ...costOtherDocuments,
  //   ...costExhibitsItems,
  // ]
  //   .map((item) => item.amount || 0)
  //   .reduce((acc, curr) => acc + curr, 0);

  const displayedItems =
    case_type === CaseTypeData.CRIMINAL_CASE
      ? costCriminalItems
      : case_type === CaseTypeData.CIVIL_CASE
      ? costCivilItems
      : case_type === CaseTypeData.FAMILY_CASE
      ? costFamilyItems
      : [];

  const totalAmount = [
    ...displayedItems,
    ...costOtherDocuments,
    ...costExhibitsItems,
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
          <h2 className="text-sm font-bold capitalize">
            {case_type?.toLowerCase() || ""}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-semibold">
              <p className="">UPLOADED DOCUMENTS</p>
              <h3>Amount</h3>
            </div>

            <div className="space-y-3 uppercase">
              <div className="space-y-1 uppercase">
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
                              ₦{" "}
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

                {filteredCivilDocuments?.length > 0 && (
                  <>
                    {case_type === CaseTypeData.CIVIL_CASE && (
                      <>
                        {costCivilItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-xs">{item.name}</span>
                            <span className="text-base font-medium">
                              ₦{" "}
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
                {filteredFamilyDocuments?.length > 0 && (
                  <>
                    {case_type === CaseTypeData.FAMILY_CASE && (
                      <>
                        {costFamilyItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-xs">{item.name}</span>
                            <span className="text-base font-medium">
                              ₦{" "}
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
                          ₦{" "}
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
                  <p className="text-primary text-xs font-semibold">Exhibits</p>
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

              <div className="flex justify-between items-center font-medium">
                <span className="text-xs font-bold">TOTAL</span>
                <span className="text-base font-medium">
                  ₦{" "}
                  {totalAmount?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
