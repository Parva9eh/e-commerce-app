import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    //signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBPlMCdb5YVq8l2E651vwaRUZqzWeMh4FE",
    authDomain: "e-commerce-app-db-e8bfd.firebaseapp.com",
    projectId: "e-commerce-app-db-e8bfd",
    storageBucket: "e-commerce-app-db-e8bfd.appspot.com",
    messagingSenderId: "994314347416",
    appId: "1:994314347416:web:b46f7b78738b66e39381ed"
  };
  
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);

export const db = getFirestore();

/* Write the collection to the firebase database */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })
    await batch.commit();
    console.log('done');
}

/* Get the collection from the firebase database */
export const getCollectionAndDocuments = async () =>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot)=>docSnapshot.data());
}

export const createUserDocumentFromAuth = async (
  userAuth, 
  additinalInformation={}
  ) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);
    
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additinalInformation
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userSnapshot;
};


  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      )
    });
  }