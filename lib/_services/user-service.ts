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

const UserService = {
  async getUserManagement(): Promise<any> {
    const response = await axiosInstance.get(`admin/user`);
    console.log("user management response", response.data);
    return response.data;
  },
  async addUserManagement(payload: any)  {
    const response = await axiosInstance.post(`admin/user`, payload);
    console.log("user management response", response.data);
    return response.data;
  },

  // async getMenu(menu_id: string) {
  //   return await userConfig.get(`/dishes/${menu_id}`)
  // },

  // async uploadImage(id: string, formData: FormData) {
  //   return await userConfig.patch(`/staffs/upload_passport/${id}`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  // },

  // async updateStaffStatus(id: string, payload: TActivatorPayload) {
  //   return await userConfig.patch(`/staffs/activate/${id}`, payload)
  // },
}

export default UserService
