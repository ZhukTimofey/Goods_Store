import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStore } from "../types/types";
import axios from "axios";

export const login = createAsyncThunk(
  "api/login",
  async (user: { username: string; password: string }) => {
    const resp = await axios.post("api/login", user);
    return resp.data;
  }
);
interface userStoreState {
  user: UserStore;
  loading: boolean;
  errors: null | {};
}

const initialState: userStoreState = {
  user: {} as UserStore,
  loading: false,
  errors: null,
};

export const userStoreSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export default userStoreSlice.reducer;
