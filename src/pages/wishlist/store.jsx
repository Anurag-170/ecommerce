import { createStore } from 'redux';
import wishlistReducer from './wishlistReducer';

const store = createStore(wishlistReducer);

export default store;