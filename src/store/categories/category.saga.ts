import { takeLatest, all, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getCollectionAndDocuments } from '@/utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';
 
export function* fetchCategoriesAsync(): SagaIterator {
    try{
        const categoriesArray = yield call(getCollectionAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    }
    catch(error){
        yield put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories(): SagaIterator {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync)
}
export function* categoriesSaga(): SagaIterator {
    yield all([call(onFetchCategories)])
}