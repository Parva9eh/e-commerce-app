import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (boolean)=>createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};