import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const productsSelector = createSelector(
  selectProductsState,
  (state) => state.list
);

export const selectPage = createSelector(
  selectProductsState,
  state => state.page
);

export const selectPageSize = createSelector(
  selectProductsState,
  state => state.pageSize
);

export const selectTotalCount = createSelector(
  selectProductsState,
  state => state.count
);
