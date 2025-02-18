import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDocumentFileType {
  id: string;
  user_id: string;
  casefile_id: string;
  title: string;
  sub_title: string;
  case_type_name: string;
  sequence_number: string;
  file_path?: string;
  file_type?: string;
  amount?: number;
  notes?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface CaseFileState {
  case_file_id: string;
  court_division: string;
  claimant_address: string;
  claimant_phone_number: string;
  claimant_name: string;
  claimant_email_address: string;
  claimant_whats_app: string;
  defendant_name: string;
  defendant_address: string;
  defendant_whats_app: string;
  defendant_email_address: string;
  defendant_phone_number: string;
  title: string;
}

export interface ICaseTypes {
  case_type_id?: string;
  case_type: string;
  sub_case_type: string;
  direct_complain: string;
  value_worth: string;
  property_description: string;
  rental_value: string;
  relief_sought: string;
  dated_this: Date | undefined;
  cost_claimed: string;
  sum_claimed: string;
  interest_claimed: string;
  summon_court_description: string;
  summon_state_location: string;
  summon_time: string;
  summon_date: string;
  notes: string;
  recovery_amount: string;
  registrar: string;
}

export interface ILegalCounsels {}

interface FormState {
  current_step: number;
  caseFile: CaseFileState;
  legal_counsels: ILegalCounsels[];
  caseType: ICaseTypes;
  documents: IDocumentFileType[];
  otherDocuments: IDocumentFileType[];
  exhibits: IDocumentFileType[];
  submittedExhibitsDocument: IDocumentFileType[];
  civilCaseDocuments: IDocumentFileType[];
  criminalCaseDocuments: IDocumentFileType[];
  familyCaseDocuments: IDocumentFileType[];
  caseFileErrors: Partial<Record<keyof CaseFileState, string>>;
}

const initialState: FormState = {
  current_step: 1,
  caseFile: {
    court_division: "",
    claimant_address: "",
    claimant_name: "",
    claimant_whats_app: "",
    claimant_email_address: "",
    claimant_phone_number: "",
    defendant_name: "",
    defendant_address: "",
    defendant_whats_app: "",
    defendant_email_address: "",
    defendant_phone_number: "",
    title: "",
    case_file_id: "",
  },
  caseFileErrors: {},
  caseType: {
    case_type: "",
    sub_case_type: "",
    direct_complain: "",
    value_worth: "",
    property_description: "",
    rental_value: "",
    relief_sought: "",
    dated_this: undefined,
    cost_claimed: "",
    sum_claimed: "",
    interest_claimed: "",
    summon_court_description: "",
    summon_state_location: "",
    summon_time: "",
    summon_date: "",
    notes: "",
    registrar: "",
    recovery_amount: "",
  },
  legal_counsels: [],
  civilCaseDocuments: [],
  familyCaseDocuments: [],
  criminalCaseDocuments: [],
  otherDocuments: [],
  submittedExhibitsDocument: [],
  exhibits: [
    {
      title: "",
      sub_title: "",
      case_type_name: "",
      casefile_id: "",
      id: "1",
      status: "",
      sequence_number: "",
      user_id: "",
    },
  ],
  documents: [],
};

const formSlice = createSlice({
  name: "case-filing-form",
  initialState,
  reducers: {
    updateCaseFileField: (
      state,
      action: PayloadAction<{ field: keyof CaseFileState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.caseFile[field] = value;
    },
    updateLegalCounsels: (state, action: any) => {
      state.legal_counsels = action.payload;
    },
    updateMultipleCaseFileFields: (
      state,
      action: PayloadAction<{ fields: Partial<CaseFileState> }>
    ) => {
      Object.assign(state.caseFile, action.payload.fields);
    },
    updateMultipleCaseTypeFields: (
      state,
      action: PayloadAction<{ fields: Partial<ICaseTypes> }>
    ) => {
      Object.assign(state.caseType, action.payload.fields);
    },
    addCaseFileError: (
      state,
      action: PayloadAction<Partial<Record<keyof CaseFileState, string>>>
    ) => {
      const tempErrors = action.payload;
      state.caseFileErrors = { ...state.caseFileErrors, ...tempErrors };
    },
    clearCaseFile: (state) => {
      state.caseFile = initialState.caseFile;
    },
    clearCaseType: (state) => {
      state.caseType = initialState.caseType;
    },
    clearCaseFileError: (state) => {
      state.caseFileErrors = initialState.caseFileErrors;
    },
    updateStep: (state, action: PayloadAction<number>) => {
      state.current_step = action.payload;
    },
    updateCaseTypeName: (state, action: PayloadAction<Partial<ICaseTypes>>) => {
      const updatedFields = action.payload;
      state.caseType = { ...state.caseType, ...updatedFields };
    },
    resetStep: (state) => {
      state.current_step = initialState.current_step;
    },
    markForDeletion: (state, action: PayloadAction<string>) => {
      const doc = state.documents.find((d) => d.id === action.payload);
      if (doc) doc.status = "to_be_deleted";
    },
    addDocument: (state, action: PayloadAction<IDocumentFileType>) => {
      state.documents.push(action.payload);
    },
    updateDocument: (
      state,
      action: PayloadAction<Partial<IDocumentFileType> & { id: string }>
    ) => {
      const index = state.documents.findIndex(
        (d) => d.id === action.payload.id
      );
      if (index >= 0) {
        state.documents[index] = {
          ...state.documents[index],
          ...action.payload,
        };
      }
    },
    updateFamilyCaseDocument: (
      state,
      action: PayloadAction<IDocumentFileType>
    ) => {
      const existingIndex = state.familyCaseDocuments.findIndex(
        (d) => d.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.familyCaseDocuments[existingIndex] = action.payload;
      } else {
        state.familyCaseDocuments.push(action.payload);
      }
    },
    updateOtherDocument: (state, action: PayloadAction<IDocumentFileType>) => {
      const existingIndex = state.otherDocuments.findIndex(
        (d) => d.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.otherDocuments[existingIndex] = action.payload;
      } else {
        state.otherDocuments.push(action.payload);
      }
    },
    removeFamilyCaseDocument: (state, action: PayloadAction<string>) => {
      state.familyCaseDocuments = state.familyCaseDocuments.filter(
        (d) => d.id !== action.payload
      );
    },
    removeOtherDocument: (state, action: PayloadAction<string>) => {
      state.familyCaseDocuments = state.familyCaseDocuments.filter(
        (d) => d.id !== action.payload
      );
    },
    updateCriminalCaseDocument: (
      state,
      action: PayloadAction<IDocumentFileType>
    ) => {
      const existingIndex = state.criminalCaseDocuments.findIndex(
        (d) => d.title === action.payload.title
      );
      if (existingIndex !== -1) {
        state.criminalCaseDocuments[existingIndex] = action.payload;
      } else {
        state.criminalCaseDocuments.push(action.payload);
      }
    },
    replaceCriminalCaseDocument: (
      state,
      action: PayloadAction<IDocumentFileType[]>
    ) => {
      state.criminalCaseDocuments = action.payload;
    },
    replaceCivilCaseDocument: (
      state,
      action: PayloadAction<IDocumentFileType[]>
    ) => {
      state.civilCaseDocuments = action.payload;
    },
    replaceFamilyCaseDocument: (
      state,
      action: PayloadAction<IDocumentFileType[]>
    ) => {
      state.familyCaseDocuments = action.payload;
    },
    replaceExhibitsCaseDocument: (
      state,
      action: PayloadAction<IDocumentFileType[]>
    ) => {
      state.submittedExhibitsDocument = action.payload;
      state.exhibits = action.payload;
    },
    replaceOtherDocuments: (
      state,
      action: PayloadAction<IDocumentFileType[]>
    ) => {
      state.otherDocuments = action.payload;
    },
    updateCivilCaseDocument: (
      state,
      action: PayloadAction<IDocumentFileType>
    ) => {
      const existingIndex = state.civilCaseDocuments.findIndex(
        (d) => d.title === action.payload.title
      );
      if (existingIndex !== -1) {
        state.civilCaseDocuments[existingIndex] = action.payload;
      } else {
        state.civilCaseDocuments.push(action.payload);
      }
    },
    updateSubmittedExhibitsDocument: (
      state,
      action: PayloadAction<IDocumentFileType>
    ) => {
      const existingIndex = state.submittedExhibitsDocument.findIndex(
        (d) => d.title === action.payload.title
      );
      if (existingIndex !== -1) {
        state.submittedExhibitsDocument[existingIndex] = action.payload;
      } else {
        state.submittedExhibitsDocument.push(action.payload);
      }
    },
    addExhibit: (state) => {
      state.exhibits.push({
        id: crypto.randomUUID(),
        title: "",
        sub_title: "",
        case_type_name: "",
        casefile_id: "",
        status: "",
        sequence_number: "",
        user_id: "",
      });
    },
    removeExhibit: (state, action: PayloadAction<string>) => {
      state.exhibits = state.exhibits.filter(
        (exhibit) => exhibit.id !== action.payload
      );
    },
    updateExhibitTitle: (
      state,
      action: PayloadAction<{ exhibitId: string; title: string }>
    ) => {
      const exhibit = state.exhibits.find(
        (ex) => ex.id === action.payload.exhibitId
      );
      if (exhibit) {
        exhibit.title = action.payload.title;
      }
    },
    updateExhibitDocument: (
      state,
      action: PayloadAction<{ exhibitId: string; document: any; title: string }>
    ) => {
      state.exhibits = state.exhibits.map((exhibit) =>
        exhibit.id === action.payload.exhibitId
          ? {
              ...exhibit,
              document: action.payload.document,
              title: action.payload.title,
            }
          : exhibit
      );
    },
    removeAllCriminalCaseDocument: (state) => {
      state.criminalCaseDocuments = initialState.criminalCaseDocuments;
    },
    clearForm: (state) => {
      state.current_step = initialState.current_step;
      state.caseFile = initialState.caseFile;
      state.caseFileErrors = initialState.caseFileErrors;
      state.caseType = initialState.caseType;
      state.legal_counsels = initialState.legal_counsels;
      state.documents = initialState.documents;
      state.otherDocuments = initialState.otherDocuments;
      state.exhibits = initialState.exhibits;
      state.submittedExhibitsDocument = initialState.submittedExhibitsDocument;
      state.civilCaseDocuments = initialState.civilCaseDocuments;
      state.criminalCaseDocuments = initialState.criminalCaseDocuments;
      state.familyCaseDocuments = initialState.familyCaseDocuments;
    },
  },
});

export const {
  updateCaseFileField,
  updateLegalCounsels,
  updateFamilyCaseDocument,
  updateCivilCaseDocument,
  addExhibit,
  removeExhibit,
  updateExhibitTitle,
  updateExhibitDocument,
  updateOtherDocument,
  removeFamilyCaseDocument,
  removeOtherDocument,
  addCaseFileError,
  clearCaseFile,
  clearCaseFileError,
  updateStep,
  updateCaseTypeName,
  resetStep,
  markForDeletion,
  addDocument,
  clearForm,
  updateDocument,
  updateCriminalCaseDocument,
  removeAllCriminalCaseDocument,
  updateSubmittedExhibitsDocument,
  clearCaseType,
  updateMultipleCaseFileFields,
  updateMultipleCaseTypeFields,
  replaceCriminalCaseDocument,
  replaceCivilCaseDocument,
  replaceOtherDocuments,
  replaceExhibitsCaseDocument,
  replaceFamilyCaseDocument
} = formSlice.actions;
export default formSlice.reducer;
