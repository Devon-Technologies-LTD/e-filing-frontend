import { CaseStatus } from "@/constants";
import { axiosInstance } from "../_api/axios-config";
import { TaddAdmin } from "@/lib/_definitions";
import { parseParameter } from "next/dist/shared/lib/router/utils/route-regex";
import { resetPassword } from "../actions/login";
import { getNotification } from "../actions/admin-file";

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
  division_id?: string;
  search?: string;
  court_type?: string;
  end_date?: string;
  start_date?: string;
  invited_by?: string;
  query?: string;
  usertype?: string;
  status?: string;
  sub_division?: string;
  courtype?: string;
  casetype?: string;
  user_id?: string;
  year?: string;
}

export interface INotificationFilter {
  id?: string | null;
  user_id?: string | null;
  title?: string | null;
  description?: string | null;
  case_id?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

interface IPage {
  page: number;
  size: number;
  role?: string;
  search?: string;
  court_division_id?: string;
  court_type?: string;
  end_date?: string;
  start_date?: string;
  invited_by?: string;
  query?: string;
  status?: string;
  sub_division?: string;
  user_id?: string;
  year?: string;
}

const UserService = {
  async getAllUser(): Promise<any> {
    const response = await axiosInstance.get(`admin/user`);

    return response.data;
  },
  async magistrateOversight(params: Ipage): Promise<any> {
    const response = await axiosInstance.get(
      `admin/analyitcs/magistrate-oversight`,
      {
        params: {
          page: params.page ?? 1,
          limit: params.size ?? 10,
          division_id: params.division_id,
          search: params.search,
          status: params.status,
          usertype: params.usertype,
          courtype: params.courtype,
        },
      }
    );
    return response.data;
  },
  async getPerformance(params: Ipage): Promise<any> {
    const response = await axiosInstance.get(
      `admin/analyitcs/magistrate-performance`,
      {
        params: {
          page: params.page ?? 1,
          limit: params.size ?? 10,
          division_id: params.division_id,
          search: params.search,
          usertype: params.usertype,
          casetype: params.casetype,
        },
      }
    );
    return response.data;
  },
  async caseMetric(): Promise<any> {
    const response = await axiosInstance.get(`admin/analyitcs/case-metrics`);
    return response.data;
  },
  async caseMetric2(): Promise<any> {
    const response = await axiosInstance.get(`admin/analyitcs/centrar-metrics`);
    return response.data;
  },
  async getCaseBreakDown(id: string): Promise<any> {
    const response = await axiosInstance.get(
      `admin/analyitcs/case-breakdown/${id}`
    );
    return response.data;
  },
  async getMagisterateBreakDown(id: string): Promise<any> {
    const response = await axiosInstance.get(
      `admin/analyitcs/magistrate-breakdown/${id}`
    );
    return response.data;
  },
  async getFinanceBreakDown(id: string): Promise<any> {
    const response = await axiosInstance.get(
      `admin/analyitcs/financial-breakdown/${id}`
    );
    return response.data;
  },
  async magistrateMetric(): Promise<any> {
    const response = await axiosInstance.get(
      `admin/analyitcs/magistrate-metrics`
    );
    return response.data;
  },
  async getFinancialMetric(): Promise<any> {
    const response = await axiosInstance.get(
      `admin/analyitcs/financial-metrics`
    );
    return response.data;
  },
  async getCaseDistribution(): Promise<any> {
    const response = await axiosInstance.get(
      `admin/analyitcs/case-distribution`
    );
    return response.data;
  },
  async getProfileCases(id: string): Promise<any> {
    const response = await axiosInstance.get(`admin/user/${id}/user-analytics`);
    return response.data;
  },
  async resetPassword(payload: any): Promise<any> {
    const response = await axiosInstance.post(`/auth/change-password`, payload);
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

  // async const getUserManagementFilter = async (params: IPage): Promise<any> => {
  async getUserManagementFilter(params: IPage): Promise<any> {
    try {
      const response = await axiosInstance.post(
        "/admin/user/user-filter",
        params
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching user management filter:", error);
      throw error;
    }
  },
  async getUserCase(params: IPage): Promise<any> {
    try {
      const response = await axiosInstance.get("/admin/user/user-case");
      return response.data;
    } catch (error) {
      console.error("Error fetching user case filter:", error);
      throw error;
    }
  },

  async getPendingUsers(params: Ipage): Promise<any> {
    const { page, size, ...filteredParams } = params;
    const response = await axiosInstance.post(
      `admin/user/user-filter?page=${page}&size=${size}`,
      filteredParams
    );
    console.log("pending users management response", response.data);
    return response.data;
  },
  async addUserManagement(payload: any) {
    const response = await axiosInstance.post(`admin/user`, payload);
    return response.data;
  },

  async getNotification(): Promise<any> {
    const response = await axiosInstance.get<INotificationFilter>(
      `notification/`
    );
    return response.data;
  },

  async updateNotification(id: string): Promise<any> {
    const response = await axiosInstance.patch<INotificationFilter>(
      `notification/${id}`
    );
    return response.data;
  },

  async getVerification(): Promise<any> {
    const response = await axiosInstance.get<INotificationFilter>(
      `verification/`
    );
    return response.data;
  },
  async getVerificationAdmin(): Promise<any> {
    const response = await axiosInstance.get<INotificationFilter>(
      `admin/verification/`
    );
    return response.data;
  },
};

export default UserService;
