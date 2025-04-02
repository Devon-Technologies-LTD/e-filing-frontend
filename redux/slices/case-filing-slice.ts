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

export interface ICaseTypes {
  case_file_id: string;
  reference?: string;
  court_division: string;
  claimant_address: string;
  claimant_phone_number: string;
  claimant_name: string;
  claimant_email_address: string;
  sub_division: string;
  claimant_whats_app: string;
  defendant_name: string;
  defendant_address: string;
  defendant_whats_app: string;
  defendant_email_address: string;
  defendant_phone_number: string;
  title: string;
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
  signature?: string;
  witness?: string;
  plaintParticulars?: string;
  exparte?: string;
  firDoc?: string;
  familyDoc?: string;
  interpleader?: string;
  originating?: string;
  counsel_name: string;
}

export interface ILegalCounsels {}

interface FormState {
  current_step: number;
  paymentType: string;
  legal_counsels: ILegalCounsels[];
  caseType: ICaseTypes;
  totalAmount: number;
  documents: IDocumentFileType[];
  caseTypeErrors: Partial<Record<keyof ICaseTypes, string>>;
}

const initialState: FormState = {
  current_step: 1,
  totalAmount: 0,
  caseTypeErrors: {},
  paymentType: "remita",
  caseType: {
    court_division: "",
    sub_division: "",
    reference: "",
    counsel_name: "",
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
    case_type: "",
    sub_case_type: "",
    direct_complain: "",
    value_worth: "",
    property_description: "",
    rental_value: "",
    relief_sought: "",
    dated_this: new Date(),
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
    updateLegalCounsels: (state, action: any) => {
      state.legal_counsels = action.payload;
    },
    updatePaymentType: (state, action: PayloadAction<string>) => {
      state.paymentType = action.payload;
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
    updateMultipleCaseTypeFields: (
      state,
      action: PayloadAction<{ fields: Partial<ICaseTypes> }>
    ) => {
      Object.assign(state.caseType, action.payload.fields);
    },
    addCaseTypeError: (
      state,
      action: PayloadAction<Partial<Record<keyof ICaseTypes, string>>>
    ) => {
      const tempErrors = action.payload;
      state.caseTypeErrors = { ...state.caseTypeErrors, ...tempErrors };
    },
    clearCaseTypeError: (state) => {
      state.caseTypeErrors = initialState.caseTypeErrors;
    },
    clearCaseType: (state) => {
      state.caseType = initialState.caseType;
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
      console.log("action payload", action.payload);
      if (!state.documents) {
        state.documents = [];
      }
      const index = state?.documents?.findIndex(
        (d) =>
          d.title.toLowerCase() === action.payload.title.toLowerCase() &&
          d.sub_title.toLowerCase() === action.payload.sub_title.toLowerCase()
      );
      if (index !== -1) {
        console.log("should replace");
        state.documents[index] = action.payload;
      } else {
        console.log("should update");
        state.documents?.push(action.payload);
      }
    },
    deleteDocument: (
      state,
      action: PayloadAction<{ title: string; subCase: string }>
    ) => {
      state.documents = state.documents?.filter(
        (document) =>
          !(
            document.title.toLowerCase() ===
              action.payload.title.toLowerCase() &&
            document.sub_title.toLowerCase() ===
              action.payload.subCase.toLowerCase()
          )
      );
    },

    clearForm: (state) => {
      state.current_step = initialState.current_step;
      state.caseType = initialState.caseType;
      state.legal_counsels = initialState.legal_counsels;
      state.documents = initialState.documents;
    },
  },
});

export const {
  updateLegalCounsels,
  updateStep,
  updateCaseTypeName,
  updatePaymentType,
  resetStep,
  addDocument,
  clearForm,
  updateDocument,
  clearCaseType,
  updateMultipleCaseTypeFields,
  deleteDocument,
  addCaseTypeError,
  clearCaseTypeError,
  setTotalAmount,
} = formSlice.actions;
export default formSlice.reducer;
