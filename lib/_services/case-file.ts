import { CaseStatus, CaseTypeData } from "@/constants";
import { axiosInstance } from "../_api/axios-config";
import { changeCaseStatus } from "../actions/case-file";
import { Claimant } from "@/components/case-filing/hooks";

export interface ICreateCaseFileData {
  title?: string;
  // steps?: string;
  description?: string;
  court_division_id?: string;
  claimant?: Partial<Claimant>[];
  defendant?: Partial<Claimant>[];
}
export interface CaseTypeDetails {
  id?: string;
  // steps?: string;
  casefile_id?: string;
  case_type_name?: string;
  sub_case_type_name?: string;
  recovery_amount?: string;
  claimant?: Partial<Claimant>[];
  defendant?: Partial<Claimant>[];
  registrar?: string;
  direct_complain?: string;
  value_worth?: string;
  property_description?: string;
  rental_value?: string;
  relief_sought?: string;
  legal_counsels?: LegalCounsel[];
  sum_claimed?: string;
  cost_claimed?: string;
  interest_claimed?: string;
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


export interface IDraftFilter {
  casetype?: string | null;
  casefile_title?: string | null;
  case_name?: string | null;
  case_suit_number?: string | null;
  court_division_id?: string | null;
  end_date?: string | null;
  start_date?: string | null;
  status?: CaseStatus[] | null;
  user_id?: string | null;
  year?: string | null;
  assignee_id?: string | null;
  page?: number;
  size?: number;
  isHearing?: boolean;
  is_active?: boolean;
}
export interface IHearingFilter {
  casefile_id?: string | null;
  hearing_date?: string | null;
  id?: string | null;
  hearing_time?: string | null;
  other_details?: string | null;
  end_date?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface IChangeStatus {
  status: CaseStatus;
  reason?: string;
}

export interface CaseDetailsResponse {
  review_status: string;
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
  assigned_to: string;
  assignee_name: string;
  reassignment_status: string;
  case_request_status: string;
  CaseDetailsResponse: string;
}

const CaseFileService = {
  async postCaseFile(payload: ICreateCaseFileData): Promise<any> {
    const response = await axiosInstance.post<ICreateCaseFileData>(
      `casefile`,
      payload
    );
    return response.data;
  },

  async getCaseFilesAdmin(
    payload: IDraftFilter,
    page: number,
    size: number
  ): Promise<any> {
    const response = await axiosInstance.post<IDraftFilter>(
      `admin/casefile/case-filter?page=${page}&size=${size}`,
      payload
    );
    return response.data;
  },

  async getHearing(): Promise<any> {
    const response = await axiosInstance.get<IHearingFilter>(
      `admin/casefile/case-hearings`
    );
    return response.data;
  },

  async getCaseActivity(id: string): Promise<any> {
    const response = await axiosInstance.get<IDraftFilter>(
      `activity/case-activity/${id}`
    );
    return response.data;
  },
  async getCaseFiles(
    payload: IDraftFilter,
    page: number,
    size: number
  ): Promise<any> {
    const response = await axiosInstance.post<IDraftFilter>(
      `casefile/case-filter?page=${page}&size=${size}`,
      payload
    );
    return response.data;
  },
  async getCaseFilesbyId(id: string): Promise<any> {
    const response = await axiosInstance.get<any>(`CaseFile/${id}`);
    return response.data;
  },
  async getReassignmentHistory(id: string): Promise<any> {
    const response = await axiosInstance.get<any>(
      `admin/casefile/reassignment-history/${id}`
    );
    return response.data;
  },
  async caseRequestHistory(id: string): Promise<any> {
    const response = await axiosInstance.get<any>(
      `admin/casefile/case-request-history/${id}`
    );
    return response.data;
  },
  async changeReassignmentStatus(id: string, status: string): Promise<any> {
    const response = await axiosInstance.patch<any>(
      `admin/casefile/resassignment/${id}`,
      {
        status: status,
      }
    );
    return response.data;
  },
  async changeCaseRequestStatus(id: string, status: string): Promise<any> {
    const response = await axiosInstance.patch<any>(
      `admin/casefile/approve-case-request/${id}`,
      {
        status: status,
      }
    );
    return response.data;
  },
  async getAdminCaseFilesbyId(id: string): Promise<any> {
    const response = await axiosInstance.get<any>(`admin/CaseFile/${id}`);
    console.log("single case details =>" + response.data);
    return response.data;
  },
  async deleteCaseFiles(id: string): Promise<any> {
    const response = await axiosInstance.delete<string>(`casefile/${id}`);
    console.log("single case details =>" + response.data);
    return response.data;
  },
  async changeCaseStatus(id: string, body: IChangeStatus): Promise<any> {
    const response = await axiosInstance.post<string>(
      `admin/casefile/change-case-status/${id}`,
      body
    );
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
  async costAssesment(id: string): Promise<any> {
    const response = await axiosInstance.get<any>(
      `casefile/cost-assessment/${id}`
    );
    console.log("cost assessment response", response.data);
    return response.data;
  },
  async patchCaseType({
    payload,
    caseTypeId,
  }: {
    payload: ICreateCaseFileData;
    caseTypeId: string;
  }): Promise<any> {
    const response = await axiosInstance.patch<ICreateCaseFileData>(
      `casetype/${caseTypeId}`,
      payload
    );

    return response.data;
  },
};

export default CaseFileService;
