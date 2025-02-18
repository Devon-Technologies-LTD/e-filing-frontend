import {
  addCaseFileError,
  CaseFileState,
  clearCaseFileError,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { z } from "zod";

export const caseOverviewSchema = z.object({
  court_division: z.string().nonempty("Filing location is required"),
  claimant_name: z.string().nonempty("Claimant is required"),
  defendant_name: z.string().nonempty("Defendant is required"),
  title: z.string().nonempty("Case title is required"),
  claimant_phone_number: z
    .string()
    .nonempty("Claimant phone number is required"),
  claimant_email_address: z.string().email("Invalid email address"),
  claimant_address: z.string().nonempty("Claimant address is required"),
});

type HookProps = {
  store: CaseFileState;
};

const useCaseOverviewFormValidator = ({ store }: HookProps) => {
  const dispatch = useDispatch();
  const validate = async (_callback?: () => void) => {
    const schema = caseOverviewSchema;
    const result = schema.safeParse(store);
    if (!result.success) {
      const tempErrors: Partial<Record<keyof CaseFileState, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          tempErrors[error.path[0] as keyof CaseFileState] = error.message;
        }
      });
      dispatch(addCaseFileError(tempErrors));
    } else {
      dispatch(clearCaseFileError());
      _callback?.();
    }
  };

  return { validate };
};
export { useCaseOverviewFormValidator };
