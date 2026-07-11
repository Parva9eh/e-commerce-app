import { getApp, getApps, initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { getFirebaseConfig } from '@/lib/firebase-config';
import { Category } from '@/store/categories/category.types';

/**
 * Lightweight public catalog read for API routes / SSR.
 * Avoids importing auth/popup helpers from firebase.utils (heavier, client-oriented).
 */
export const fetchPublicCategories = async (): Promise<Category[]> => {
  const app = getApps().length ? getApp() : initializeApp(getFirebaseConfig());
  const db = getFirestore(app);
  const snapshot = await getDocs(query(collection(db, 'categories')));
  return snapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};
