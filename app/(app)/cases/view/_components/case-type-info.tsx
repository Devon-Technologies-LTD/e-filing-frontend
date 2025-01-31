import LabelValuePair from "@/components/ui/label-value-pair";

interface ClaimantInfoProps {
  type: string;
  kind: string;
  worth: string;
}

export function CaseTypeInfo({ type, kind, worth }: ClaimantInfoProps) {
  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden">
      <div className="bg-secondary-foreground p-3">
        <h2 className="text-base font-semibold">Case Type Information </h2>
      </div>
      <div className="bg-white p-3">
        <div className="grid grid-cols-1 divide-x-2 divide-neutral-100 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LabelValuePair label="Case Type" value={type} />
          <LabelValuePair label="Kind" value={kind} />
          <LabelValuePair label="Worth of Recovery" value={worth} />
        </div>
      </div>
    </div>
  );
}
