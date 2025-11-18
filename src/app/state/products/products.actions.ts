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
