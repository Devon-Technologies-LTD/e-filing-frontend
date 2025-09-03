'use server';
import ExemptionService from "../_services/exemption-service";
import { handleApiError } from "../utils";


export async function createExemption(
    email: string
) {
    try {
        const data = await ExemptionService.createExemption(email);
        return { ...data, success: true };
    } catch (err) {
        console.log(err);
        return handleApiError(err);
    }
}
