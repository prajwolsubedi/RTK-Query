import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ProfileQueryTypes = {
  id: string;
  name: string;
  position: string;
  contract: boolean;
  "job description": string;
};

export const myAPI = createApi({
  reducerPath: "myAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  tagTypes: ["profiles"],
  endpoints: (builder) => ({
    getProfiles: builder.query<ProfileQueryTypes[], void>({
      query: () => "/profiles",
      providesTags: ["profiles"],
      onQueryStarted: () => {
        console.log("fetching");
      },
    }),
    getProfile: builder.query<ProfileQueryTypes, string>({
      query: (id) => "/profiles/" + id,
      providesTags: ["profiles"],
    }),
    addProfile: builder.mutation<void, ProfileQueryTypes>({
      query: (profile) => ({
        url: "/profiles",
        method: "POST",
        body: profile,
      }),
      invalidatesTags: ["profiles"],
    }),
    updateProfile: builder.mutation<void, ProfileQueryTypes>({
      query: ({ id, ...rest }) => ({
        url: "/profiles/" + id,
        method: "PUT",
        body: { id, ...rest },
      }),
      invalidatesTags: ["profiles"],
    }),
    deleteProfile: builder.mutation<void, string>({
      query: (id) => ({
        url: "/profiles/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["profiles"],
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useGetProfileQuery,
  useAddProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} = myAPI;
