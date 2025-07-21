// redux/slices/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "./profile-slice"
import caseFileFormReducer from "./case-filing-slice";

const rootReducer = combineReducers({
  profile: profileReducer,
  caseFileForm: caseFileFormReducer,
});

export default rootReducer;
