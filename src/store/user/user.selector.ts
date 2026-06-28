import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "@/store/store";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser
);

export const selectUserIsLoading = createSelector(
    selectUserReducer,
    (user) => user.isLoading
);

export const selectUserError = createSelector(
    selectUserReducer,
    (user) => user.error
);