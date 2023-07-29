import { createContext, useState, useEffect} from "react";
//import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
//import SHOP_DATA from '../shop-data.js';

import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products] = useState([]);
    const value = {products};

    /* Write the collection to the firebase database */
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])

    /* Get the collection from the firebase database */
    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoriesMap = await getCollectionAndDocuments();
            console.log(categoriesMap);
        }
        getCategoriesMap();
    },[])

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
};