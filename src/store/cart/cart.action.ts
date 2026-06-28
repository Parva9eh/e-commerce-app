import { CategoryItem } from "@/store/categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "@/utils/reducer/reducer.utils";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type ClearCart = Action<CART_ACTION_TYPES.CLEAR_CART>;
export type AddItem = ActionWithPayload<CART_ACTION_TYPES.ADD_ITEM, CategoryItem>;
export type RemoveItem = ActionWithPayload<CART_ACTION_TYPES.REMOVE_ITEM, CartItem>;
export type ClearItem = ActionWithPayload<CART_ACTION_TYPES.CLEAR_ITEM, CartItem>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const addItemToCart = withMatcher((productToAdd: CategoryItem): AddItem =>
    createAction(CART_ACTION_TYPES.ADD_ITEM, productToAdd));

export const removeItemFromCart = withMatcher((cartItemToRemove: CartItem): RemoveItem =>
    createAction(CART_ACTION_TYPES.REMOVE_ITEM, cartItemToRemove));

export const clearItemFromCart = withMatcher((cartItemToClear: CartItem): ClearItem =>
    createAction(CART_ACTION_TYPES.CLEAR_ITEM, cartItemToClear));

export const clearCart = withMatcher((): ClearCart =>
    createAction(CART_ACTION_TYPES.CLEAR_CART));