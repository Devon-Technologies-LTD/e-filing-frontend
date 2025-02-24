import { axiosInstance } from "../_api/axios-config";

interface IDivisionResponse {
  case_type: string;
  sub_case_types: string[];
}
interface documentFee {
  id: string;
  title: string;
  case_type: string;
  fee: string;
  CreatedAt: string;
  UpdatedAt: string;
  UpdatedBy: string;
}
const PublicApis = {
  async getAllTypes(): Promise<IDivisionResponse[]> {
    const response = await axiosInstance.get<IDivisionResponse[]>(
      `/public/casetype`
    );
    return response.data;
  },
  async getDocumentFees(): Promise<documentFee[]> {
    const response = await axiosInstance.get<documentFee[]>(
      `/public/document-fees`
    );
    return response.data;
  },
};

export default PublicApis;
