interface CostItem {
  name: string;
  amount: number;
  category?: string;
}

const costItems: CostItem[] = [
  {
    name: "First Information Report Document",
    amount: 0,
  },
  {
    name: "Charge Sheet",
    amount: 0,
  },
  {
    name: "Car Light Picture",
    amount: 500,
    category: "Exhibits",
  },
  {
    name: "Seal Generation",
    amount: 0,
  },
];

export default function CostAssessment() {
  const total = costItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="">
      <div className="space-y-4">
        <h1 className="text-base font-bold text-primary">Cost Assessment</h1>
        <h2 className="text-sm font-bold">Criminal Case</h2>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-semibold">
            <p className="">UPLOADED DOCUMENTS</p>
            <h3>Amount</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              {costItems.map((item, index) => (
                <div key={index}>
                  {item.category && (
                    <h4 className="text-xs font-semibold text-primary mb-2">
                      {item.category}
                    </h4>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs">{item.name}</span>
                    <span className="text-base font-medium">
                      ₦{" "}
                      {item.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center font-medium">
              <span className="text-xs font-bold">TOTAL</span>
              <span className="text-base font-medium">
                ₦{" "}
                {total.toLocaleString("en-US", {
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
