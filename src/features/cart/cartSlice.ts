// src/features/cart/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định dạng sản phẩm trong giỏ hàng
export interface CartItem {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  shippingFee: number;
  discount: number;
}

const initialState: CartState = {
  items: [],
  shippingFee: 0,
  discount: 0,
};

// Lấy giỏ hàng từ localStorage nếu có
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(),
    shippingFee: 0,
    discount: 0,
  },
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(
        (i: CartItem) => i.id === item.id
      );
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Cập nhật giỏ hàng vào localStorage
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item: CartItem) => item.id !== action.payload
      );
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find(
        (i: CartItem) => i.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cart');
    },
    setShippingFee(state, action: PayloadAction<number>) {
      state.shippingFee = action.payload;
    },
    setDiscount(state, action: PayloadAction<number>) {
      state.discount = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShippingFee,
  setDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
