import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const POST_URL = "/post";

export const reservationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    blogs: build.query({
      query: (arg) => {
        return {
          url: POST_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),

    // create room
    addblog: build.mutation({
      query: (data) => ({
        url: `${POST_URL}/create_post`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product],
    }),

    // single post 
    blog: build.query({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),


    // update single department by id
    updateBlog: build.mutation({
      query: (data) => ({
        url: `${POST_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // delete existing building
    deleteblog: build.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),


  }),
});


export const { useAddblogMutation, useBlogsQuery, useBlogQuery, useDeleteblogMutation, useUpdateBlogMutation } = reservationApi;