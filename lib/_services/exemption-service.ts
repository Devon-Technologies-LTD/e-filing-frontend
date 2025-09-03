import { authConfig } from "../_api/auth-config";
import { axiosInstance } from "../_api/axios-config";

const ExemptionService = {
    async createExemption(email: string) {
        return await axiosInstance.get("/admin/user/exempt-user/" + email);
    },
};

export default ExemptionService;
