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
import { 
    getCurrentUser,
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser ,
    AdditionalInformation,
} from '@/utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation): SagaIterator {
    try{
        const userSnapshot = yield call(
            createUserDocumentFromAuth, 
            userAuth, 
            additionalDetails
        );
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch(error){
        yield put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle(): SagaIterator {
    try{
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error){
        yield put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({payload: {email, password}}: EmailSignInStart): SagaIterator {
    try{
        const userCredential = yield call(signInAuthUserWithEmailAndPassword, email, password);
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
        const userCredential = yield call(createAuthUserWithEmailAndPassword, email, password );
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
        yield call(signOutUser);
        yield put(signOutSuccess())
    } catch(error){
        yield put(signOutFailed(error as Error));
    }
}

export function* isUserAuthenticated(): SagaIterator {
    try{
        const userAuth = yield call(getCurrentUser);
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