import {} from "@/constants";
import {
  addCaseTypeError,
  clearCaseTypeError,
  ICaseTypes,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

export const caseOverviewSchema = z.object({
  court_division: z.string().nonempty("Filing location is required"),
  claimant_title: z.string().nonempty("Title is required"),
  defendant_title: z.string().nonempty("Title is required"),
  claimant_firstname: z
    .string()
    .min(1, "required")
    .regex(
      /^[A-Za-z-' ]+$/,
      "Name can only contain letters, hyphens, apostrophes, and spaces"
    ),
  claimant_lastname: z
    .string()
    .min(1, "required")
    .regex(
      /^[A-Za-z-' ]+$/,
      "Name can only contain letters, hyphens, apostrophes, and spaces"
    ),
  defendant_firstname: z
    .string()
    .min(1, "required")
    .regex(
      /^[A-Za-z-' ]+$/,
      "Name can only contain letters, hyphens, apostrophes, and spaces"
    ),
  defendant_lastname: z
    .string()
    .min(1, "required")
    .regex(
      /^[A-Za-z-' ]+$/,
      "Name can only contain letters, hyphens, apostrophes, and spaces"
    ),
  claimant_phone_number: z
    .string()
    .nonempty("Claimant phone number is required")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  claimant_email_address: z.string().email("Invalid email address"),
  claimant_address: z
    .string()
    .min(2, "Claimant address must be at least 2 characters"),
});

type HookProps = {
  store: ICaseTypes;
  documents?: any;
};

const useCaseOverviewFormValidator = ({ store }: HookProps) => {
  const dispatch = useDispatch();
  const validate = async (_callback?: () => void) => {
    const schema = caseOverviewSchema;
    const result = schema.safeParse({
      claimant_phone_number: store.claimant[0].phone_number,
      claimant_email_address: store.claimant[0].email_address,
      claimant_firstname: store.claimant[0].first_name,
      claimant_lastname: store.claimant[0].last_name,
      claimant_address: store.claimant[0].address,
      defendant_firstname: store.defendant[0].first_name,
      defendant_lastname: store.defendant[0].first_name,
      court_division: store.court_division,
      claimant_title: store.claimant[0].honorific,
      defendant_title: store.defendant[0].honorific,
    });
    if (!result.success) {
      toast.error("Fill All required fields");
      const tempErrors: Partial<Record<keyof ICaseTypes, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          tempErrors[error.path[0] as keyof ICaseTypes] = error.message;
        }
      });
      dispatch(addCaseTypeError(tempErrors));
    } else {
      dispatch(clearCaseTypeError());
      _callback?.();
    }
  };

  return { validate };
};
export { useCaseOverviewFormValidator };
