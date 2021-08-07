import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./user/user.slices"

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const selectStore = (store: RootState): RootState => store
