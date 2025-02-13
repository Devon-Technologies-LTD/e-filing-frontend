import { TUser } from "@/lib/_definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  data: TUser | undefined;
}

const initialState: ProfileState = {
  data: undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<TUser>) {
      state.data = action.payload;
    },
    clearProfile() {
      return initialState;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
