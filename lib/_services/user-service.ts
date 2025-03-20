import { CaseStatus } from "@/constants";
import { axiosInstance } from "../_api/axios-config";
import {
  TaddAdmin,
} from "@/lib/_definitions";


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
export interface Ipage {
  page?: number;
  size?: number;
  role?: string;
  court_division_id?: string;
  search?: string;
}

const UserService = {
  async getAllUser(): Promise<any> {
    const response = await axiosInstance.get(`admin/user`);
    console.log(response.data);
    return response.data;
  },
  async magistrateOversight(): Promise<any> {
    const response = await axiosInstance.get(`admin/analyitcs/magistrate-oversight`);
    return response.data;
  },
  async caseMetric(): Promise<any> {
    const response = await axiosInstance.get(`admin/analyitcs/case-metrics`);
    return response.data;
  },
  async getCaseBreakDown(id: string): Promise<any> {
    const response = await axiosInstance.get(`admin/analyitcs/case-breakdown/${id}`);
    return response.data;
  },
  async getMagisterateBreakDown(id: string): Promise<any> {
    const response = await axiosInstance.get(`admin/analyitcs/magistrate-breakdown/${id}`);
    return response.data;
  },
  async magistrateMetric(): Promise<any> {
    const response = await axiosInstance.get(`admin/analyitcs/magistrate-metrics`);
    return response.data;
  },
  async getCaseDistribution(): Promise<any> {
    const response = await axiosInstance.get(`admin/analyitcs/case-distribution`);
    return response.data;
  },

  async getUserManagement(params: Ipage): Promise<any> {
    const response = await axiosInstance.get(`admin/user/`, {
      params: {
        page: params.page,
        limit: params.size,
        role: params.role,
        search: params.search,
        court_division_id: params.court_division_id,
      },
    });
    return response.data;
  },

  async getPendingUsers(params: Ipage): Promise<any> {
    const response = await axiosInstance.get(`admin/user/filter-user/pending`, {
      params: {
        page: params.page ?? 1,
        limit: params.size ?? 10,
      },
    });
    console.log("pending users management response", response.data);
    return response.data;
  },

  async addUserManagement(payload: any) {
    const response = await axiosInstance.post(`admin/user`, payload);
    return response.data;
  },

}

export default UserService
