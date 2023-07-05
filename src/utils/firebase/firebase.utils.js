import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBPlMCdb5YVq8l2E651vwaRUZqzWeMh4FE",
    authDomain: "e-commerce-app-db-e8bfd.firebaseapp.com",
    projectId: "e-commerce-app-db-e8bfd",
    storageBucket: "e-commerce-app-db-e8bfd.appspot.com",
    messagingSenderId: "994314347416",
    appId: "1:994314347416:web:b46f7b78738b66e39381ed"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);