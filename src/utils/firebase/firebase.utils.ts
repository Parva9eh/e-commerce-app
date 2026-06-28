import { getApp, getApps, initializeApp } from "firebase/app";
import { Category } from "@/store/categories/category.types";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { getFirebaseConfig } from "@/lib/firebase-config";

const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(getFirebaseConfig());
};

const getAuthInstance = () => getAuth(getFirebaseApp());
const getDb = () => getFirestore(getFirebaseApp());

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () =>
  signInWithPopup(getAuthInstance(), googleProvider);

/* Get the collection from the firebase database */
export const getCollectionAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(getDb(), "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category,
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation,
): Promise<QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) {
    throw new Error("A valid user auth object is required");
  }

  const userDocRef = doc(getDb(), "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation,
    });
  }

  const freshUserSnapshot = await getDoc(userDocRef);
  return freshUserSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(getAuthInstance(), email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(getAuthInstance(), email, password);
};

export const signOutUser = async () => await signOut(getAuthInstance());

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuthInstance(),
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};
