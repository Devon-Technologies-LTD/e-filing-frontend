import LabelValuePair from "@/components/ui/label-value-pair";

interface ClaimantInfoProps {
  district: string;
  division: string;
  magistrate: string;
}

export function MagistrateCourtInfo({
  district,
  division,
  magistrate,
}: ClaimantInfoProps) {
  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden">
      <div className="bg-secondary-foreground p-3">
        <h2 className="text-base font-semibold">
          Magistrate Court Information
        </h2>
      </div>
      <div className="bg-white p-3">
        <div className="grid grid-cols-1 divide-x-2 divide-neutral-100 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LabelValuePair label="Division" value={division} />
          <LabelValuePair label="Email Address" value={district} />
          <LabelValuePair label="Pending Magistrate" value={magistrate} />
        </div>
      </div>
    </div>
  );
}
