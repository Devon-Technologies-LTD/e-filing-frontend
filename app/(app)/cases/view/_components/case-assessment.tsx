import {
  CaseTypeData,
  CivilCaseSubType,
  CriminalCaseSubType,
  FamilyCaseSubType,
  OtherDocuments,
} from "@/constants";
import { IDocumentFileType } from "@/redux/slices/case-filing-slice";

export function CostAssessment({
  documents,
  case_type,
}: {
  documents: IDocumentFileType[];
  case_type: string;
}) {
  const filteredCriminalDocuments = documents?.filter((doc) =>
    Object.values(CriminalCaseSubType).includes(
      doc.title as CriminalCaseSubType
    )
  );
  const filteredCivilDocuments = documents?.filter((doc) =>
    Object.values(CivilCaseSubType).includes(doc.title as CivilCaseSubType)
  );
  const filteredFamilyDocuments = documents?.filter((doc) =>
    Object.values(FamilyCaseSubType).includes(doc.title as FamilyCaseSubType)
  );
  const filteredOtherDocuments = documents?.filter((doc) =>
    Object.values(OtherDocuments).includes(doc.title as OtherDocuments)
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
  const costOtherDocuments = filteredOtherDocuments?.map((doc) => ({
    category: doc.case_type_name,
    name: doc.title,
    amount: doc.amount,
  }));

  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden">
      <div className="bg-secondary-foreground p-3">
        <h2 className="text-base font-semibold">Cost Assessment</h2>
      </div>
      <div className="space-y-4">
        <h1 className="text-base font-bold text-primary">Cost Assessment</h1>
        <h2 className="text-sm font-bold capitalize">
          {case_type?.toLowerCase()}
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-semibold">
            <p className="">UPLOADED DOCUMENTS</p>
            <h3>Amount</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
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
                              item?.amount.toLocaleString("en-US", {
                                minimumFractionDigits: 3,
                                maximumFractionDigits: 3,
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
                              item?.amount.toLocaleString("en-US", {
                                minimumFractionDigits: 3,
                                maximumFractionDigits: 3,
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
                              item?.amount.toLocaleString("en-US", {
                                minimumFractionDigits: 3,
                                maximumFractionDigits: 3,
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
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
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
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
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
                {[0].toLocaleString("en-US", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
