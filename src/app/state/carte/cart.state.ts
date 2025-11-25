export interface CartItem {
  productId: number;
  quantity: number;
  price: number; 
}

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: []
};
