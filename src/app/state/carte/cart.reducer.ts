import { createReducer, on } from '@ngrx/store';
import { initialCartState } from './cart.state';
import { addToCart, removeFromCart, updateQuantity, clearCart } from './cart.actions';

export const cartReducer = createReducer(
  initialCartState,

  on(addToCart, (state, { productId, price }) => { 
    const exists = state.items.find((i) => i.productId === productId);
    if (exists) {
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return {
      ...state,
      items: [...state.items, { productId, quantity: 1, price }], 
    };
  }),

  on(removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter((i) => i.productId !== productId),
  })),

  on(updateQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    ),
  })),

  on(clearCart, () => initialCartState),
);