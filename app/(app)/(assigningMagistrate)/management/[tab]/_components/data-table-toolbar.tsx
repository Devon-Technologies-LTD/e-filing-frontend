"use client";

import { Search } from "lucide-react";
import { ALL_DISTRICT, CaseTypes } from "@/types/files/case-type";
import { useState } from "react";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import InputField from "@/components/ui/InputField";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CasesDataTableToolbarProps {
  columns: any;
  tab: string;
}

const allDocuments = [
  { id: 1, value: "zone1", label: "WUSE ZONE 1" },
  { id: 2, value: "zone2", label: "WUSE ZONE 2" },
  { id: 3, value: "zone3", label: "WUSE ZONE 3" },
];

export function CasesDataTableToolbar({ columns, tab }: CasesDataTableToolbarProps) {

  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const handleCaseTypeChange = (value: string) => {
    setSelectedCase(value as CaseTypes);
  };
  const caseFilter = [{ value: 'all', label: 'ALL DISTRICT' }, ...ALL_DISTRICT];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="col ">
          {tab === "all" ? (
            <div className="space-y-1">
              <span className="font-bold">Presiding Magistrate</span>
              <p className="text-sm"> View and manage all presiding magistrates responsible for presiding over cases. <br />
                Monitor their activity, case request anf re-assignment request across different districts</p>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="font-bold">Pending Invitations</span>
              <p className="text-sm">
                Review and manage pending invitations sent to magistrates. <br />
                Track invitation statuses and resend or revoke invitations as needed.
              </p>
            </div>
          )}
        </div>
        <section className="flex gap-3">
          <FilterDropdown
            triggerVariant="outline"
            itemVariant="outline"
            placeholder="ALL DISTRICT"
            options={caseFilter}
            value={selectedCase}
            onChange={handleCaseTypeChange}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button className="h-12 text-center">INVITE NEW MAGISTRATE</Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white !w-[500px] sm:!w-[540px] h-4/5 min-w-[500px] !max-w-none"
            >
              <SheetHeader>
                <SheetTitle>Invite a Presiding Magistrate</SheetTitle>
                <SheetDescription>
                  Invite a Presiding Magistrate in a district under Wuse Zone 2 division to preside over cases in that district.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <form className="w-full space-y-6">

                  <Select>
                    <SelectTrigger variant="underlined" className="w-full text-base">
                      <SelectValue placeholder="Select a Document to Upload" />
                    </SelectTrigger>
                    <SelectContent>
                      {allDocuments.map((doc) => (
                        <SelectItem
                          variant="underlined"
                          className="py-2"
                          key={doc.value}
                          value={doc.value}
                        >
                          {doc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <InputField
                    id="first_name"
                    type="text"
                    label="First Name"
                    name="last_name"
                    placeholder="e.g. Prince"
                    required
                  />
                  <InputField
                    id="last_name"
                    type="text"
                    label="Last Name"
                    name="last_name"
                    placeholder="e.g. Muteh"
                    required
                  />
                  <InputField
                    id="email"
                    type="email"
                    label="EMAIL ADDRESS"
                    name="email"
                    placeholder="name@gmail.com"
                    required
                  />
                  <div className="col w-1/4">
                    <SubmitButton
                      value="SEND INVITE"
                      pendingValue="Processing..."
                      className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
                    />
                  </div>

                </form>
              </div>
              <SheetFooter>
                <SheetClose asChild></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

        </section>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
        <Input
          type="search"
          variant="ghost"
          autoComplete="off"
          data-form-type="other"
          placeholder="e.g Search Magistrate Name"
          className="pl-9 h-12 md:w-[100px] lg:w-[400px]"
        />
      </div>
    </>
  );
}
