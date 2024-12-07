"use client";

import { Edit2, PlusCircleIcon, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../(components)/loading";
import { useAppSelector } from "../redux";
import { useGetAllCustomersQuery } from "../state/api";
import { Customer } from "../type/type";
import { CreateCustomerModal } from "./modal-create-customes";
import { DeleteCustomerModal } from "./modal-delete-customer";

const columns = [
  { field: "name", headerName: "Nome do Cliente", width: 200 },
  { field: "email", headerName: "E-mail", width: 200 },
  { field: "phone", headerName: "Telefone", width: 150 },
  { field: "purchaseHistory", headerName: "Histórico de Compras", width: 200 },
  { field: "actions", headerName: "Ações", width: 150 },
];

export const CustomerList = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
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

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectCustomerInfo, setSelectedCustomerInfo] = useState({
    customerId: "",
    customerName: "",
    userId: user_id,
  });

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
    setIsModalCreateOpen(true);
  };

  const closeCreateProductModal = () => {
    setIsModalCreateOpen(false);
  };

  const openDeleteProductModal = (customerId: string, customerName: string) => {
    setSelectedCustomerInfo({
      ...selectCustomerInfo,
      customerId,
      customerName,
    });
    setIsModalDeleteOpen(true);
  };

  const closeDeleteProductModal = () => {
    setIsModalDeleteOpen(false);
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
            <tr
              key={customer.customers_id}
              className={`border-b hover:bg-zinc-100 ${
                isDarkMode ? "dark:hover:bg-zinc-700" : ""
              }  `}
            >
              {columns.map((col) => (
                <td key={col.field} className="px-4 py-2 text-gray-700">
                  {col.field === "actions" ? (
                    <div className="flex space-x-5">
                      <button
                        type="button"
                        onClick={() => {}} // openEditCustomerModal(customer)
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {""}
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          openDeleteProductModal(
                            customer.customers_id,
                            customer.name
                          );
                        }} //handleDeleteCustomer(customer.customers_id)
                        className="text-red-500 hover:text-red-700"
                      >
                        {""}
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ) : col.field === "purchaseHistory" ? (
                    <Link
                      to={`/customer-details/${customer.customers_id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Ver Histórico
                    </Link>
                  ) : (
                    formatValue((customer as any)[col.field])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalCreateOpen && (
        <CreateCustomerModal
          isOpen={isModalCreateOpen}
          onClose={closeCreateProductModal}
        />
      )}
      {isModalDeleteOpen && (
        <DeleteCustomerModal
          isOpen={isModalDeleteOpen}
          onClose={closeDeleteProductModal}
          customerInfo={selectCustomerInfo}
        />
      )}
    </div>
  );
};
