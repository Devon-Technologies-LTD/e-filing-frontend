import { axiosInstance } from "../_api/axios-config";

const PaymentService = {
  async generateRRR(caseFileId: string, amount?: any): Promise<any> {
    try {
      const response = await axiosInstance.get<any>(
        `/transactions/generate-rrr/${caseFileId}/${amount}`
      );
      console.log("response from genreatingsss rrr", response?.data);
      return response ? response : null;
    } catch (error) {
      console.error("Error paymentsss:", (error as any).response.data);
      throw error;
    }
  },
};

export default PaymentService;
