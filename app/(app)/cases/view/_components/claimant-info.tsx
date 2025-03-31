import { useState } from "react";
import LabelValuePair from "@/components/ui/label-value-pair";
import { Icons } from "@/components/svg/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClaimantInfoProps {
  name: string;
  email: string;
  address: string;
  phone: string;
  type?: "claimant" | "defendant";
  isEdit?: boolean;
  setIsEdit?: any;
  loading?: boolean;
  onSubmit?: (data: {
    name: string;
    email: string;
    address: string;
    phone: string;
  }) => void;
}

export function ClaimantInfo({
  name,
  email,
  address,
  isEdit,
  setIsEdit,
  phone,
  loading,
  type = "claimant",
  onSubmit,
}: ClaimantInfoProps) {
  const [formData, setFormData] = useState({ name, email, address, phone });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden">
      <div className="flex justify-between items-center bg-secondary-foreground p-3">
        <h2 className="text-base font-semibold">
          {type === "claimant" ? "Claimant" : "Defendant"} Information
        </h2>
        {type === "defendant" && (
          <Button
            onClick={() => setIsEdit((prev: any) => !prev)}
            variant={"ghost"}
            className="text-sm font-semibold flex items-center gap-1"
          >
            {isEdit ? (
              "Discard"
            ) : (
              <>
                <Icons.Edit />
                Edit Details
              </>
            )}
          </Button>
        )}
      </div>
      <div className="bg-white p-3">
        {isEdit ? (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div>
              <Label className="block text-sm font-semibold">Name</Label>
              <Input
                type="text"
                variant="bordered"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full font-medium rounded-md p-2"
              />
            </div>
            <div>
              <Label className="block text-sm font-semibold">
                Email Address
              </Label>
              <Input
                type="email"
                variant="bordered"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full font-medium rounded-md p-2"
              />
            </div>
            <div>
              <Label className="block text-sm font-semibold">
                Physical Address
              </Label>
              <Input
                type="text"
                variant="bordered"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full font-medium rounded-md p-2"
              />
            </div>
            <div>
              <Label className="block text-sm font-semibold">
                Phone Number
              </Label>
              <Input
                type="text"
                name="phone"
                variant="bordered"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full font-medium rounded-md p-2"
              />
            </div>
            <div className="col-span-full mt-4">
              <Button
                disabled={loading}
                type="submit"
                className="font-semibold"
              >
                {loading ? "Submitting" : "Submit"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 divide-x-2 divide-neutral-100 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LabelValuePair label="Name" value={name} />
            <LabelValuePair label="Email Address" value={email} />
            <LabelValuePair label="Physical Address" value={address} />
            <LabelValuePair label="Phone Number" value={phone} />
          </div>
        )}
      </div>
    </div>
  );
}
