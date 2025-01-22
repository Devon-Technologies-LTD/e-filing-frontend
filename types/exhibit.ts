export interface Exhibit {
  id: number;
  title: string;
  file?: File;
  fileName?: string;
}

export type AcceptedFileType = "PNG" | "PDF" | "DOC" | "JPEG" | "JPG";

export const ACCEPTED_FILE_TYPES: AcceptedFileType[] = [
  "PNG",
  "PDF",
  "DOC",
  "JPEG",
  "JPG",
];
