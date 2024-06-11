import { AnyAction } from "redux-saga";

export type ActionWithPaylod<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

export function createAction<T extends string, P>(type: T,payload: P): ActionWithPaylod<T, P>;

export function createAction<T extends string, P> (type: T,payload: P): Action<T>;

export function createAction<T extends string, P> (type: T,payload: P) {
    return {type,payload} 
};