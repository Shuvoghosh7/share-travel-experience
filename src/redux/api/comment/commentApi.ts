import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const COMMENT_URL = "/comment";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // single post 
    comment: build.query({
      query: (id) => ({
        url: `${COMMENT_URL}/${id}`,
        method: "GET",
      }),    
    }),
  }),
});


export const { useCommentQuery } = commentApi;