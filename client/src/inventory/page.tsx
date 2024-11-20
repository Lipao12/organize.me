"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../redux";
import { useGetAllProductsQuery } from "../state/api";
import { Product } from "../type/type";

const columns = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "price", headerName: "Price", width: 110 },
  { field: "rating", headerName: "Rating", width: 110 },
  { field: "stockQuantity", headerName: "Stock Quantity", width: 150 },
];

export const Inventory = () => {
  const user_id = { user_id: "3b0fd66b-a4d6-4d95-94e4-01940c99aedb" };
  const {
    data: products,
    isError,
    isLoading,
  } = useGetAllProductsQuery(user_id);
  const [searchTerm, setSearchTerm] = useState("");
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
            isDarkMode ? "border-black" : "border-gray-800"
          }`}
        ></div>
        <span className={`ml-4`}>Carregando dados...</span>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  const filteredProducts = products?.products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      {/* SEARCH BAR */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 ">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <table className="min-w-full table-auto bg-white shadow rounded-lg border border-gray-200 mt-5">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th
                key={col.field}
                className="px-4 py-2 text-left font-semibold text-gray-700"
                style={{ width: col.width }}
              >
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product: any) => (
            <tr key={product.productId} className="border-b">
              {columns.map((col) => (
                <td key={col.field} className="px-4 py-2 text-gray-700">
                  {col.field === "price"
                    ? `$${product[col.field]}`
                    : product[col.field] || "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
