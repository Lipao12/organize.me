import { useEffect, useState } from "react";
import { useAppSelector } from "../redux";
import { Table } from "./components/table";

export const Inventory = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Estados para controlar a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de itens por página

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredData = data.filter((item) => {
    if (debouncedSearchTerm === "") return true;
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  });

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventário</h1>
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Pesquise no estoque..."
        aria-label="Pesquisar estoque"
        className="w-full mb-4 p-2 rounded-md bg-gray-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Carregando... */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div
            className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
              isDarkMode ? "border-black" : "border-gray-800"
            }`}
          ></div>
          <span className={`ml-4`}>Carregando dados...</span>
        </div>
      ) : currentItems.length === 0 ? (
        <p className="text-gray-400">Nenhum item encontrado.</p>
      ) : (
        <>
          {/* Tabela de resultados */}
          <Table items={currentItems} />

          {/* Botões de paginação */}
          <div className="flex justify-between mt-4">
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => {
                  if (currentPage > 1) setCurrentPage(1);
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
              >
                Primeira
              </button>
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
              >
                Anterior
              </button>
            </div>
            <span className="text-white">
              Página {currentPage} de {totalPages}
            </span>
            <div className="space-x-2">
              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
              >
                Próxima
              </button>
              <button
                type="button"
                onClick={() => {
                  if (currentPage < totalPages) setCurrentPage(totalPages);
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
              >
                Última
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
