import {
  CaseTypeData,
  CivilCaseSubType,
  CivilCaseSubTypeValueWorth,
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

// Define the schema for civil case validation
export const civilCaseSchema = z
  .object({
    case_type: z.nativeEnum(CaseTypeData),
    sub_case_type: z.nativeEnum(CivilCaseSubType),
    recovery_amount: z.nativeEnum(CivilCaseSubTypeValueWorth),
    court_division: z.string().optional(),
    property_description: z.string().optional(),
    rental_value: z.string().optional(),
    dated_this: z.any(),
    relief_sought: z.string().optional(),
    sum_claimed: z.string().optional(),
    cost_claimed: z.string().optional(),
    interest_claimed: z.string().optional(),
    claimant_name: z
      .string()
      .min(2, "Claimant name must be at least 2 characters")
      .regex(
        /^[A-Za-z-' ]+$/,
        "Name can only contain letters, hyphens, apostrophes, and spaces"
      ),
    claimant_phone_number: z
      .string()
      .nonempty("Claimant phone number is required")
      .regex(/^\d+$/, "Phone number must contain only numbers")
      .min(11, "Phone number must be at least 11 digits"),
    claimant_whats_app: z
      .string()
      .nonempty("Claimant phone number is required")
      .regex(/^\d+$/, "Phone number must contain only numbers")
      .min(11, "Phone number must be at least 11 digits"),
    claimant_email_address: z.string().email("Invalid email address"),
    claimant_address: z
      .string()
      .min(2, "Claimant address must be at least 2 characters"),
    defendant_name: z
      .string()
      .min(2, "Defendant name must be at least 2 characters")
      .regex(
        /^[A-Za-z-' ]+$/,
        "Name can only contain letters, hyphens, apostrophes, and spaces"
      )
      .min(11, "Phone number must be at least 11 digits"),
    defendant_phone_number: z
      .string()
      .nonempty("Defendant phone number is required")
      .regex(/^\d+$/, "Phone number must contain only numbers")
      .min(11, "Phone number must be at least 11 digits"),
    defendant_email_address: z.string().email("Invalid email address"),
    defendant_whats_app: z
      .string()
      .nonempty("Defendant phone number is required")
      .regex(/^\d+$/, "Phone number must contain only numbers")
      .min(11, "Phone number must be at least 11 digits"),
    defendant_address: z
      .string()
      .min(2, "Defendant address must be at least 2 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.sub_case_type === CivilCaseSubType.RECOVERY_OF_PREMISE) {
      validateRecoveryOfPremise(data, ctx);
    }

    if (
      data.sub_case_type === CivilCaseSubType.PLAINT_FOR_SPECIFIC_SUMMONS ||
      data.sub_case_type === CivilCaseSubType.PLAINT_FOR_DEFAULT_SUMMONS
    ) {
      validatePlaintForSummons(data, ctx);
    }
  });

// Helper function to validate Recovery of Premise sub-case type
const validateRecoveryOfPremise = (data: any, ctx: z.RefinementCtx) => {
  const requiredFields = [
    { field: "court_division", message: "Court division is required" },
    {
      field: "property_description",
      message: "Property Description is required",
    },
    { field: "rental_value", message: "Rental Value is required" },
    { field: "relief_sought", message: "Relief Sought is required" },
    { field: "dated_this", message: "Date is required" },
  ];

  requiredFields.forEach(({ field, message }) => {
    if (!data[field]) {
      ctx.addIssue({
        path: [field],
        message,
        code: z.ZodIssueCode.custom,
      });
    }
  });
};

// Helper function to validate Plaint for Summons sub-case type
const validatePlaintForSummons = (data: any, ctx: z.RefinementCtx) => {
  const requiredFields = [
    { field: "court_division", message: "Court division is required" },
    { field: "sum_claimed", message: "Sum Claimed is required" },
    { field: "interest_claimed", message: "Interest Claimed is required" },
    { field: "cost_claimed", message: "Cost Claimed is required" },
    { field: "dated_this", message: "Date is required" },
  ];

  requiredFields.forEach(({ field, message }) => {
    if (!data[field]) {
      ctx.addIssue({
        path: [field],
        message,
        code: z.ZodIssueCode.custom,
      });
    }
  });
};

const useCivilCaseFormValidator = ({ store, documents }: HookProps) => {
  const dispatch = useDispatch();

  const validate = async (_callback?: () => void) => {
    const schema = civilCaseSchema;
    const result = schema.safeParse(store);
    const errors: Partial<Record<keyof ICaseTypes, string>> = {};

    // Validate the form fields
    if (!result.success) {
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errors[error.path[0] as keyof ICaseTypes] = error.message;
        }
      });
    }

    // Validate the documents
    validateDocuments(store, documents, errors);

    // If there are any errors, dispatch them and show a toast
    if (Object.keys(errors).length > 0) {
      dispatch(addCaseTypeError(errors));
      toast.error("Fill all required fields");
      return;
    }

    // If no errors, clear any previous errors and execute the callback
    dispatch(clearCaseTypeError());
    _callback?.();
  };

  return { validate };
};

const validateDocuments = (store: ICaseTypes, documents: any, errors: any) => {
  const eSignature =
    documents?.find((doc: any) => doc.title === "E-SIGNATURE") || null;
  const witness =
    documents?.find((doc: any) => doc.title === "WITNESS STATEMENT OF OATH") ||
    null;
  const plaintParticulars =
    documents?.find((doc: any) => doc.title === "PARTICULARS OF PLAINT") ||
    null;

  if (store.sub_case_type === CivilCaseSubType.RECOVERY_OF_PREMISE) {
    if (!eSignature) errors.signature = "E-Signature is required";
    if (!witness) errors.witness = "Witness statement of oath is required";
  }

  if (
    store.sub_case_type === CivilCaseSubType.PLAINT_FOR_SPECIFIC_SUMMONS ||
    store.sub_case_type === CivilCaseSubType.PLAINT_FOR_DEFAULT_SUMMONS
  ) {
    if (!eSignature) errors.signature = "E-Signature is required";
    if (!plaintParticulars)
      errors.plaintParticulars = "Particulars of plaint is required";
  }
};

export { useCivilCaseFormValidator };
