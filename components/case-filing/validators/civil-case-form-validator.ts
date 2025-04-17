import {
  CaseTypeData,
  CivilCaseSubType,
  CivilDocumentTitles,
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
interface Errors extends Partial<Record<keyof ICaseTypes, string>> {
  signature?: string;
  witness?: string;
  plaintParticulars?: string;
}
interface Document {
  title: string;
  sub_title?: string;
}

const requiredField = (value: any, message: string) =>
  value !== undefined && value !== null && value !== "" ? undefined : message;

const minLength = (value: string | undefined, min: number, message: string) =>
  value && value.length >= min ? undefined : message;

const regexMatch = (
  value: string | undefined,
  regex: RegExp,
  message: string
) => (value && regex.test(value) ? undefined : message);

type ValidationRule = {
  field: any;
  check: (...args: any[]) => string | undefined;
  args?: any[];
  message: string;
};

export const civilCaseSchema = z
  .object({
    case_type: z.nativeEnum(CaseTypeData),
    sub_case_type: z.nativeEnum(CivilCaseSubType),
    recovery_amount: z.string().optional(),
    court_division: z.string().optional(),
    property_description: z.string().optional(),
    rental_value: z.string().optional(),
    dated_this: z.any().optional(),
    relief_sought: z.string().optional(),
    sum_claimed: z.string().optional(),
    cost_claimed: z.string().optional(),
    interest_claimed: z.string().optional(),
    // claimant_name: z
    //   .string()
    //   .min(2, "Claimant name must be at least 2 characters")
    //   .regex(
    //     /^[A-Za-z-' ]+$/,
    //     "Name can only contain letters, hyphens, apostrophes, and spaces"
    //   ),
    // claimant_phone_number: z
    //   .string()
    //   .nonempty("Claimant phone number is required")
    //   .regex(/^\d+$/, "Phone number must contain only numbers"),
    // counsel_name: z
    //   .string()
    //   .optional(),
    claimant_whats_app: z.string().optional(),
    // .nonempty("Claimant phone number is required")
    // .regex(/^\d+$/, "Phone number must contain only numbers"),
    // claimant_email_address: z.string().optional(),
    // claimant_address: z
    //   .string()
    //   .min(2, "Claimant address must be at least 2 characters"),
    // defendant_name: z
    //   .string()
    //   .min(2, "Defendant name must be at least 2 characters")
    //   .regex(
    //     /^[A-Za-z-' ]+$/,
    //     "Name can only contain letters, hyphens, apostrophes, and spaces"
    //   ),
    defendant_phone_number: z.string().optional(),
    defendant_email_address: z.string().optional(),
    defendant_whats_app: z.string().optional(),
    // .nonempty("Defendant phone number is required")
    // .regex(/^\d+$/, "Phone number must contain only numbers"),
    defendant_address: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.sub_case_type === CivilCaseSubType.RECOVERY_OF_PREMISE) {
      const validations: ValidationRule[] = [
        {
          field: "court_division",
          check: requiredField,
          message: "Court division is required",
        },
        // {
        //   field: "counsel_name",
        //   check: requiredField,
        //   message: "Counsel Name is required",
        // },
        {
          field: "recovery_amount",
          check: requiredField,
          message: "Recovery amount is required",
        },
        {
          field: "defendant_address",
          check: requiredField,
          message: "Address is required",
        },
        // {
        //   field: "defendant_phone_number",
        //   check: requiredField,
        //   message: "Phone number is required",
        // },
        {
          field: "defendant_address",
          check: minLength,
          args: [2],
          message: "Address must be at least 2 characters",
        },
        // {
        //   field: "defendant_phone_number",
        //   check: regexMatch,
        //   args: [/^\d+$/],
        //   message: "Phone number must contain only numbers",
        // },
      ];

      validations.forEach(({ field, check, args = [], message }) => {
        const value = (data as Partial<ICaseTypes>)[field as keyof ICaseTypes];
        const result = check(value, ...args, message);
        if (result) {
          ctx.addIssue({ path: [field], message, code: z.ZodIssueCode.custom });
        }
      });
    }
    if (
      data.sub_case_type === CivilCaseSubType.PLAINT_FOR_SPECIFIC_SUMMONS ||
      data.sub_case_type === CivilCaseSubType.PLAINT_FOR_DEFAULT_SUMMONS
    ) {
      const validations: ValidationRule[] = [
        {
          field: "recovery_amount",
          check: requiredField,
          message: "Recovery amount is required",
        },
        // {
        //   field: "counsel_name",
        //   check: requiredField,
        //   message: "Counsel Name is required",
        // },
        // {
        //   field: "court_division",
        //   check: requiredField,
        //   message: "Court division is required",
        // },
        {
          field: "sum_claimed",
          check: requiredField,
          message: "Sum claimed is required",
        },
        {
          field: "defendant_address",
          check: requiredField,
          message: "Address is required",
        },
        // {
        //   field: "defendant_phone_number",
        //   check: requiredField,
        //   message: "Phone number is required",
        // },
        // {
        //   field: "dated_this",
        //   check: requiredField,
        //   message: "Date is required",
        // },
        {
          field: "defendant_address",
          check: minLength,
          args: [2],
          message: "Address must be at least 2 characters",
        },
        // {
        //   field: "defendant_phone_number",
        //   check: regexMatch,
        //   args: [/^\d+$/],
        //   message: "Phone number must contain only numbers",
        // },
      ];

      validations.forEach(({ field, check, args = [], message }) => {
        const value = (data as Partial<ICaseTypes>)[field as keyof ICaseTypes];
        const result = check(value, ...args, message);
        if (result) {
          ctx.addIssue({ path: [field], message, code: z.ZodIssueCode.custom });
        }
      });
    }
  });

const useCivilCaseFormValidator = ({ store, documents }: HookProps) => {
  const dispatch = useDispatch();

  const validate = async (_callback?: () => void) => {
    const schema = civilCaseSchema;
    const result = schema.safeParse({
      ...store,
      defendant_address: store.defendant[0].address,
      defendant_phone_number: store.defendant[0].phone_number,
    });
    const errors: Errors = {};
    // Validate the form fields
    if (!result.success) {
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0] as keyof ICaseTypes] = error.message;
        }
      });
    }
    // Validate the necessary documents
    validateDocuments(store, documents, errors);

    const hasErrors = Object.values(errors).some(
      (value) => value && value.length > 0
    );

    if (hasErrors) {
      dispatch(addCaseTypeError(errors));
      toast.error("Fill all required fields");
      return;
    }

    dispatch(clearCaseTypeError());
    _callback?.();
  };

  return { validate };
};

const validateDocuments = (
  store: ICaseTypes,
  documents: Document[] | undefined,
  errors: Errors
): void => {
  if (!documents) {
    if (store.sub_case_type === CivilCaseSubType.RECOVERY_OF_PREMISE) {
      errors.signature = "E-Signature is required";
    } else if (
      store.sub_case_type === CivilCaseSubType.PLAINT_FOR_SPECIFIC_SUMMONS ||
      store.sub_case_type === CivilCaseSubType.PLAINT_FOR_DEFAULT_SUMMONS
    ) {
      errors.signature = "E-Signature is required";
      errors.plaintParticulars = "Required";
    }
    return;
  }

  const findDocument = (title: string): Document | null =>
    documents.find(
      (doc) =>
        doc.title.toLowerCase() === title.toLowerCase() &&
        doc.sub_title?.toLowerCase() === store.sub_case_type.toLowerCase()
    ) || null;

  const validateRequired = (
    doc: Document | null,
    errorKey: keyof Errors,
    errorMessage: string
  ) => {
    errors[errorKey] = doc ? "" : errorMessage;
  };

  switch (store.sub_case_type) {
    case CivilCaseSubType.RECOVERY_OF_PREMISE: {
      const eSignature = findDocument("E-SIGNATURE");
      validateRequired(eSignature, "signature", "E-Signature is required");
      break;
    }
    case CivilCaseSubType.PLAINT_FOR_SPECIFIC_SUMMONS:
    case CivilCaseSubType.PLAINT_FOR_DEFAULT_SUMMONS: {
      const eSignature = findDocument("E-SIGNATURE");
      const plaintParticulars = findDocument(
        CivilDocumentTitles.OtherPlaintsDocument
      );
      validateRequired(eSignature, "signature", "E-Signature is required");
      validateRequired(plaintParticulars, "plaintParticulars", "Required");
      break;
    }
    case CivilCaseSubType.Interpleader: {
      const interpleader = findDocument(CivilDocumentTitles.Interpleader);
      validateRequired(interpleader, "interpleader", "Required");
      break;
    }
    case CivilCaseSubType.OriginatingApplication: {
      const originating = findDocument(
        CivilDocumentTitles.OriginatingApplication
      );
      validateRequired(originating, "originating", "Required");
      break;
    }
    default:
      break;
  }
};

export { useCivilCaseFormValidator };
