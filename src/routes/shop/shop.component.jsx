import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/category.action';

const Shop = () => {
    const dispach = useDispatch();
    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoryMap = await getCollectionAndDocuments();
            dispach(setCategoriesMap(categoryMap));
        }
        getCategoriesMap();
    },[])
    return(
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}
export default Shop;