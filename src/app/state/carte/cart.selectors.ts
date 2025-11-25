import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartCount = createSelector(
  selectCartItems,
  (items) => items.reduce((sum, i) => sum + i.quantity, 0)
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
);