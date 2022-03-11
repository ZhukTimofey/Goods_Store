import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userStoreReducer from "../App/UserStore";

export const store = configureStore({
  reducer: { userStore: userStoreReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
