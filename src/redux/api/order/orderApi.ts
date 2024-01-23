import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const ORDER_URL = "/order";

export const OrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    orders: build.query({
      query: (arg) => {
        return {
          url: ORDER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          orders: response,
          meta,
        };
      },
      providesTags: [tagTypes.order],
    }),

    //create order
    addOrder: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/create_order`,
        method: "POST",
        body: data,
        contentType: "application/json",
      }),
      invalidatesTags: [tagTypes.order],
    }),

    //update
    updateOrder: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    // delete existing building
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const { useOrdersQuery, useDeleteOrderMutation, useAddOrderMutation,useUpdateOrderMutation } = OrderApi;
