import { call } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from '../category.saga';
import { CATEGORIES_ACTION_TYPES } from '../category.types';
import { getCollectionAndDocuments } from '../../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '../category.action';
import { throwError } from 'redux-saga-test-plan/providers';

const mockCategoriesArray = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
  ];

describe('Category Saga tests', () => {

    test('categoriesSaga', () => {
        testSaga(categoriesSaga)
            .next()
            .all([call(onFetchCategories)])
            .next()
            .isDone();
    });

    test('onFetchCategories', () => {
        testSaga(onFetchCategories)
            .next()
            .takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
            .next()
            .isDone();
    });

    test('fetchCategoriesAsync success', () => {
        return expectSaga(fetchCategoriesAsync)
            .provide([
                [call(getCollectionAndDocuments), mockCategoriesArray]
            ])
            .put(fetchCategoriesSuccess(mockCategoriesArray))
            .run();
    });

    test('fetchCategoriesAsync failure', () => {
        const mockError = new Error('An error occurred');
        return expectSaga(fetchCategoriesAsync)
            .provide([
                [call(getCollectionAndDocuments), throwError(mockError)]
            ])
            .put(fetchCategoriesFailed(mockError))
            .run();
    });
});