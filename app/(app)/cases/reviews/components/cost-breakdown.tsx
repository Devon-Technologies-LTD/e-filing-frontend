import { IDataProps } from "./side-nav";

interface CostBreakdownProps {
  data: any;
  costBreakdown: any[];
}

export function CostBreakdown({ data, costBreakdown }: CostBreakdownProps) {
  const { case_type_name } = data;
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦ ");
  };
  const documentsGroup = Array.isArray(costBreakdown)
    ? costBreakdown?.filter(
        (item) =>
          item.case_type.toLowerCase() !== "seal charge" &&
          item.case_type.toLowerCase() !== "service charge" &&
          item.title.toLowerCase() !== "exhibits"
      )
    : [];

  const exhibits = Array.isArray(costBreakdown)
    ? costBreakdown?.filter((item) => item.title.toLowerCase() === "exhibits")
    : [];
  const service = Array.isArray(costBreakdown)
    ? costBreakdown?.filter(
        (item) => item.case_type.toLowerCase() === "service charge"
      )
    : [];
  const seals = Array.isArray(costBreakdown)
    ? costBreakdown?.filter(
        (item) => item.case_type.toLowerCase() === "seal charge"
      )
    : [];

  const serviceCharge = service.reduce((sum, item) => sum + item.amount, 0);
  const sealFee = seals.reduce((sum, item) => sum + item.amount, 0);
  const exhibitFee = exhibits.reduce((sum, item) => sum + item.amount, 0);
  const documentFee = documentsGroup.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalAmount = serviceCharge + sealFee + exhibitFee + documentFee;
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
        {documentsGroup?.map((item, index) => (
          <div
            key={index}
            className="flex gap-1 justify-between items-start text-sm"
          >
            <span className="text-sm font-medium capitalize">{item.title}</span>
            <span className="text-base font-medium">
              {formatAmount(item.amount!)}
            </span>
          </div>
        ))}
        {exhibits.length > 0 && (
          <div className="space-y-1">
            <p className="text-primary text-xs font-semibold">Exhibits</p>
            {exhibits.map((item, index) => (
              <div
                key={index}
                className="flex gap-1 justify-between items-center text-sm"
              >
                <span className="text-xs">{item.title}</span>
                <span className="text-base font-medium">
                  {formatAmount(item.amount)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-[#641E16] font-medium">
          <span className="font-extrabold text-xs">Seal Generation</span>
          <span className="text-base font-medium">{formatAmount(sealFee)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-primary text-xs font-semibold">
            Additional Charges (10%)
          </p>
          <span className="text-base font-medium">
            {formatAmount(serviceCharge)}
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
