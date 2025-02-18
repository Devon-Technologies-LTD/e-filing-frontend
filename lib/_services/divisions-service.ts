import { axiosInstance } from "../_api/axios-config";

export interface IDivision {
  id: string;
  title: string;
  sub_division: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface IDivisionResponse {
  total_rows: number;
  total_pages: number;
  size: number;
  page: number;
  data: IDivision[];
}

const DivisionsService = {
  async getUserDivision(): Promise<IDivisionResponse> {
    const response = await axiosInstance.get<IDivisionResponse>(
      `/user/division`
    );
    return response.data;
  },
};

export default DivisionsService;
