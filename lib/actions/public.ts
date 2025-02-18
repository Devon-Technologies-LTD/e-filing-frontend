"use server";
import PublicApis from "../_services/constants.service";

export async function getCaseTypes() {
  console.log("getting casessssss initiated");
  try {
    const data = await PublicApis.getAllTypes();
    return data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error creating case file:", error.response.data);
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
      };
    } else if (error?.message) {
      return { status: 500, message: error.message, errors: error.message };
    } else {
      return {
        status: 500,
        message: "An unknown error occurred.",
        errors: "Unknown error",
      };
    }
  }
}
