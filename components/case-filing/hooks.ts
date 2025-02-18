// import { axiosInstance } from "@/lib/axios-helper";
import {
  createCaseFile,
  createCaseType,
  updateCaseFile,
  updateCaseType,
} from "@/lib/actions/case-file";
import { dateFormatter } from "@/lib/utils";
import {
  CaseFileState,
  clearCaseFile,
  ICaseTypes,
  ILegalCounsels,
} from "@/redux/slices/case-filing-slice";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface Claimant {
  name: string;
  phone_number: string;
  email_address: string;
  address: string;
  whats_app?: string;
}

interface SaveFormParams {
  step: number | string;
  case_file_id?: string | null;
  data: CaseFileState & ICaseTypes;
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

export const useSaveFormAsDraft = () => {
  const queryClient = useQueryClient();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: async ({
      step,
      case_file_id,
      data,
      legal_counsels,
    }: SaveFormParams) => {
      if (step === 1) {
        return case_file_id
          ? updateCaseFile({
              payload: {
                claimant: {
                  name: data.claimant_name,
                },
                court_division_id: data.court_division,
                defendant: {
                  name: data.defendant_name,
                },
                title: data.title,
                description: "",
              },
              caseFileId: case_file_id,
            })
          : createCaseFile({
              claimant: {
                name: data.claimant_name,
              },
              court_division_id: data.court_division,
              defendant: {
                name: data.defendant_name,
              },
              title: data.title,
              description: "",
            });
      } else {
        return !data.case_type_id
          ? createCaseType({
              case_type_name: data.case_type,
              casefile_id: data.case_file_id,
              claimant: {
                address: data.claimant_name,
                email_address: data.claimant_email_address,
                name: data.claimant_name,
                phone_number: data.claimant_phone_number,
                whats_app: data.claimant_whats_app,
              },
              cost_claimed: +data.cost_claimed,
              defendant: {
                address: data.defendant_address,
                email_address: data.defendant_email_address,
                name: data.defendant_name,
                phone_number: data.defendant_name,
                whats_app: data.defendant_whats_app,
              },
              direct_complain: data.direct_complain,
              interest_claimed: +data.interest_claimed,
              sum_claimed: +data.sum_claimed,
              relief_sought: data.relief_sought,
              sub_case_type_name: data.sub_case_type,
              property_description: data.property_description,
              value_worth: data.value_worth,
              rental_value: data.rental_value,
              // dated_this: data.dated_this
              //   ? dateFormatter(data.dated_this).isoFormat
              //   : null,
              summon_details: {
                court_description: data.summon_court_description,
                // date: data.summon_date ? dateFormatter(data.summon_date).isoFormat : null,
                state_location: data.summon_state_location,
                // time: data.summon_time,
              },
              notes: data.notes,
              reovery_amount: data.recovery_amount,
              legal_counsels,
              registrar: data.registrar,
            })
          : createCaseType({
              case_type_name: data.case_type,
              casefile_id: data.case_file_id,
              claimant: {
                address: data.claimant_name,
                email_address: data.claimant_email_address,
                name: data.claimant_name,
                phone_number: data.claimant_phone_number,
                whats_app: data.claimant_whats_app,
              },
              cost_claimed: +data.cost_claimed,
              defendant: {
                address: data.defendant_address,
                email_address: data.defendant_email_address,
                name: data.defendant_name,
                phone_number: data.defendant_name,
                whats_app: data.defendant_whats_app,
              },
              direct_complain: data.direct_complain,
              interest_claimed: +data.interest_claimed,
              sum_claimed: +data.sum_claimed,
              relief_sought: data.relief_sought,
              sub_case_type_name: data.sub_case_type,
              property_description: data.property_description,
              value_worth: data.value_worth,
              rental_value: data.rental_value,
              // dated_this: data.dated_this
              //   ? dateFormatter(data.dated_this).isoFormat
              //   : null,
              summon_details: {
                court_description: data.summon_court_description,
                // date: data.summon_date ? dateFormatter(data.summon_date).isoFormat : null,
                state_location: data.summon_state_location,
                // time: data.summon_time,
              },
              notes: data.notes,
              reovery_amount: data.recovery_amount,
              legal_counsels,
              registrar: data.registrar,
            });
      }
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message || "Form saved successfully!");
        queryClient.invalidateQueries({ queryKey: ["get_case_drafts"] });
        navigate.push("/drafts");
        dispatch(clearCaseFile());
      } else {
        console.log("first", data);
        toast.error(data.message || "An error occurred while saving the form.");
      }
    },
    onError: (error) => {
      console.error("Save Form Error:", error);
      toast.error("Failed to save form. Please try again.");
    },
  });

  return mutation;
};
