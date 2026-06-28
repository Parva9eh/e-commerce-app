import {takeLatest, all, call, put} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { USER_ACTION_TYPES } from './user.types';
import { User } from '@firebase/auth';

import { 
    signInSuccess, 
    signInFailed,
    signUpFailed,
    signOutSuccess,
    signOutFailed, 
    EmailSignInStart,
    SignUpStart,
} from './user.action';
import { getFirebaseUtils } from '@/utils/firebase/firebase-api';
import type { AdditionalInformation } from '@/utils/firebase/firebase.utils';

function* loadFirebaseUtils(): SagaIterator {
    return yield call(getFirebaseUtils);
}

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation): SagaIterator {
    const firebaseUtils = yield call(loadFirebaseUtils);

    try{
        const userSnapshot = yield call(
            firebaseUtils.createUserDocumentFromAuth, 
            userAuth, 
            additionalDetails
        );
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch(error){
        yield put(
            signInSuccess(firebaseUtils.createCurrentUserFromAuth(userAuth, additionalDetails))
        );
    }
}

export function* signInWithGoogle(): SagaIterator {
    try{
        const firebaseUtils = yield call(loadFirebaseUtils);
        const {user} = yield call(firebaseUtils.signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error){
        yield put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({payload: {email, password}}: EmailSignInStart): SagaIterator {
    try{
        const firebaseUtils = yield call(loadFirebaseUtils);
        const userCredential = yield call(firebaseUtils.signInAuthUserWithEmailAndPassword, email, password);
        if(userCredential){
            const { user } = userCredential;
            yield call(getSnapshotFromUserAuth, user);
        }
    } catch(error){
        yield put(signInFailed(error as Error));
    }
}

export function* signUp({payload: {email, password, displayName}}: SignUpStart): SagaIterator {
    try{
        const firebaseUtils = yield call(loadFirebaseUtils);
        const userCredential = yield call(firebaseUtils.createAuthUserWithEmailAndPassword, email, password );
        if(userCredential){
            const { user } = userCredential;
            yield call(getSnapshotFromUserAuth, user, { displayName });
        }
    } catch(error){
        yield put(signUpFailed(error as Error));
    }
}

export function* signOut(): SagaIterator {
    try{
        const firebaseUtils = yield call(loadFirebaseUtils);
        yield call(firebaseUtils.signOutUser);
        yield put(signOutSuccess())
    } catch(error){
        yield put(signOutFailed(error as Error));
    }
}

export function* isUserAuthenticated(): SagaIterator {
    try{
        const firebaseUtils = yield call(loadFirebaseUtils);
        const userAuth = yield call(firebaseUtils.getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    }catch(error){
        yield put(signInFailed(error as Error));
    }
}

export function* onGoogleSignInStart(): SagaIterator {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

export function* onEmailSignInStart(): SagaIterator {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signInWithEmail);
}

export function* onCheckUserSession(): SagaIterator {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* onSignUpStart(): SagaIterator {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignOutStart(): SagaIterator {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga(): SagaIterator {
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart),
        call(onSignOutStart),
    ]);
}