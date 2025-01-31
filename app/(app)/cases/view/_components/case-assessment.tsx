interface DocumentCost {
  name: string;
  amount: number;
}

interface DocumentGroup {
  title: string;
  items: DocumentCost[];
}

export interface FilingDate {
  date: string;
  documents: DocumentGroup[];
}

interface CostAssessmentProps {
  filings: FilingDate[];
}

export function CostAssessment({ filings }: CostAssessmentProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦");
  };

  const calculateTotal = (filings: FilingDate[]) => {
    return filings.reduce((total, filing) => {
      const filingTotal = filing.documents.reduce((groupTotal, group) => {
        const groupSum = group.items.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        return groupTotal + groupSum;
      }, 0);
      return total + filingTotal;
    }, 0);
  };

  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden">
      <div className="bg-secondary-foreground p-3">
        <h2 className="text-base font-semibold">Cost Assessment</h2>
      </div>
      <div className="bg-white p-3 space-y-8">
        {filings.map((filing, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-sm font-bold">Filed {filing.date}</h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-bold text-sm uppercase">
                  Uploaded Documents
                </span>
                <span className="font-bold text-sm uppercase">Amount</span>
              </div>

              {filing.documents.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className=" text-sm font-medium space-y-2"
                >
                  {group.title && (
                    <h4 className="text-primary font-semibold">
                      {group.title}
                    </h4>
                  )}
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span>{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-b font-bold">
              <span>TOTAL</span>
              <span>{formatCurrency(calculateTotal(filings))}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
