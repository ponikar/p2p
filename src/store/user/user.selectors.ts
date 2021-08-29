import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { selectStore } from "../store";

export const selectUser = createDraftSafeSelector(
  selectStore,
  (store) => store.user
);
