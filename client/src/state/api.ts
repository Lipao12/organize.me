import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ExpenseByCategorySummary, ExpenseSummary, Product, PurchaseSummary, SalesSummary } from "../type/type";

interface LoginResponse {
    id: string;
    name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterResponse {
    id: string;
    name: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

type AllProductsResponse = {
  products: Product[];
};

type ProductsResponse = {
  products: Product[];
  total: number;
};

type PopularProductsResponse = {
  popular_products: Product[];
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

interface UserResponse {
  id: string;
  name: string;
  email: string;
}


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Auth", "User", "Expenses"],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: build.mutation<RegisterResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: "/auth/register",
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
    getAllProducts: build.query<AllProductsResponse, {user_id: string | null} | void>({
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
    }),
    getUser: build.query<UserResponse, string | void>({
      query: (userId) => ({
        url: `/users/${userId}/info`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: build.mutation<UserResponse, Partial<UserResponse>>({
      query: (updatedUser) => ({
        url: "/user",
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
    getPopularProducts: build.query<PopularProductsResponse, string | void | any>({
      query: (body) => ({
        url: "/metrics/products/popular",
        method: "POST",
        body: body,
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {useLoginMutation, 
  useRegisterMutation, useGetDashboardMetricsQuery, useGetProductsQuery, useGetAllProductsQuery, 
  useCreateProductMutation, useGetUserQuery, useUpdateUserMutation, useGetExpensesByCategoryQuery,
  useGetPopularProductsQuery, } = api;