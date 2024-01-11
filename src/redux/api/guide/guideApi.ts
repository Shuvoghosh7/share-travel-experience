import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const GUIDE_URL = "/guide";

export const guideApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    guides: build.query({
      query: (arg) => {
        return {
          url: GUIDE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          guides: response,
          meta,
        };
      },

      providesTags: [tagTypes.guide],
    }),

    //add Guide
    addGuide: build.mutation({
      query: (data) => ({
        url: `${GUIDE_URL}/create_guide`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  
    // single post
    guide: build.query({
      query: (id) => ({
        url: `${GUIDE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.guide],
    }),

    // delete existing building
    deleteguide: build.mutation({
      query: (id) => ({
        url: `${GUIDE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.guide],
    }),
  }),
});

export const { useGuideQuery, useGuidesQuery, useDeleteguideMutation,useAddGuideMutation } =
  guideApi;
