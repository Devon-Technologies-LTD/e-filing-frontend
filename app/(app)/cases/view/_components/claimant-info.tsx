import { useState } from "react";
import LabelValuePair from "@/components/ui/label-value-pair";
import { Icons } from "@/components/svg/icons";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { Claimant } from "@/components/case-filing/hooks";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TitlesSelect } from "@/components/title-select";
import { AddPersonDialog } from "./AddPersonDialog";

interface ClaimantInfoProps {
  name: string;
  caseNumber: string;
  defendant?: Partial<Claimant>[];
  claimant?: Partial<Claimant>[];
  email: string;
  address: string;
  phone: string;
  type?: "claimant" | "defendant";
  isEdit?: boolean;
  setIsEdit?: any;
  loading?: boolean;
  onSubmit?: (data: Partial<Claimant>[]) => void;
}

export function ClaimantInfo({
  caseNumber,
  name,
  email,
  address,
  isEdit,
  setIsEdit,
  phone,
  loading,
  type = "claimant",
  defendant,
  onSubmit,
}: ClaimantInfoProps) {
  const [formData, setFormData] = useState<Partial<Claimant>[] | undefined>(
    defendant
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev?.map((item) => (item.id === id ? { ...item, [name]: value } : item))
    );
  };
  const handleAdd = () => {
    setFormData((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      {
        tempId: crypto.randomUUID(),
        last_name: "",
        first_name: "",
        middle_name: "",
        honorific: "",
      },
    ]);
  };

  const handleRemove = (identifier: string) => {
    if (formData && formData.length <= 1) return;
    setFormData(
      (prev) =>
        prev?.filter((item) => (item.id || item.tempId) !== identifier) || []
    );
  };


  const { data: user } = useAppSelector((state) => state.profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && formData) {
      onSubmit(formData);
    }
  };

  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden">
      <div className="flex justify-between items-center bg-secondary-foreground p-3">
        <h2 className="text-base font-semibold">
          {type === "claimant" ? "Claimant" : "Defendant"} Information
        </h2>
        {/* {[ROLES.LAWYER].includes(user?.role as any) && ( */}
          <>
            {/* {type === "defendant" && ( */}

            {/* )} */}

            <AddPersonDialog type={type} isEdit={false} caseId={caseNumber} />

          </>
        {/* )} */}
        {/* {[ROLES.USER, ROLES.LAWYER].includes(user?.role as any) && (
          <>
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
          </>
        )} */}
      </div>
      <div className="bg-white p-3">
        {isEdit ? (
          <form onSubmit={handleSubmit} className="space-y-6 gap-6">
            {formData?.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between">
                  <p className="font-semibold">Defendant {index + 1}</p>
                  {index > 0 && (
                    <button
                      onClick={() => handleRemove(item.id || item.tempId!)}
                      className="w-auto text-red-500 text-sm"
                    >
                      <Icons.bin />
                    </button>
                  )}
                </div>
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
                >
                  <div>
                    <Label className="block text-sm font-semibold">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      required
                      name="last_name"
                      value={item.last_name || ""}
                      onChange={(e) => handleChange(e, item.id!)}
                      className="mt-1 block w-full font-medium rounded-md text-sm p-2"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-semibold">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      required
                      name="first_name"
                      value={item.first_name || ""}
                      onChange={(e) => handleChange(e, item.id!)}
                      className="mt-1 block w-full font-medium text-sm rounded-md p-2"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-semibold">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      name="email_address"
                      required
                      value={item.email_address || ""}
                      onChange={(e) => handleChange(e, item.id!)}
                      className="mt-1 block w-full font-medium text-sm rounded-md p-2"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-semibold">
                      Physical Address
                    </Label>
                    <Input
                      type="text"
                      required
                      name="address"
                      value={item.address || ""}
                      onChange={(e) => handleChange(e, item.id!)}
                      className="mt-1 block w-full font-medium text-sm rounded-md p-2"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-semibold">
                      Phone Number
                    </Label>
                    <Input
                      type="text"
                      name="phone_number"
                      value={item.phone_number || ""}
                      onChange={(e) => handleChange(e, item.id!)}
                      className="mt-1 block w-full font-medium text-sm rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="col-span-full mt-4">
              <Button
                disabled={loading}
                type="submit"
                className="font-semibold"
              >
                {loading ? "Submitting" : "Submit"}
              </Button>
              <Button
                type="button"
                variant={"link"}
                onClick={handleAdd}
                className="no-underline px-4 py-1 rounded"
              >
                <PlusCircle />
                Add another Defendant
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


