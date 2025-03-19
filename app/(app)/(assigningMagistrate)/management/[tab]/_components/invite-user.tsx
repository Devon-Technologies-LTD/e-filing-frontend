
'use client'
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
import { COURT_TYPE } from "@/types/files/case-type";
import { LocationAdmin } from "@/components/location-admin";
import { addCaseTypeError, ICaseTypes, updateCaseTypeName } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { DivisionAdmin } from "@/components/division-admin";


interface InviteUserProps {
  trigger: ReactNode;
  tab?: String;
}

const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function InviteUser({ trigger, tab }: InviteUserProps) {
  const { data: user } = useAppSelector((state) => state.profile);
  const { caseType, caseTypeErrors } = useAppSelector((data) => data.caseFileForm);
  const dispatch = useDispatch();
  const [showConfirmInvite, setShowConfirmInvite] = useState(false);

  let headingText, descriptionText, buttonText;
  switch (user?.role) {
    case ROLES.CHIEF_JUDGE:
      headingText = "Invite a Director Magistrate";
      descriptionText = "Invite a Director Magistrate to oversee all divisions..";
      break;
    case ROLES.DIRECTOR_MAGISTRATE:
      headingText = "Invite New Assigning Magistrate";
      descriptionText = "Invite a Assigning Magistrate to handle case distribution within their division.";
      break;
    case ROLES.ASSIGNING_MAGISTRATE:
      if (tab === "central") {
        headingText = "Invite New Central Registrar";
        descriptionText = "View and manage all Central Registrar responsible for presiding over cases. Monitor their activity, case requests, and re-assignment requests across different districts.";
      } else {
        headingText = "Invite New Presiding Magistrate";
        descriptionText = "View and manage all presiding magistrates responsible for presiding over cases. Monitor their activity, case requests, and re-assignment requests across different districts.";
      }
      break;
    default:
      headingText = "Magistrate Information";
      descriptionText = "View general information about magistrates.";
  }

  const [role, setRole] = useState<string>(() => {
    switch (user?.role) {
      case ROLES.CHIEF_JUDGE:
        return "DIRECTOR_MAGISTRATE";
      case ROLES.DIRECTOR_MAGISTRATE:
        return "ASSIGNING_MAGISTRATE";
      case ROLES.ASSIGNING_MAGISTRATE:
        if (tab === "central") {
          return "CENTRAL_REGISTRAR";
        } else {
          return "PRESIDING_MAGISTRATE";
        }
      default:
        return "CENTRAL";
    }
  });

  const [formValues, setFormValues] = useState<FormValues>({ first_name: "", last_name: "", email: "" });
  const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});
  const [isValid, setIsValid] = useState(false);

  // State for selected court_type and court division
  const [selectedCourt, setSelectedDistrict] = useState<string>("");
  const [selectedCourtDivision, setSelectedCourtDivision] = useState<string>(caseType.court_division);
  const [selectedCourtSubDivision, setSelectedCourtSubDivision] = useState<string>("");

  const handleChanges = (name: keyof ICaseTypes, value: string) => {
    dispatch(updateCaseTypeName({ [name]: value }));
  };
  const handleSelectChange = (value: string) => {
    setSelectedDistrict(value);
  };
  const handleCourtDivisionChange = (value: string) => {
    setSelectedCourtDivision(value);
    handleChanges("court_division", value);
    dispatch(addCaseTypeError({ court_division: "" }));
  };
  const handleCourtSubDivisionChange = (value: string) => {
    setSelectedCourtSubDivision(value);
    setSelectedCourtDivision(user?.court_division_id ?? "");
    setSelectedDistrict(user?.court_type ?? "");
    handleChanges("sub_division", value);
    dispatch(addCaseTypeError({ sub_division: "" }));
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
      console.log("Form is valid, opening confirmation modal...");
      setShowConfirmInvite(true);
    } else {
      console.log("Form has errors, modal will not open.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger onClick={(e) => {
        e.stopPropagation();

        setFormValues({
          first_name: "",
          last_name: "",
          email: "",
        });

      }}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <div className="space-y-8 mx-auto">
          <div className="space-y-6 w-full">
            <div className="border-b space-y-1">
              <h2 className="text-xl font-bold">{headingText}</h2>
              <p className="text-sm font-semibold">{descriptionText}</p>
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
              <Input type="hidden" id="role" value={role} />
              {[ROLES.DIRECTOR_MAGISTRATE].includes(user?.role as ROLES) && (
                <>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full text-base">
                      <SelectValue placeholder="Select Type of Court" />
                    </SelectTrigger>
                    <SelectContent>
                      {COURT_TYPE.map((doc) => (
                        <SelectItem key={doc.value} value={doc.value} className="py-2">
                          {doc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <LocationAdmin
                    placeholder="Select A Filing Location"
                    value={selectedCourtDivision}
                    onChange={handleCourtDivisionChange}
                    error={caseTypeErrors?.court_division}
                  />
                </>
              )}


              {tab != "central" &&
                [ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
                  <DivisionAdmin
                    id={user?.court_division_id ?? ""}
                    placeholder="Select A Sub Division"
                    value={selectedCourtSubDivision}
                    onChange={handleCourtSubDivisionChange}
                    error={caseTypeErrors?.sub_division}
                  />
                )}

              {(["first_name", "last_name", "email"] as const).map((field) => (
                <div key={field} className="space-y-1">
                  <Label htmlFor={field}>
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
              <Button type="submit" onClick={onSubmit}>SEND INVITE</Button>
              {isValid && (
                <ConfirmInvite
                  isOpen={showConfirmInvite}
                  setIsOpen={setShowConfirmInvite}
                  formValues={{
                    ...formValues,
                    role,
                    court_type: selectedCourt,
                    court_division_id: selectedCourtDivision ,
                    sub_division: selectedCourtSubDivision,
                  }}
                  trigger={<span />}
                />
              )}

            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
