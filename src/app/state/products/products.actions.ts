import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ page: number; pageSize: number; minRating: number; ordering: string }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ data: { count: number; results: any[] } }>()  
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);


// Add new rating
export const rateProduct = createAction(
  '[Products] Rate Product',
  props<{ productId: number; value: number }>()
);

export const rateProductSuccess = createAction(
  '[Products] Rate Product Success',
  props<{ productId: number; value: number }>()
);

export const rateProductFailure = createAction(
  '[Products] Rate Product Failure',
  props<{ error: any }>()
);
