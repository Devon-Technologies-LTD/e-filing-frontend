import { CaseStatus, CaseTypeData } from "@/constants";
import { axiosInstance } from "../_api/axios-config";

export interface IscheduleCase {
    casefile_id?: string;
    hearing_date?: Date;
    hearing_time?: Date;
    other_details?: string;
}


const CaseActionService = {
    async scheduleHearing(payload: IscheduleCase, id: string): Promise<any> {
        const response = await axiosInstance.post<IscheduleCase>(
            `admin/casefile/schedule-hearing/${id}`,
            payload
        );
        return response.data;
    },
    async requestReAssigment(payload: any, id: string): Promise<any> {
        const response = await axiosInstance.post<any>(`/admin/casefile/request-resassignment/${id}`,
            payload
        );
        return response.data;
    },
    async caseRequest(payload: any, id: string): Promise<any> {
        const response = await axiosInstance.post<any>(`/admin/casefile/request-case/${id}`,
            payload
        );
        return response.data;
    },
    async deliverJudgement(payload: any, id: string): Promise<any> {
        console.log("This is a payload == >" + payload);
        const response = await axiosInstance.post<any>(`/admin/casefile/deliver-judgement/${id}`,
            payload
        );
        return response.data;
    },
    async getSingleCaseHistory(id: string): Promise<any> {
        const response = await axiosInstance.get<any>(`/admin/casefile/case-hearings?id=${id}`);
        console.log("response => " + response);
        return response.data;
    },
    async reassignmentHistory(id: string): Promise<any> {
        const response = await axiosInstance.get<any>(`/admin/casefile/reassignment-history/${id}`);
        return response.data;
    },
    async CaseAssignment(payload: any, id: string): Promise<any> {
        const response = await axiosInstance.put<any>(`/admin/casefile/assign-case/${id}`,
            payload);
        return response.data;
    },

};

export default CaseActionService;
