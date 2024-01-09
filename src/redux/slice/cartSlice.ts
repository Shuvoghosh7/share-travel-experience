import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  quantity: number;
  // Add other properties of your cart item here
}

interface CartState {
  carts: CartItem[];
  error: string | null;
}

const getLocalStorageCarts = (): CartItem[] => {
  try {
    const storedCarts = localStorage.getItem("carts");
    return storedCarts ? JSON.parse(storedCarts) : [];
  } catch (error) {
    console.error("Error retrieving carts from localStorage:", error);
    return [];
  }
};

const initialState: CartState = {
  carts: getLocalStorageCarts(),
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCarts: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.carts.find((item) => item.id === newItem.id);

      if (existingItem) {
        state.carts = state.carts.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        state.carts.push(newItem);
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.carts.find((product) => product.id === action.payload.id);

      if (item && item.quantity >= 1) {
        state.carts = state.carts.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: item.quantity + 1 }
            : product
        );
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.carts.find((product) => product.id === action.payload.id);

      if (item && item.quantity === 1) {
        state.carts = state.carts.filter(
          (product) => product.id !== action.payload.id
        );
      } else if (item) {
        state.carts = state.carts.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: item.quantity - 1 }
            : product
        );
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.carts = state.carts.filter(
        (product) => product.id !== action.payload.id
      );

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    clearCart: (state) => {
      state.carts = [];
      localStorage.removeItem("carts");
    },
  },
});

export const selectCart = (state: { cart: CartState }): CartItem[] => state.cart.carts;

export const {
  addToCarts,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
