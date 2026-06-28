import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import {
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
} from "./cart.action";
import { addCartItem, removeCartItem, clearCartItem } from "./cart.utils";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
}

export const cartReducer = (
    state = CART_INITIAL_STATE,
    action: AnyAction
): CartState => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        };
    }

    if (addItemToCart.match(action)) {
        return {
            ...state,
            cartItems: addCartItem(state.cartItems, action.payload),
        };
    }

    if (removeItemFromCart.match(action)) {
        return {
            ...state,
            cartItems: removeCartItem(state.cartItems, action.payload),
        };
    }

    if (clearItemFromCart.match(action)) {
        return {
            ...state,
            cartItems: clearCartItem(state.cartItems, action.payload),
        };
    }

    return state;
}