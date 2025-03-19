import { axiosInstance } from "../_api/axios-config";

export interface ICaseTypesResponse {
  ID: number;
  Title: string;
  Description: string;
}

const PublicApis = {
  async getCaseTypes(): Promise<ICaseTypesResponse[]> {
    const response = await axiosInstance.get<ICaseTypesResponse[]>(
      `/public/casetype-category`
    );
    return response.data;
  },
  async getSubCaseTypes(type: string): Promise<ICaseTypesResponse[]> {
    const response = await axiosInstance.get<ICaseTypesResponse[]>(
      `/public/subcase-category/${type}`
    );
    return response.data;
  },
  async getWorth(payload: { type: string }): Promise<ICaseTypesResponse[]> {
    const response = await axiosInstance.get<ICaseTypesResponse[]>(
      `/public/recovery-worth`,
      {
        params: payload,
      }
    );
    return response.data;
  },

  async getDocumentFees(): Promise<any> {
    const response = await axiosInstance.get<any>(`/public/document-fees`);
    return response.data;
  },
  async getOtherDocumentsByCaseType(
    case_type: string,
    category: String
  ): Promise<any> {
    const response = await axiosInstance.get<any>(
      `/public/casetype-documents/${case_type}/${category}`
    );
    return response.data;
  },
};

export default PublicApis;
