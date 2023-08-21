import { createContext, useEffect, useReducer} from "react";
import {createAction} from '../utils/reducer/reducer.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  } from '../utils/firebase/firebase.utils';

//as the actual value you want to access
export const UserContext = createContext({
  currentUser:null,
  setCurrentUser: () => null
});

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const INITIAL_STATE = {
  currentUser: null
};

export const userReducer = (state, action) =>{
  const {type, payload} = action;
  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return{
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

//the provider component that will render children components
export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const {currentUser} = state;

  const setCurrentUser = (user) =>{
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
  }

  useEffect(()=>{
      const unsubscribe = onAuthStateChangedListener((user) => {
          if (user) {
            createUserDocumentFromAuth(user);
          }
          setCurrentUser(user);
        });
    
        return unsubscribe;

  }, [])

  const value = {currentUser, setCurrentUser};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}