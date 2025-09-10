import { Claimant } from "@/components/case-filing/hooks";
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
  exemption_code?: string;
  updated_at?: string;
}

export interface ICaseTypes {
  case_file_id: string;
  reference?: string;
  claimant: Partial<Claimant>[];
  defendant: Partial<Claimant>[];
  court_division: string;
  sub_division: string;
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
  exemption_code: string;
}

export interface ILegalCounsels { }

interface FormState {
  current_step: number;
  paymentType: string;
  exemption_code: string;

  legal_counsels: ILegalCounsels[];
  caseType: ICaseTypes;
  totalAmount: number;
  documents: IDocumentFileType[];
  caseTypeErrors: any;
}

const initialState: FormState = {
  current_step: 1,
  totalAmount: 0,
  caseTypeErrors: {},
  paymentType: "remita",
  caseType: {
    claimant: [
      {
        id: crypto.randomUUID(),
        phone_number: "",
        email_address: "",
        address: "",
        first_name: "",
        honorific: "",
        last_name: "",
        middle_name: "",
        whatsapp: "",
      },
    ],
    defendant: [
      {
        id: crypto.randomUUID(),
        phone_number: "",
        email_address: "",
        address: "",
        first_name: "",
        honorific: "",
        last_name: "",
        middle_name: "",
        whatsapp: "",
      },
    ],
    court_division: "",
    sub_division: "",
    reference: "",
    counsel_name: "",
    title: "",
    case_file_id: "",
    exemption_code: "",
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
  exemption_code: ""
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
    addCaseTypeError: (state, action: PayloadAction<any>) => {
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
      if (!state.documents) {
        state.documents = [];
      }
      const index = state?.documents?.findIndex(
        (d) =>
          d.title.toLowerCase() === action.payload.title.toLowerCase() &&
          d.sub_title.toLowerCase() === action.payload.sub_title.toLowerCase()
      );
      if (index !== -1) {
        state.documents[index] = action.payload;
      } else {
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

    clearForm: () => {
      // state.current_step = initialState.current_step;
      // state.caseType = initialState.caseType;
      // state.legal_counsels = initialState.legal_counsels;
      // state.documents = initialState.documents;
      return initialState;
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
