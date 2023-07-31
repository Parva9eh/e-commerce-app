import { createContext, useState, useEffect} from "react";
//import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
//import SHOP_DATA from '../shop-data.js';

import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap};

    /* Write the collection to the firebase database */
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])

    /* Get the collection from the firebase database */
    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoryMap = await getCollectionAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[])

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
};