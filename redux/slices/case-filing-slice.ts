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
    addDocument: (state, action: PayloadAction<IDocumentFileType[]>) => {
      state.documents = action.payload;
    },
    updateDocument: (state, action: PayloadAction<IDocumentFileType>) => {
      const index = state.documents.findIndex(
        (d) => d.title === action.payload.title
      );
      if (index !== -1) {
        state.documents[index] = action.payload;
      } else {
        state.documents.push(action.payload);
      }
    },
    deleteDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(
        (document) => document.title !== action.payload
      );
    },

    clearForm: (state) => {
      state.current_step = initialState.current_step;
      state.caseFile = initialState.caseFile;
      state.caseFileErrors = initialState.caseFileErrors;
      state.caseType = initialState.caseType;
      state.legal_counsels = initialState.legal_counsels;
      state.documents = initialState.documents;
    },
  },
});

export const {
  updateCaseFileField,
  updateLegalCounsels,
  addCaseFileError,
  clearCaseFile,
  clearCaseFileError,
  updateStep,
  updateCaseTypeName,
  resetStep,
  addDocument,
  clearForm,
  updateDocument,
  clearCaseType,
  updateMultipleCaseFileFields,
  updateMultipleCaseTypeFields,
  deleteDocument,
} = formSlice.actions;
export default formSlice.reducer;
