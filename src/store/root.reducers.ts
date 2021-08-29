import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.slices";




export const rootReducers = combineReducers({
    user: userReducer
});