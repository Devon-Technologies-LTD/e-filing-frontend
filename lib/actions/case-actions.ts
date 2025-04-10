"use server";
import CaseActionService, { IscheduleCase } from "../_services/case-action";

import { handleApiError2 } from "../utils";


type ErrorResponse = {
    response?: {
        status: number;
        data: {
            message: string;
            data?: { error?: string };
            error: string;
        };
    };
    request?: unknown;
    message?: string;
};

export async function createCaseFile(payload: any, id: string) {
    try {
        const data = await CaseActionService.scheduleHearing(payload, id);
        console.log(data);
        return { ...data, success: true };
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        return handleApiError2(error);
    }
}
export async function requestReAssigment(payload: any, id: string) {
    try {
        const data = await CaseActionService.requestReAssigment(payload, id);
        console.log(data);
        return { ...data, success: true };
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        return handleApiError2(error);
    }
}
export async function caseRequest(payload: any, id: string) {
    try {
        const data = await CaseActionService.caseRequest(payload, id);
        console.log(data);
        return { ...data, success: true };
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        return handleApiError2(error);
    }
}
export async function deliverJudgement(payload: any, id: string) {
    try {
        console.log("This is a payload == >" + payload);
        const data = await CaseActionService.deliverJudgement(payload, id);
        console.log(data);
        return { ...data, success: true };
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        return handleApiError2(error);
    }
}
export async function getSingleCaseHistory(id: string) {
    try {
        const data = await CaseActionService.getSingleCaseHistory(id);
        console.log("getSingleCaseHistory =>" + data);
        return { ...data, success: true };
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        return handleApiError2(error);
    }
}
export async function reassignmentHistory(id: string) {
    try {
        const data = await CaseActionService.reassignmentHistory(id);
        console.log("REassignment histrory =>" + data);
        return { ...data, success: true };
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        return handleApiError2(error);
    }
}
export async function CaseAssignment(payload: any, id: string) {
    try {
        const data = await CaseActionService.CaseAssignment(payload, id);
        console.log(data);
        return { ...data, success: true };
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        return handleApiError2(error);
    }
}
