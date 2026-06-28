import { CategoryItem } from "@/store/categories/category.types";

export enum CART_ACTION_TYPES {
    SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
    ADD_ITEM = 'cart/ADD_ITEM',
    REMOVE_ITEM = 'cart/REMOVE_ITEM',
    CLEAR_ITEM = 'cart/CLEAR_ITEM',
    CLEAR_CART = 'cart/CLEAR_CART',
}

export type CartItem = CategoryItem & {
    quantity: number;
}