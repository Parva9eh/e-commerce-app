import { createSlice } from '@reduxjs/toolkit';

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

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

export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
      setIsCartOpen: (state, action) => {
        state.isCartOpen = action.payload;
      },
      addItemToCart(state, action){
        state.cartItems = addCartItem(state.cartItems, action.payload);
      },
      removeItemFromCart(state, action){
        state.cartItems = removeCartItem(state.cartItems, action.payload);
      },
      clearItemFromCart(state, action){
        state.cartItems = clearCartItem(state.cartItems, action.payload);
      },
    },
  });
  
export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;
  
export const cartReducer = cartSlice.reducer;
  
