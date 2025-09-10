import { axiosInstance } from "../_api/axios-config";

const ExemptionService = {
    async createExemption(email: string) {
        return await axiosInstance.get("/admin/user/exempt-user/" + email);
    },
    async getExemption() {
        return await axiosInstance.get("/admin/user/fetch-exempt-user");
    },
};

export default ExemptionService;
