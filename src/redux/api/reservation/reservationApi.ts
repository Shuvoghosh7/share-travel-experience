import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const RESERVATION_URL = "/reservation";

export const reservationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all
    reservations: build.query({
      query: (arg) => {
        return {
          url: RESERVATION_URL,
          keepUnusedDataFor: 600,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          reservations: response,
          meta,
        };
      },
      providesTags: [tagTypes.reservation],
    }),

    // create reservation
    addReservation: build.mutation({
      query: (data) => ({
        url: `${RESERVATION_URL}/create_reservation`,
        method: "POST",
        body: data,
        contentType: "application/json",
      }),
      invalidatesTags: [tagTypes.reservation],
    }),

    //update
    updateReservation: build.mutation({
      query: (data) => ({
        url: `${RESERVATION_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.reservation],
    }),

    // delete existing building
    deleteReservation: build.mutation({
      query: (id) => ({
        url: `${RESERVATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reservation],
    }),
  }),
});

export const {
  useReservationsQuery,
  useAddReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} = reservationApi;
