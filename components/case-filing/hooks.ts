import { CaseStatus } from "@/constants";
import { useAppSelector } from "@/hooks/redux";
import { useRemitaPayment } from "@/hooks/use-remita-payment";
import {
  createCaseFile,
  createCaseType,
  updateCaseFile,
  updateCaseType,
} from "@/lib/actions/case-file";
import { generateRRR } from "@/lib/actions/payment";
import { dateFormatter, formatErrors, generateCaseTitle } from "@/lib/utils";
import {
  clearCaseTypeError,
  clearForm,
  ICaseTypes,
  ILegalCounsels,
  updateCaseTypeName,
  updateMultipleCaseTypeFields,
  updateStep,
} from "@/redux/slices/case-filing-slice";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export interface Claimant {
  id: string;
  phone_number: string;
  email_address: string;
  address: string;
  first_name: string;
  honorific: string;
  last_name: string;
  middle_name: string;
  whatsapp?: string;
}

interface SaveFormParams {
  case_file_id?: string | null;
  data: Partial<ICaseTypes> & {
    id?: string;
  };
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
      return await createCaseFile(data as any);
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
  const { data: user } = useAppSelector((state) => state.profile);
  const { paymentType } = useAppSelector((state) => state.caseFileForm);
  const { triggerPayment } = useRemitaPayment({
    onSuccess: () => dispatch(updateStep(step + 1)),
    onError: (response) => console.log("Payment Error:", response),
  });
  const [showPaystackInfoModal, setShowPaystackInfoModal] = useState(false);

  const paystackConfig = useMemo(
    () => ({
      reference: new Date().getTime().toString(),
      email: user?.email ?? "",
      amount: (amount ?? 0) * 100,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "",
    }),
    [user?.email, amount]
  );

  const onPaystackSuccess = (data: any) => {
    dispatch(updateCaseTypeName({ reference: data?.reference }));
    dispatch(updateStep(step + 1));
  };

  const onClose = () => {
    console.log("closed");
  };
  const initializePaystackPayment = usePaystackPayment(paystackConfig);
  const handlePaystackPayment = useCallback(() => {
    initializePaystackPayment({
      onSuccess: onPaystackSuccess,
      onClose,
    });
  }, [initializePaystackPayment, onPaystackSuccess]);

  const generateRRRMutation = useMutation({
    mutationFn: async ({ caseFileId }: { caseFileId: string }) => {
      return await generateRRR(caseFileId, amount);
    },
    onSuccess: (data) => {
      if (data?.success) {
        const response = triggerPayment(data?.data?.RRR, amount);
        if (!response) {
          setShowPaystackInfoModal(true);
        }
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
          claimant: data.claimant,
          court_division_id: data.court_division,
          defendant: data.defendant,
          title: generateCaseTitle(
            (data as any).claimant,
            (data as any).defendant
          ),
        };
        console.log("case file payload", payload);

        if (case_file_id) {
          return updateCaseFile({ payload, caseFileId: case_file_id });
        } else {
          return createCaseFile(payload);
        }
      };

      const saveStep2 = async () => {
        const payload = {
          // steps: String(step),
          id: data?.case_type_id,
          case_type_name: data.case_type,
          casefile_id: data.case_file_id,
          // claimant: data.claimant,
          cost_claimed: data.cost_claimed,
          // defendant: data.defendant,
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
        console.log("payloaddd", payload);
        return data?.case_type_id &&
          data.case_type_id !== "00000000-0000-0000-0000-000000000000"
          ? updateCaseType({ payload: payload, caseTypeId: data.case_type_id })
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
            console.log("first on submit", data);
            const fieldsToUpdate: Record<string, any> = {
              case_file_id: data.id,
            };

            if (Array.isArray(data.claimant)) {
              fieldsToUpdate.claimant = data.claimant;
            }

            if (Array.isArray(data.defendant)) {
              fieldsToUpdate.defendant = data.defendant;
            }

            dispatch(updateMultipleCaseTypeFields({ fields: fieldsToUpdate }));
          }
          if (step === 5) {
            if (paymentType === "paystack") {
              handlePaystackPayment();
            } else generateRRRMutation.mutate({ caseFileId: data.casefile_id });
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

  return {
    mutation,
    generateRRRMutation,
    initializePaymentFunction: handlePaystackPayment,
    showPaystackInfoModal,
    setShowPaystackInfoModal,
  };
};
