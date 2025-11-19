import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';

export interface ProductsState {
  list: any[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  count: number;
}

export const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  count: 0
};

export const productsReducer = createReducer(
  initialState,

  on(ProductsActions.loadProducts, (state, { page, pageSize }) => ({
    ...state,
    loading: true,
    page,
    pageSize
  })),

  on(ProductsActions.loadProductsSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    list: data.results,
    count: data.count
  })),

  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
