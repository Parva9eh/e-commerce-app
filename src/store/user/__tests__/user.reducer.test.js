import { userReducer, INITIAL_STATE } from '@/store/user/user.reducer';
import {
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signOutFailed,
  signUpFailed,
  googleSignInStart,
  emailSignInStart,
  signUpStart,
} from '@/store/user/user.action';

describe('User Reducer action tests', () => {
    test('auth start actions should set isLoading to true and clear error', () => {
      const expectedState = {
        ...INITIAL_STATE,
        isLoading: true,
        error: null,
      };

      expect(userReducer(INITIAL_STATE, googleSignInStart())).toEqual(expectedState);
      expect(userReducer(INITIAL_STATE, emailSignInStart('test@test', 'password'))).toEqual(expectedState);
      expect(userReducer(INITIAL_STATE, signUpStart('test@test', 'password', 'Test User'))).toEqual(expectedState);
    });

    test('signInSuccess should update currentUser', () => {
      const mockUser = {
        id: 1,
        email: 'test',
      };
  
      const expectedState = {
        ...INITIAL_STATE,
        currentUser: mockUser,
        isLoading: false,
        error: null,
      };
  
      expect(userReducer(INITIAL_STATE, signInSuccess(mockUser))).toEqual(
        expectedState
      );
    });

    test('signOutSuccess should set currentUser to null', () => {
        const expectedState = {
          ...INITIAL_STATE,
          currentUser: null,
          isLoading: false,
          error: null,
        };
    
        expect(userReducer(INITIAL_STATE, signOutSuccess())).toEqual(expectedState);
    });

    test('signOutFailed should set an error', () => {
        const mockError = new Error('Error signing out');
    
        const expectedState = {
          ...INITIAL_STATE,
          isLoading: false,
          error: mockError,
        };
    
        expect(userReducer(INITIAL_STATE, signOutFailed(mockError))).toEqual(
          expectedState
        );
    });

    test('signUpFailed should set an error', () => {
        const mockError = new Error('Error signing in');
    
        const expectedState = {
          ...INITIAL_STATE,
          isLoading: false,
          error: mockError,
        };
    
        expect(userReducer(INITIAL_STATE, signUpFailed(mockError))).toEqual(
          expectedState
        );
    });

    test('signInFailed should set an error', () => {
        const mockError = new Error('Error signing in');
    
        const expectedState = {
          ...INITIAL_STATE,
          isLoading: false,
          error: mockError,
        };
    
        expect(userReducer(INITIAL_STATE, signInFailed(mockError))).toEqual(
          expectedState
        );
    });
});