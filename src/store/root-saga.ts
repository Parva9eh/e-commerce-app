import {all, call} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { categoriesSaga } from './categories/category.saga';
import { userSaga } from './user/user.saga';

export function* rootSaga(): SagaIterator {
    yield all([call(categoriesSaga), call(userSaga)])
}