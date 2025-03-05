import { axiosInstance } from "../_api/axios-config";

export interface IDivision {
  id: string;
  title: string;
  sub_division: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const DivisionsService = {
  async getUserDivision(): Promise<IDivision[]> {
    const response = await axiosInstance.get<IDivision[]>(`/user/division`);
    console.log("division dataaaaa", response.data);
    return response.data;
  },
  async getAdminDivision(): Promise<IDivision[]> {
    const response = await axiosInstance.get<IDivision[]>(`/admin/division`);
    console.log("division dataaaaa", response.data);
    return response.data;
  },
};

export default DivisionsService;
