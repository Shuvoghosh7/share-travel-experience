import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  Price: number;
  ProductName:string;
  id: string;
  quantity: number;
  createdAt: string;
  productName: string;
  productDescription: string;
  price: number;
  guideImage: string;
}

interface CartState {
  carts: Product[];
  error: string | null;
}

const getLocalStorageCarts = (): Product[] => {
  try {
    const storedCarts = localStorage.getItem("carts");
    return storedCarts ? JSON.parse(storedCarts) : [];
  } catch (error) {
    console.error("Error retrieving carts from localStorage:", error);
    return [];
  }
};

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: getLocalStorageCarts(),
    error: null,
  } as CartState,
  reducers: {
    addToCarts: (state, action: PayloadAction<Product | any>) => {
      if (!state.carts) {
        state.carts = [action.payload];
      } else {
        const existItem = state.carts.find((i) => i.id === action.payload.id);

        if (existItem) {
          let update = state.carts.map((i) => {
            if (i.id === action.payload.id) {
              return { ...i, quantity: i.quantity + action.payload.quantity };
            } else {
              return i;
            }
          });

          state.carts = update;
        } else {
          state.carts = [...state.carts, action.payload];
        }
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    increaseQuantity: (state, action: PayloadAction<Product>) => {
      const item = state.carts.find((product) => product.id === action.payload.id);

      if (item && item.quantity >= 1) {
        state.carts = state.carts.map((product) =>
          product.id === action.payload.id ? { ...product, quantity: (item.quantity += 1) } : product
        );
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    decreaseQuantity: (state, action: PayloadAction<Product>) => {
      const item = state.carts.find((product) => product.id === action.payload.id);

      if (item && item.quantity === 1) {
        state.carts = state.carts.filter((product) => product.id !== action.payload.id);
      } else if (item) {
        state.carts = state.carts.map((product) =>
          product.id === action.payload.id ? { ...product, quantity: (item.quantity -= 1) } : product
        );
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeFormCart: (state, action: PayloadAction<Product>) => {
      state.carts = state.carts.filter((product) => product.id !== action.payload.id);

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    clearCart: (state) => {
      state.carts = [];
      localStorage.removeItem("carts");
    },
  },
});

export const cartState = (state: { cart: CartState }) => state.cart;

export const {
  addToCarts,
  increaseQuantity,
  decreaseQuantity,
  removeFormCart,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
