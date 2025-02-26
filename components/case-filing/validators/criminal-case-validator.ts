import {
  CaseTypeData,
  CriminalCaseSubType,
  CriminalDocumentTitles,
  DocumentTitlesEnum,
} from "@/constants";
import {
  addCaseTypeError,
  clearCaseTypeError,
  ICaseTypes,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

type HookProps = {
  store: ICaseTypes;
  documents?: any;
};

export const criminalCaseSchema = z.object({
  case_type: z.nativeEnum(CaseTypeData),
  sub_case_type: z.nativeEnum(CriminalCaseSubType),
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
  direct_complain: z
    .string()
    .optional(),
});

const useCriminalCaseFormValidator = ({ store, documents }: HookProps) => {
  const dispatch = useDispatch();
  const validateDocument = (
    docTitle: CriminalDocumentTitles,
    errorKey: string
  ) => {
    const doc = documents?.find(
      (doc: any) => doc.title.toLowerCase() === docTitle.toLowerCase()
    );
    if (!doc) {
      dispatch(addCaseTypeError({ [errorKey]: "Required" }));
      return false;
    } else {
      dispatch(addCaseTypeError({ [errorKey]: "" }));
      return true;
    }
  };

  const handleSchemaErrors = (result: z.SafeParseReturnType<any, any>) => {
    if (!result.success) {
      const tempErrors: Partial<Record<keyof ICaseTypes, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          tempErrors[error.path[0] as keyof ICaseTypes] = error.message;
        }
      });
      dispatch(addCaseTypeError(tempErrors));
      return false;
    }
    dispatch(clearCaseTypeError());
    return true;
  };
  const validate = async (_callback?: () => void) => {
    const schema = criminalCaseSchema;
    const result = schema.safeParse(store);
    if (!store.sub_case_type) {
      dispatch(
        addCaseTypeError({
          sub_case_type: "Required",
        })
      );
      toast.error("Fill all required fields");
    }
    switch (store.sub_case_type) {
      case CriminalCaseSubType.FIRST_INFORMATION_REPORT:
        if (
          validateDocument(
            CriminalDocumentTitles.FIRST_INFORMATION_REPORT,
            "firDoc"
          )
        ) {
          _callback?.();
        } else {
          toast.error("Fill all required fields");
        }
        break;

      case CriminalCaseSubType.REQUEST_FOR_REMAND_ORDER:
        if (
          validateDocument(
            CriminalDocumentTitles.REQUEST_FOR_REMAND_ORDER,
            "exparte"
          )
        ) {
          _callback?.();
        } else {
          toast.error("Fill all required fields");
        }
        break;

      case CriminalCaseSubType.DIRECT_COMPLAIN:
        if (handleSchemaErrors(result)) {
          _callback?.();
        } else {
          toast.error("Fill all required fields");
        }
        break;

      default:
        break;
    }
  };

  return { validate };
};

export { useCriminalCaseFormValidator };
