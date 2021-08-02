import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.type";

const USER_INTIAL_STATE: UserType = {
  email: "",
  displayName: "",
  uid: "Wl8Arm0jC8fPK4w48YoVg19wdhz1",
};

const userSlices = createSlice({
  name: "user",
  initialState: USER_INTIAL_STATE,
  reducers: {
    addUser: (state, { payload }: PayloadAction<UserType>) => {
      return payload;
    },
    removeUser: _ => USER_INTIAL_STATE
  },
});

export const {
  actions: { addUser, removeUser },
  reducer,
} = userSlices;

export const userReducer = reducer;
