import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ productId: number }>(),
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>(),
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>(),
);

export const clearCart = createAction('[Cart] Clear');
