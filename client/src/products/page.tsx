"use client";

import {
  ChevronLeft,
  ChevronRight,
  PlusCircleIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Loading } from "../(components)/loading";
import { RenderStars } from "../(components)/rating";
import { useAppSelector } from "../redux";
import { useGetProductsQuery } from "../state/api";
import { Product } from "../type/type";
import { CreateProductModal } from "./modal_create_product";

export const Products = () => {
  const [pagination, setPagination] = useState({
    user_id: localStorage.getItem("user_id"),
    page: 1,
    page_size: 12,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(pagination);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextPage = () => {
    if (products && pagination.page * pagination.page_size < products.total) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const filteredProducts = products?.products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateProductModal = () => {
    setIsModalOpen(true);
  };

  const closeCreateProductModal = () => {
    setIsModalOpen(false);
  };

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

  return (
    <div className="mx-auto pb-5 w-full">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Produtos</h2>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={openCreateProductModal}
          type="button"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Criar
          Produto
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
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
        <label>
          {""}
          <select
            id="page"
            value={pagination.page_size.toString()}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                page_size: parseInt(e.target.value),
                page: 1,
              }))
            }
            className={`w-full sm:w-auto px-4 py-2 border border-gray-200 text-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
          >
            <option value="12">12 por página</option>
            <option value="24">24 por página</option>
            <option value="36">36 por página</option>
          </select>
        </label>
      </div>

      {/* BODY PRODUCTS LIST */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: pagination.page_size }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-4">
          Falha ao carregar produtos
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product: Product) => (
            <div
              key={product.productId}
              className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-2xl font-bold mb-2">
                  R$ {product.price.toFixed(2)}
                </p>
                <div className="flex items-center mb-2">
                  {RenderStars(product.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Estoque: {product.stockQuantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {products && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
          <button
            onClick={handlePreviousPage}
            disabled={pagination.page === 1}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {pagination.page} de{" "}
            {Math.ceil(products.total / pagination.page_size)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.page * pagination.page_size >= products.total}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}
      {isModalOpen && (
        <CreateProductModal
          isOpen={isModalOpen}
          onClose={closeCreateProductModal}
        />
      )}
    </div>
  );
};
