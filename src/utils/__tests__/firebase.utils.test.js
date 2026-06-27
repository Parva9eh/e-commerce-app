import { vi } from 'vitest';
import * as firestoreAuth from 'firebase/auth';

import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../firebase/firebase.utils';

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(),
    GoogleAuthProvider: vi.fn().mockImplementation(() => {
      return {
        setCustomParameters: vi.fn(),
      };
    }),
    signInWithPopup: vi.fn(),
    signInWithRedirect: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
  };
});

describe('firebase utils', () => {
    test("signInWithGooglePopup to call firestoreAuth's signInWithPopup", () => {
        signInWithGooglePopup();
        expect(firestoreAuth.signInWithPopup).toHaveBeenCalled();
    });

    test("signInWithGoogleRedirect to call firestoreAuth's signInWithRedirect", () => {
        signInWithGoogleRedirect();
        expect(firestoreAuth.signInWithRedirect).toHaveBeenCalled();
    });

    test("signInAuthUserWithEmailAndPassword to call firestoreAuth's signInWithEmailAndPassword", () => {
        const testEmail = 'testEmail',
        testPassword = 'testPassword';
        signInAuthUserWithEmailAndPassword(testEmail, testPassword);

        expect(firestoreAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
            undefined,
            testEmail,
            testPassword
        );
    });

    test("createAuthUserWithEmailAndPassword to call firestoreAuth's createUserWithEmailAndPassword", () => {
        const testEmail = 'testEmail',
        testPassword = 'testPassword';
        createAuthUserWithEmailAndPassword(testEmail, testPassword);

        expect(firestoreAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
            undefined,
            testEmail,
            testPassword
        );
    });

    test("signOutUser to call firestoreAuth's signOut", () => {
        signOutUser();
        expect(firestoreAuth.signOut).toHaveBeenCalled();
    });
});