import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NODE_PUBLIC_API_BASE_URL }),
    reducerPath:"api",
    tagTypes:[],
    endpoints:(build)=>({}),
})

export const {} = api;