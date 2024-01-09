import { baseApi } from "./api/baseApi";
import cartSlice from "./slice/cartSlice";




export const reducer = {
   carts: cartSlice,
   [baseApi.reducerPath]: baseApi.reducer,
   
  
}

