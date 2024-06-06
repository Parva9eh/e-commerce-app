import {createAction} from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './category.types';
import { getCollectionAndDocuments } from '../../utils/firebase/firebase.utils';

export const fetchCategoriesStart = () =>
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) =>
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, error);

export const fetchCategoriesStartAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try{
        const categoriesArray = await getCollectionAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }
    catch(error){
        dispatch(fetchCategoriesFailed(error));
    }
} 