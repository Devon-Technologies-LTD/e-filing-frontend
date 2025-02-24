import { CaseStatus, CaseTypeData } from "@/constants";
import { axiosInstance } from "../_api/axios-config";

export interface ICreateCaseFileData {
  title?: string;
  description?: string;
  court_division_id?: string;
  claimant?: Partial<Claimant>;
  defendant?: Partial<Claimant>;
}
export interface CaseTypeDetails {
  id?: string;
  casefile_id?: string;
  case_type_name?: string;
  sub_case_type_name?: string;
  recovery_amount?: string;
  claimant?: Partial<Claimant>;
  defendant?: Partial<Claimant>;
  registrar?: string;
  direct_complain?: string;
  value_worth?: string;
  property_description?: string;
  rental_value?: string;
  relief_sought?: string;
  legal_counsels?: LegalCounsel[];
  sum_claimed?: number;
  cost_claimed?: number;
  interest_claimed?: number;
  summon_details?: SummonDetails;
  notes?: string;
  dated_this?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface LegalCounsel {
  name?: string;
  phone_number?: string;
  email_address?: string;
  address?: string;
  whats_app?: string;
}

export interface SummonDetails {
  court_description?: string;
  state_location?: string;
  time?: string;
  date?: string | null;
}

interface Claimant {
  name: string;
  phone_number: string;
  email_address: string;
  address: string;
  whats_app?: string;
}

export interface IDraftFilter {
  casetype?: string | null;
  casefile_title?: string | null;
  court_division_id?: string | null;
  end_date?: string | null;
  start_data?: string | null;
  status?: CaseStatus[] | null;
  user_id?: string | null;
  page?: number;
  size?: number;
}

export interface CaseDetailsResponse {
  id: string;
  user_id: string;
  title: string;
  description: string;
  court_division_id: string;
  case_type_name: CaseTypeData;
  sub_case_type_name: string;
  division_name: string;
  claimant: Claimant;
  defendant: Claimant;
  status: CaseStatus;
  created_at: string;
  updated_at: string;
}

const CaseFileService = {
  async postCaseFile(payload: ICreateCaseFileData): Promise<any> {
    const response = await axiosInstance.post<ICreateCaseFileData>(
      `casefile`,
      payload
    );

    return response.data;
  },
  async getCaseFiles(payload: IDraftFilter): Promise<any> {
    const { page, size, ...rest } = payload;
    const response = await axiosInstance.post<IDraftFilter>(
      `casefile/case-filter?page=${payload.page}&size=${payload.size}`,
      rest
    );
    console.log("case filter response", response.data);
    return response.data;
  },
  async getCaseFilesbyId(id: string): Promise<any> {
    const response = await axiosInstance.get<any>(`CaseFile/${id}`);
    console.log("case filter by id response", response.data);
    return response.data;
  },
  async deleteCaseFiles(id: string): Promise<any> {
    const response = await axiosInstance.delete<string>(`casefile/${id}`);
    console.log("case filter response", response.data);
    return response.data;
  },
  async patchCaseFile({
    payload,
    caseFileId,
  }: {
    payload: ICreateCaseFileData;
    caseFileId: string;
  }): Promise<any> {
    const response = await axiosInstance.patch<ICreateCaseFileData>(
      `casefile/${caseFileId}`,
      payload
    );

    return response.data;
  },

  async postCaseType(payload: CaseTypeDetails): Promise<any> {
    const response = await axiosInstance.post<CaseTypeDetails>(
      `casetype`,
      payload
    );
    return response.data;
  },
  async getCaseTypeDetails({
    payload,
    id,
  }: {
    payload: any;
    id: string;
  }): Promise<any> {
    const response = await axiosInstance.post<IDraftFilter>(
      `casefile/${id}`,
      payload
    );
    console.log("case filter response", response.data);
    return response.data;
  },
  async deleteCaseType(id: string): Promise<any> {
    const response = await axiosInstance.delete<string>(`casefile/${id}`);
    console.log("case filter response", response.data);
    return response.data;
  },
  async patchCaseType({
    payload,
    caseFileId,
  }: {
    payload: ICreateCaseFileData;
    caseFileId: string;
  }): Promise<any> {
    const response = await axiosInstance.patch<ICreateCaseFileData>(
      `casetype/${caseFileId}`,
      payload
    );

    return response.data;
  },
};

export default CaseFileService;
