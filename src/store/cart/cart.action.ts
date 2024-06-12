import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, ActionWithPaylod, withMatcher } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CategoryItem): CartItem[] =>{
    // find if cartItems contains productToRemove
    const existingCartItem = cartItems.find(cartItem=>cartItem.id === productToRemove.id);

    // if found, check if the quantity is equal to 1. If it is, remove that productToRemove
    if(existingCartItem && existingCartItem.quantity===1)
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)

    // return cartItems with matching cartItem with reduced quantity
    return cartItems.map((cartItem) =>
            cartItem.id === productToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity-1} 
            : cartItem
        )
}

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

export type SetIsCartOpen = ActionWithPaylod<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPaylod<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};
export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
};
export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return setCartItems(newCartItems);
};