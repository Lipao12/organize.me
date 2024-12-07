import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Customer, ExpenseByCategorySummary, Product, PurchaseSummary, SalesSummary } from "../type/type";

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

type CustomersResponse = {
  customers: Customer[];
};

type OneCustomerResponse = {
  customer_info: {email: string, name: string, phone: string};
};

type ExpensesSummaryResponse = {
  total_expenses: {
    total_expenses: number,
    date: string
  },
  expenses_by_category:{
    category: string,
    total_amount: number,
    date: string
  }
}

type PurchaseSummaryResponse = {
  purchase_summary : PurchaseSummary[]
}

type SalesSummaryResponse = {
  sales_summary : SalesSummary[]
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stock_quantity: number;
}

export interface NewCutomers {
  name: string;
  email?: string;
  phone?: string;
}

export interface DeleteCutomers {
  customer_id: string;
  user_id: string | null;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
}


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Auth", "User", "Expenses", "Purchase", "Sales", "Cutomers"],
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
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products/create",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    createCutomer: build.mutation<Customer, NewCutomers>({
      query: (newCutomers) => ({
        url: "/customers/create",
        method: "POST",
        body: newCutomers,
      }),
      invalidatesTags: ["Cutomers"],
    }),
    deleteCutomer: build.mutation<Customer, DeleteCutomers>({
      query: (customer_info) => ({
        url: "/customers/delete",
        method: "DELETE",
        body: customer_info,
      }),
      invalidatesTags: ["Cutomers"],
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
    getSummaryExpenses: build.query<ExpensesSummaryResponse, string | void | any>({
      query: (body) => ({
        url: "/metrics/expenses/summary",
        method: "POST",
        body: body,
      }),
      providesTags: ["Expenses"],
    }),
    getPurchaseSummary: build.query<PurchaseSummaryResponse, string | void | any>({
      query: (body) => ({
        url: "/metrics/purchase/summary",
        method: "POST",
        body: body,
      }),
      providesTags: ["Purchase"],
    }),
    getSalesSummary: build.query<SalesSummaryResponse, string | void | any>({
      query: (body) => ({
        url: "/metrics/sales/summary",
        method: "POST",
        body: body,
      }),
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
    getOneCustomer: build.query<OneCustomerResponse, string | void | any>({
      query: ({corr_user_id, customer_id}) => ({
        url: `/customers/${corr_user_id}/${customer_id}/info`,
        method: "GET",
      }),
      providesTags: ["Cutomers"],
    }),
    getAllCustomers: build.query<CustomersResponse, string | void | any>({
      query: (body) => ({
        url: "/customers/all",
        method: "POST",
        body: body,
      }),
      providesTags: ["Cutomers"],
    }),
  }),
});

export const {useLoginMutation, 
  useRegisterMutation, useGetProductsQuery, useGetAllProductsQuery, 
  useCreateProductMutation, useGetUserQuery, useUpdateUserMutation, useGetExpensesByCategoryQuery,
  useGetPopularProductsQuery, useGetSummaryExpensesQuery, useGetPurchaseSummaryQuery, useGetSalesSummaryQuery,
  useGetAllCustomersQuery, useCreateCutomerMutation, useGetOneCustomerQuery, useDeleteCutomerMutation} = api;