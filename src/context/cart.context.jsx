import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));
    const removeItemFromCart = (productToRemove) => setCartItems(removeCartItem(cartItems, productToRemove));
    const clearItemFromCart = (productToClear) => setCartItems(clearCartItem(cartItems, productToClear));
    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=>total + cartItem.quantity,0);
        setCartCount(newCartCount);
    },[cartItems]);

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total,cartItem)=>total + cartItem.quantity * cartItem.price,0);
        setCartTotal(newCartTotal);
    },[cartItems]);

    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
    )
}