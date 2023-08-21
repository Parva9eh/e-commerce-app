import { createContext, useReducer } from "react";
import {createAction} from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) =>{
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(cartItem=>cartItem.id === productToAdd.id);

    // if found, increment the quantity
    if(existingCartItem)
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity+1} 
            : cartItem
        )
    // return new array with modified cart items/ new cart item
    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem = (cartItems, productToRemove) =>{
    // find if cartItems contains productToRemove
    const existingCartItem = cartItems.find(cartItem=>cartItem.id === productToRemove.id);

    // if found, check if the quantity is equal to 1. If it is, remove that productToRemove
    if(existingCartItem.quantity===1)
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

    // return cartItems with matching cartItem with reduced quantity
    return cartItems.map((cartItem) =>
            cartItem.id === productToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity-1} 
            : cartItem
        )
}

const clearCartItem = (cartItems, productToClear) => cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount:0,
    cartTotal:0
})

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount:0,
    cartTotal:0
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }

}

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer,INITIAL_STATE);
    const {isCartOpen, cartItems, cartCount, cartTotal} = state;

    const updateCartItemsReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((total,cartItem)=>total + cartItem.quantity,0);
     
        const newCartTotal = newCartItems.reduce((total,cartItem)=>total + cartItem.quantity * cartItem.price,0);
 
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{cartItems:newCartItems, cartTotal:newCartTotal, cartCount:newCartCount}))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        return updateCartItemsReducer(newCartItems);
    };
    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        return updateCartItemsReducer(newCartItems);
    };
    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        return updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) =>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    )
}