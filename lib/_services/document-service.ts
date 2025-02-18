import { axiosInstance } from "../_api/axios-config";

interface UploadDocumentResponse {
  id: string;
  user_id: string;
  casefile_id: string;
  title: string;
  sub_title: string;
  case_type_name: string;
  sequence_number: string;
  file_path: string;
  file_type: string;
  amount: number;
  notes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const DocumentService = {
  async uploadDocument(formData: FormData): Promise<UploadDocumentResponse> {
    try {
      console.log("entering form data");
      const response = await axiosInstance.post<UploadDocumentResponse>(
        "/documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("responesss", response);
      return response.data;
    } catch (error) {
      console.error("Error uploading document:", (error as any).response.data);
      throw error;
    }
  },
  async updateDocument(formData: FormData): Promise<UploadDocumentResponse> {
    try {
      console.log("entering form data");
      const response = await axiosInstance.patch<UploadDocumentResponse>(
        "/documents/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("responesss", response);
      return response.data;
    } catch (error) {
      console.error("Error uploading document:", (error as any).response.data);
      throw error;
    }
  },
};

export default DocumentService;
