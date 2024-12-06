"use client";

import { PlusCircleIcon, Search } from "lucide-react";
import { useState } from "react";
import { Loading } from "../(components)/loading";
import { useGetAllCustomersQuery } from "../state/api";
import { Customer } from "../type/type";
import { CreateCustomerModal } from "./modal_create_client";

const columns = [
  { field: "customers_id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Nome do Cliente", width: 200 },
  { field: "email", headerName: "E-mail", width: 200 },
  { field: "phone", headerName: "Telefone", width: 150 },
];

export const CustomerList = () => {
  const user_id = {
    user_id:
      typeof window !== "undefined" ? localStorage.getItem("user_id") : null,
  };

  const {
    data: customers,
    isError,
    isLoading,
  } = useGetAllCustomersQuery(user_id);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  console.log(isLoading);

  const filteredCustomers = Array.isArray(customers?.customers)
    ? customers.customers.filter((customer: Customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sortCustomers = (
    customers: Customer[],
    config: { key: keyof Customer; direction: string }
  ) => {
    const { key, direction } = config;
    return [...customers].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedCustomers = sortCustomers(filteredCustomers, sortConfig);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const formatValue = (value: any) =>
    value ?? <span className="text-gray-500 italic">Não informado</span>;

  const openCreateProductModal = () => {
    setIsModalOpen(true);
  };

  const closeCreateProductModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !customers) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch customers
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={openCreateProductModal}
          type="button"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Adicionar
          Cliente
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar clientes..."
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
          {sortedCustomers.map((customer: Customer) => (
            <tr key={customer.customers_id} className="border-b">
              {columns.map((col) => (
                <td key={col.field} className="px-4 py-2 text-gray-700">
                  {formatValue((customer as any)[col.field])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CreateCustomerModal
          isOpen={isModalOpen}
          onClose={closeCreateProductModal}
        />
      )}
    </div>
  );
};
