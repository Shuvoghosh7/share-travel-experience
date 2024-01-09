import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

const PRODUCT_URL = "/product";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add product
    addProduct: build.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/create_product`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product],
    }),

    products: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: PRODUCT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response:any, meta:IMeta) => {
        return {
          products: response,
          meta,
        };
      },
      providesTags: [tagTypes.product],
     
    }),
    // single post 
    product: build.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

     // delete existing building
     deleteProduct: build.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [tagTypes.product],
    }),


  }),
});


export const { useProductQuery,useProductsQuery,useDeleteProductMutation,useAddProductMutation } = productApi;