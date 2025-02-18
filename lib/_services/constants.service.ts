import { axiosInstance } from "../_api/axios-config";

interface IDivisionResponse {
  case_type: string;
  sub_case_types: string[];
}

const PublicApis = {
  async getAllTypes(): Promise<IDivisionResponse[]> {
    const response = await axiosInstance.get<IDivisionResponse[]>(
      `/public/casetype`
    );
    return response.data;
  },
};

export default PublicApis;
