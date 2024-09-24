import { User } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { setUser } from "./reducer";
import { LoginApiResponse, LoginCredentials } from "./type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("X-Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => `/auth/user`,
      providesTags: ["Auth"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error("Get me failed:", error);
          Cookies.remove("token");
          Cookies.remove("refreshToken");
        }
      },
    }),
    login: builder.mutation<LoginApiResponse, LoginCredentials>({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("token", data.token, {
            expires: 7,
          });
          Cookies.set("refreshToken", data.refreshToken, {
            expires: 7,
          });
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation } = authApi;
