import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";
import { User } from "../interface/user";

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);