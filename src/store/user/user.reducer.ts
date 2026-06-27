import { AnyAction } from 'redux';
import {
    signInFailed,
    signOutFailed,
    signUpFailed,
    signInSuccess,
    signOutSuccess,
    googleSignInStart,
    emailSignInStart,
    signUpStart,
    signOutStart,
} from './user.action';
import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE, 
  action: AnyAction
) => {
  if (googleSignInStart.match(action) || emailSignInStart.match(action) || signUpStart.match(action) || signOutStart.match(action)) {
    return { ...state, isLoading: true, error: null };
  }

  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload, isLoading: false, error: null };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null, isLoading: false, error: null };
  }

  if (signUpFailed.match(action) || signInFailed.match(action) || signOutFailed.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }
  
  return state;
};