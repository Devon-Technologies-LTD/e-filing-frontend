import LabelValuePair from "@/components/ui/label-value-pair";

interface ClaimantInfoProps {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export function ClaimantInfo({
  name,
  email,
  address,
  phone,
}: ClaimantInfoProps) {
  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden">
      <div className="bg-secondary-foreground p-3">
        <h2 className="text-base font-semibold">Claimant Information</h2>
      </div>
      <div className="bg-white p-3">
        <div className="grid grid-cols-1 divide-x-2 divide-neutral-100 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LabelValuePair label="Name" value={name} />
          <LabelValuePair label="Email Address" value={email} />
          <LabelValuePair label="Physical Address" value={address} />
          <LabelValuePair label="Phone Number" value={phone} />
        </div>
      </div>
    </div>
  );
}
