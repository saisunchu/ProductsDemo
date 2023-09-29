import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './Reducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
