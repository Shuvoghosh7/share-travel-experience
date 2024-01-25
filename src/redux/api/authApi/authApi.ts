import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
        query: (loginData) => ({
            url:`${ AUTH_URL}/login`,
            method: "POST",
            data: loginData
        }),
        invalidatesTags:  [tagTypes.user],
    }),
    userSingup: build.mutation({
        query: (loginData) => ({
            url:'/user/create_user',
            method: "POST",
            data: loginData
        }),
        invalidatesTags:  [tagTypes.user],
    }),
  }),
  
})

export const { useUserLoginMutation,useUserSingupMutation } = authApi