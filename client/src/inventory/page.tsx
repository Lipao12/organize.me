"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Loading } from "../(components)/loading";
import { useAppSelector } from "../redux";
import { useGetAllProductsQuery } from "../state/api";
import { Product } from "../type/type";

const columns = [
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "price", headerName: "Price", width: 110 },
  { field: "rating", headerName: "Rating", width: 110 },
  { field: "stockQuantity", headerName: "Stock Quantity", width: 150 },
];

export const Inventory = () => {
  const user_id = { user_id: localStorage.getItem("user_id") };
  const {
    data: products,
    isError,
    isLoading,
  } = useGetAllProductsQuery(user_id);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return <Loading />;
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

  const sortProducts = (
    products: Product[],
    config: { key: string; direction: string }
  ) => {
    const { key, direction } = config;
    return [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedProducts = sortProducts(filteredProducts, sortConfig);

  // Função de manipulação de clique nos cabeçalhos
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inventário</h2>
      </div>

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

      {/* SORT MESSAGE */}
      <div className="text-sm text-gray-600 mt-2">
        Clique nos cabeçalhos das colunas para ordenar os dados.
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
                onClick={() => handleSort(col.field)}
              >
                {col.headerName}
                {sortConfig.key === col.field && (
                  <span
                    className={`ml-2 ${
                      sortConfig.direction === "asc"
                        ? "text-blue-500"
                        : "text-red-500"
                    }`}
                  >
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product: any) => (
            <tr key={product.productId} className="border-b">
              {columns.map((col) => (
                <td key={col.field} className="px-4 py-2 text-gray-700">
                  {col.field === "price"
                    ? `R$ ${product[col.field]}`
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
