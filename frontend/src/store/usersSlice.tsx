// store/usersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersStore } from "./types/usersStore";

const initialState: UsersStore = { refreshUsers: false };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setRefreshUsers(state, action: PayloadAction<boolean>) {
      state.refreshUsers = action.payload;
    },
  },
});

export const { setRefreshUsers } = usersSlice.actions;
export default usersSlice.reducer;
