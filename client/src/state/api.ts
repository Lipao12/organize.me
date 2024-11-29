import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ExpenseByCategorySummary, ExpenseSummary, Product, PurchaseSummary, SalesSummary } from "../type/type";

interface LoginResponse {
  token: string; 
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

type AllProductsResponse = {
  products: Product[];
};

type ProductsResponse = {
  products: Product[];
  total: number;
};

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stock_quantity: number;
}

type DashboardMetrics = {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Auth"],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products/create",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProducts: build.query<AllProductsResponse, {user_id: string} | void>({
      query: (body) => ({
        url: "/products/all",
        method: "POST",
        body: body,
      }),
      providesTags: ["Products"],
    }),
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

export const {useLoginMutation, useGetDashboardMetricsQuery, useGetProductsQuery, useGetAllProductsQuery, useCreateProductMutation} = api;