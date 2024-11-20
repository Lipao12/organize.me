import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../type/type";

type ProductsResponse = {
  products: Product[];
  total: number;
};


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, string | void | any>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body: body,
      }),
      providesTags: ["Products"],
    })
  }),
});

export const {useGetProductsQuery } = api;