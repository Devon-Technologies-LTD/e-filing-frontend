import { axiosInstance } from "../_api/axios-config";

const PaymentService = {
  async generateRRR(caseFileId: string, amount?: any): Promise<any> {
    try {
      const response = await axiosInstance.get<any>(
        `/transactions/generate-rrr/${caseFileId}`
      );
      return response ? response?.data : null;
    } catch (error) {
      throw error;
    }
  },
  async validatePayment(params: {
    reference: string;
    casefile_id: string;
    payment_method: string;
    exemption_code: string;
  }): Promise<any> {
    try {
      const response = await axiosInstance.post<any>(
        `/transactions/verify-transaction`,
        { ...params }
      );
      console.log("response from validating transaction", response?.data);
      return response ? response?.data : null;
    } catch (error) {
      console.error("Error verify payment:", (error as any).response.data);
      throw error;
    }
  },
  async validateExemption(params: {
    reference: string;
    casefile_id: string;
    payment_method: string;
  }): Promise<any> {
    try {
      const response = await axiosInstance.post<any>(
        `/transactions/verify-transaction`,
        { ...params }
      );
      console.log("response from validating transaction", response?.data);
      return response ? response?.data : null;
    } catch (error) {
      console.error("Error verify payment:", (error as any).response.data);
      throw error;
    }
  },
};

export default PaymentService;
