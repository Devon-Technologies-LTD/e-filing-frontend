import React, { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ConfirmInvite from "./confirm-invite";
import { ROLES } from "@/types/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/hooks/redux";
import { ALL_DISTRICT } from "@/types/files/case-type";
import { LocationSelect } from "@/components/location-select";
import { addCaseTypeError, ICaseTypes, updateCaseTypeName } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";


interface InviteUserProps {
  trigger: ReactNode;
}

const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function InviteUser({ trigger }: InviteUserProps) {
  const { data: user } = useAppSelector((state) => state.profile);
  const [formValues, setFormValues] = useState<FormValues>({ first_name: "", last_name: "", email: "" });
  const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});
  const [isValid, setIsValid] = useState(false);
  const [role, setRole] = useState<string>(() => {
    switch (user?.role) {
      case ROLES.CHIEF_JUDGE:
        return "DIRECTOR_MAGISTRATE";
      case ROLES.DIRECTOR_MAGISTRATE:
        return "ASSIGNING_MAGISTRATE";
      case ROLES.ASSIGNING_MAGISTRATE:
        return "PRESIDING_MAGISTRATE"; //add central magisterate
      default:
        return "CENTRAL";
    }
  });

  const { caseType, caseTypeErrors } = useAppSelector(
    (data) => data.caseFileForm
  );
  const dispatch = useDispatch();
  const handleChanges = (name: keyof ICaseTypes, value: string) => {
    dispatch(updateCaseTypeName({ [name]: value }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
    setIsValid(true);
  };

  const validateForm = (): boolean => {
    const result = formSchema.safeParse(formValues);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setFormErrors({
        first_name: formattedErrors.first_name?._errors?.[0],
        last_name: formattedErrors.last_name?._errors?.[0],
        email: formattedErrors.email?._errors?.[0],
      });
      setIsValid(false);
      return false;
    }
    setFormErrors({});
    setIsValid(true);
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { ...formValues, role });
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <Sheet>
      <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <div className="space-y-8 mx-auto">
          <div className="space-y-6 w-full">
            <div className="border-b space-y-1">
              <h2 className="text-xl font-bold">Invite a Director Magistrate</h2>
              <p className="text-sm font-semibold">Invite a Director Magistrate to oversee all divisions.</p>
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
              <Input type="hidden" id="role" value={role} />
              {[ROLES.DIRECTOR_MAGISTRATE, ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (

                <LocationSelect
                  value={caseType.court_division}
                  onChange={(value) => {
                    handleChanges("court_division", value);
                    dispatch(
                      addCaseTypeError({
                        court_division: "",
                      })
                    );
                  }}
                  error={caseTypeErrors?.court_division}
                />


                // <Select>
                //   <SelectTrigger className="w-full text-base">
                //     <SelectValue placeholder="Select District" />
                //   </SelectTrigger>
                //   <SelectContent>
                //     {ALL_DISTRICT.map((doc) => (
                //       <SelectItem key={doc.value} value={doc.value} className="py-2">
                //         {doc.label}
                //       </SelectItem>
                //     ))}
                //   </SelectContent>
                // </Select>
              )}
              {(["first_name", "last_name", "email"] as const).map((field) => (
                <div key={field} className="space-y-1">
                  <Label htmlFor={field} >
                    {field.replace("_", " ").toUpperCase()}
                  </Label>
                  <Input
                    variant="underlined"
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={`Enter ${field.replace("_", " ")}`}
                    value={formValues[field]}
                    onChange={handleChange}
                    className="placeholder:text-zinc-400 border-zinc-300"
                  />
                  {formErrors[field] && <p className="text-red-500 text-sm">{formErrors[field]}</p>}
                </div>
              ))}
              <ConfirmInvite
                formValues={{ ...formValues, role }}
                trigger={<Button type="submit">SEND INVITE</Button>}
              />
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


{/* <Input
  variant="underlined"
  type="email"
  id="email"
  className="placeholder:text-zinc-400 border-zinc-300"
  placeholder="name@example.com"
  value={formValues.email}
  onChange={(e) => handleChange(e, "email")}
/> */}