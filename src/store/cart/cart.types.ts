import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES {
    SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
    ADD_ITEM = 'cart/ADD_ITEM',
    REMOVE_ITEM = 'cart/REMOVE_ITEM',
    CLEAR_ITEM = 'cart/CLEAR_ITEM',
}

export type CartItem = CategoryItem & {
    quantity: number;
}