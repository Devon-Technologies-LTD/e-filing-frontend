import {} from "@/constants";
import {
  addCaseTypeError,
  clearCaseTypeError,
  ICaseTypes,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { z } from "zod";

export const caseOverviewSchema = z.object({
  court_division: z.string().nonempty("Filing location is required"),
  claimant_name: z
    .string()
    .min(2, "Claimant name must be at least 2 characters")
    .regex(
      /^[A-Za-z-' ]+$/,
      "Name can only contain letters, hyphens, apostrophes, and spaces"
    ),
  defendant_name: z
    .string()
    .min(2, "Defendant name must be at least 2 characters")
    .regex(
      /^[A-Za-z-' ]+$/,
      "Name can only contain letters, hyphens, apostrophes, and spaces"
    ),
  title: z.string().min(2, "Case title must be at least 2 characters"),
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
    const result = schema.safeParse(store);
    if (!result.success) {
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
