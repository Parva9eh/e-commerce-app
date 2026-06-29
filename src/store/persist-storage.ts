import type { Storage } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = (): Storage => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage: Storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local');

export default storage;