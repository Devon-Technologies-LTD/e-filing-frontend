import { CaseStatus } from "@/constants";
import { useRemitaPayment } from "@/hooks/use-remita-payment";
import {
  createCaseFile,
  createCaseType,
  updateCaseFile,
  updateCaseType,
} from "@/lib/actions/case-file";
import { generateRRR } from "@/lib/actions/payment";
import { dateFormatter, formatErrors } from "@/lib/utils";
import {
  clearCaseTypeError,
  clearForm,
  ICaseTypes,
  ILegalCounsels,
  updateCaseTypeName,
  updateStep,
} from "@/redux/slices/case-filing-slice";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export interface Claimant {
  name: string;
  phone_number: string;
  email_address: string;
  address: string;
  whats_app?: string;
}

interface SaveFormParams {
  case_file_id?: string | null;
  data: Partial<ICaseTypes>;
  legal_counsels?: ILegalCounsels[];
}

interface CaseFileData {
  title: string;
  description?: string;
  court_division_id: string;
  claimant: Claimant;
  defendant: Partial<Claimant>;
}

export function useCreateCaseFile(
  options?: UseMutationOptions<any, unknown, CaseFileData>
) {
  return useMutation({
    mutationFn: async (data) => {
      return await createCaseFile(data);
    },
    ...options,
  });
}

export const useSaveForm = ({
  step,
  isDraft = false,
  amount,
  onSuccess,
}: {
  step: number;
  isDraft?: boolean;
  amount?: any;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const navigate = useRouter();
  const dispatch = useDispatch();

  const { triggerPayment } = useRemitaPayment({
    onSuccess: (response) => {
      dispatch(updateStep(step + 1));
    },
    onError: (response) => console.log("Payment Error:", response),
  });

  const generateRRRMutation = useMutation({
    mutationFn: async ({ caseFileId }: { caseFileId: string }) => {
      return await generateRRR(caseFileId, amount);
    },
    onSuccess: (data) => {
      console.log("first in client", data);
      if (data?.success) {
        triggerPayment(data.data?.RRR, amount);
        dispatch(updateCaseTypeName({ reference: data?.data?.RRR }));
      } else {
        toast.error(`Failed to generate RRR. ${data?.data.message}`);
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ case_file_id, data }: SaveFormParams) => {
      const saveStep1 = async () => {
        const payload = {
          // steps: String(step),
          claimant: {
            name: data.claimant_name,
            phone_number: data.claimant_phone_number,
            email_address: data.claimant_email_address,
            address: data.claimant_address,
            whats_app: data.claimant_whats_app,
          },
          court_division_id: data.court_division,
          defendant: {
            name: data.defendant_name,
            phone_number: data.defendant_phone_number,
            email_address: data.defendant_email_address,
            address: data.defendant_address,
            whats_app: data.defendant_whats_app,
          },
          title: data.title,
          description: "",
        };
        if (case_file_id) {
          return updateCaseFile({ payload, caseFileId: case_file_id });
        } else {
          return createCaseFile(payload);
        }
      };

      const saveStep2 = async () => {
        const payload = {
          // steps: String(step),
          case_type_name: data.case_type,
          casefile_id: data.case_file_id,
          claimant: {
            address: data.claimant_name,
            email_address: data.claimant_email_address,
            name: data.claimant_name,
            phone_number: data.claimant_phone_number,
            whats_app: data.claimant_whats_app,
          },
          cost_claimed: data.cost_claimed,
          defendant: {
            address: data.defendant_address,
            email_address: data.defendant_email_address,
            name: data.defendant_name,
            phone_number: data.defendant_phone_number,
            whats_app: data.defendant_whats_app,
          },
          legal_counsels: [
            {
              name: data.counsel_name ?? "",
            },
          ],
          direct_complain: data.direct_complain,
          interest_claimed: data.interest_claimed,
          sum_claimed: data.sum_claimed,
          relief_sought: data.relief_sought,
          sub_case_type_name: data.sub_case_type,
          property_description: data.property_description,
          value_worth: data.value_worth,
          rental_value: data.rental_value,
          dated_this: data.dated_this
            ? dateFormatter(data.dated_this).isoFormat
            : null,
          summon_details: {
            court_description: data.summon_court_description,
            date: data.summon_date
              ? dateFormatter(data.summon_date).isoFormat
              : null,
            state_location: data.summon_state_location,
            time: data.summon_time,
          },
          notes: data.notes,
          recovery_amount: data.recovery_amount,
          registrar: data.registrar,
          status: isDraft && CaseStatus.Draft,
        };
        console.log("payload to save", payload);
        return data?.case_type_id
          ? updateCaseType({ payload: payload, caseFileId: data.case_type_id })
          : createCaseType(payload);
      };

      if (step === 1) {
        return saveStep1();
      } else {
        return saveStep2();
      }
    },
    onSuccess: (data) => {
      if (!data?.success) {
        const errorMessage = formatErrors(data.errors);
        toast.error(
          `${data?.message}: ${errorMessage}` ||
            "An error occurred while saving the form."
        );
        return;
      } else {
        if (isDraft) {
          queryClient.invalidateQueries({ queryKey: ["get_case_drafts"] });
          navigate.push("/drafts");
          dispatch(clearForm());
          dispatch(clearCaseTypeError());
        }
        if (!isDraft) {
          if (step === 1) {
            dispatch(updateCaseTypeName({ case_file_id: data.id }));
          }
          if (step === 5) {
            generateRRRMutation.mutate({ caseFileId: data.casefile_id });
          } else if (step < 5) {
            dispatch(updateStep(step + 1));
          }
        }
      }
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error("Save Form Error:", error);
      toast.error("Failed to save form. Please try again.");
    },
  });

  return { mutation, generateRRRMutation };
};
