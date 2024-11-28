import { X } from "lucide-react";
import { useState } from "react";
import { useCreateProductMutation } from "../state/api";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProductModal = ({
  isOpen,
  onClose,
}: CreateProductModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [rating, setRating] = useState("");

  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const handleSubmit = () => {
    const newProduct = {
      user_id: "3b0fd66b-a4d6-4d95-94e4-01940c99aedb",
      name: name,
      price: Number(price),
      stock_quantity: Number(stockQuantity),
      rating: rating ? Number(rating) : undefined,
    };
    createProduct(newProduct)
      .unwrap()
      .then(() => {
        console.log("Produto criado com sucesso!");
        onClose();
      })
      .catch((err) => {
        console.error("Erro ao criar produto:", err);
      });
    //onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Adicionar Novo Produto</h2>
          <button type="button" onClick={onClose}>
            {""}
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nome do produto"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Preço</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Preço"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Quantidade em estoque</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Quantidade"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Avaliação</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Avaliação (0-5)"
            max={5}
            min={0}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Criar Produto"
            )}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            Erro ao criar produto. Tente novamente.
          </p>
        )}
      </div>
    </div>
  );
};
