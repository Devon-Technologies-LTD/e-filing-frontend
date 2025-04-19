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
  claimant: z
    .array(
      z.object({
        first_name: z
          .string()
          .regex(/^[A-Za-z-' ]+$/, "invalid")
          .nonempty("Required"),
        last_name: z
          .string()
          .regex(/^[A-Za-z-' ]+$/, "invalid")
          .nonempty("Required"),
        phone_number: z
          .string()
          .regex(/^\+?\d+$/, "invalid")
          .nonempty("Required"),
        email_address: z
          .string()
          .email("Invalid email address")
          .nonempty("Required"),
        address: z.string().nonempty("Required"),
        honorific: z.string().nonempty("Required"),
      })
    )
    .nonempty("At least one claimant is required"),
  defendant: z
    .array(
      z.object({
        first_name: z
          .string()
          .regex(/^[A-Za-z-' ]+$/, "invalid")
          .nonempty("Required"),
        last_name: z
          .string()
          .regex(/^[A-Za-z-' ]+$/, "invalid")
          .nonempty("Required"),
        phone_number: z
          .string()
          .optional(),
        email_address: z
          .string()
          .optional(),
        address: z.string().optional(),
        honorific: z.string().nonempty("Required"),
      })
    )
    .nonempty("At least one defendant is required"),
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
    dispatch(clearCaseTypeError());
    if (!result.success) {
      toast.error("Fill All required fields");
      const tempErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        const path = error.path.join(".");
        tempErrors[path] = error.message;
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
