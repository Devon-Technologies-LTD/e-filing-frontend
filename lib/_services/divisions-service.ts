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
    const response = await axiosInstance.get<IDivision[]>(`/division`);
    return response.data;
  },
  async getTitles(): Promise<any[]> {
    const response = await axiosInstance.get<string[]>(`public/honorific`);
    return response.data;
  },
  async getAdminDivision(): Promise<IDivision[]> {
    const response = await axiosInstance.get<IDivision[]>(`admin/division `);
    return response.data;
  },
  async getAdminSubDivision(id: string): Promise<any[]> {
    const response = await axiosInstance.get<any[]>(
      `/admin/division/sub-division/${id}`
    );
    return response.data;
  },
};

export default DivisionsService;
