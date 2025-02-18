export interface Exhibit {
  id: number;
  title: string;
  file?: File;
  fileName?: string;
}
export interface DocumentFileType {
  id: string;
  type: string;
  file: File | null;
}
export type AcceptedFileType = "PNG" | "PDF" | "DOC" | "JPEG" | "JPG";

export const ACCEPTED_FILE_TYPES: AcceptedFileType[] = [
  "PNG",
  "PDF",
  "DOC",
  "JPEG",
  "JPG",
];
