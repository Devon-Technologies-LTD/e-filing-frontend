import React, { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ConfirmInvite from "./confirm-invite";
import { ROLES } from "@/types/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/hooks/redux";
import { ALL_DISTRICT } from "@/types/files/case-type";

interface InviteUserProps {
  trigger: ReactNode;
}

export const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function InviteUser({ trigger }: InviteUserProps) {
  const { data: user } = useAppSelector((state) => state.profile);

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  const [isValid, setIsValid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormValues
  ) => {
    setFormValues({ ...formValues, [field]: e.target.value });
    setIsValid(true)
  };


  const validateForm = (): boolean => {
    const result = formSchema.safeParse(formValues);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setFormErrors({
        firstName: formattedErrors.firstName?._errors?.[0],
        lastName: formattedErrors.lastName?._errors?.[0],
        email: formattedErrors.email?._errors?.[0],
      });
      setIsValid(false);
      return false;
    } else {
      setFormErrors({});
      setIsValid(true);
      return true;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formValues);
      //   setFormValues({ firstName: "", lastName: "", email: "" });
    } else {
      console.log("Form has errors");
    }
  };


  return (
    <>
      <Sheet>
        <SheetTrigger onClick={(e) => e.stopPropagation()} className="">
          {trigger}
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-white md:!w-[505px] min-w-[505px] h-4/5 !max-w-none"
        >
    
          <div className=" mx-auto space-y-8">
            <div className="w-full space-y-6">
              <div className="space-y-1 border-b">
                <div className="text-xl font-bold">
                  Invite a Director Magistrate
                </div>
                <p className="text-sm font-semibold">
                  Invite a Director Magistrate to handle overseeing across all
                  division.
                </p>
              </div>
              <section>
                <form onSubmit={onSubmit} className="space-y-6">
                  {[ROLES.DIRECTOR_MAGISTRATES, ROLES.ASSIGNING_MAGISTRATES].includes(user?.role as ROLES) && (
                    <>
                      <Select>
                        <SelectTrigger variant="underlined" className="w-full text-base">
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_DISTRICT.map((doc) => (
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
                    </>
                  )}
                  <div className="space-y-1">
                    <Label variant={"underline"} htmlFor="firstName">
                      FIRST NAME
                    </Label>
                    <Input
                      variant="underlined"
                      id="firstName"
                      placeholder="e.g barnabas"
                      value={formValues.firstName}
                      className="placeholder:text-zinc-400 border-zinc-300"
                      onChange={(e) => handleChange(e, "firstName")}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-sm">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label variant={"underline"} htmlFor="lastName">
                      LAST NAME
                    </Label>
                    <Input
                      variant="underlined"
                      id="lastName"
                      placeholder="e.g Ibrahim"
                      className="placeholder:text-zinc-400 border-zinc-300"
                      value={formValues.lastName}
                      onChange={(e) => handleChange(e, "lastName")}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-sm">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label variant={"underline"} htmlFor="email">
                      EMAIL ADDRESS*
                    </Label>
                    <Input
                      variant="underlined"
                      type="email"
                      id="email"
                      className="placeholder:text-zinc-400 border-zinc-300"
                      placeholder="name@example.com"
                      value={formValues.email}
                      onChange={(e) => handleChange(e, "email")}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                  {isValid && (
                    <ConfirmInvite
                      formValues={formValues}
                      trigger={
                        <Button type="submit" size={"medium"}>
                          SEND INVITE
                        </Button>
                      }
                    />
                  )}
                  {!isValid && (
                    <Button type="submit" size={"medium"}>
                      SEND INVITE
                    </Button>
                  )}
                </form>
              </section>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
