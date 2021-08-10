import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.type";

interface UserSliceProps extends UserType {
  isLoading: boolean;
}

const USER_INTIAL_STATE: UserSliceProps = {
  email: "",
  displayName: "",
  uid: "",
  isLoading: true,
};

const userSlices = createSlice({
  name: "user",
  initialState: USER_INTIAL_STATE,
  reducers: {
    addUser: (state, { payload }: PayloadAction<UserType>) => {
      return { ...payload, isLoading: false };
    },
    removeUser: (_) => ({ ...USER_INTIAL_STATE, isLoading: false }),
  },
});

export const {
  actions: { addUser, removeUser },
  reducer,
} = userSlices;

export const userReducer = reducer;
