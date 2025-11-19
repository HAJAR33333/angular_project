import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';

export interface ProductsState {
  list: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true
  })),
  on(ProductsActions.loadProductsSuccess, (state, { data }) => ({
    ...state,
    list: data.results, 
    loading: false
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(ProductsActions.rateProductSuccess, (state, { productId, value }) => ({
  ...state,
  list: state.list.map(p =>
    p.id === productId
      ? { ...p, _avg: (p._avg + value) / 2 } 
      : p
  )
})),

);
