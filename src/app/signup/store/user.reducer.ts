import { createReducer, on } from "@ngrx/store";
import { User } from "../interface/user";
import { addUser, loadUsers, updateUser, deleteUser } from './user.actions';

export interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => state),
  on(addUser, (state, { user }) => ({
      ...state,
      users: [...state.users, { ...user, id: state.users.length + 1 }]
  })),
  on(updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => u.id === user.id ? user : u)
  })),
  on(deleteUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId)
  }))
);

