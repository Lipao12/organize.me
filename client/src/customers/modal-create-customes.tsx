import { X } from "lucide-react";
import { useState } from "react";
import { useCreateCutomerMutation } from "../state/api";

interface CreateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCustomerModal = ({
  isOpen,
  onClose,
}: CreateCustomerModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [createCustomer, { isLoading, error }] = useCreateCutomerMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCustomer = {
      user_id: localStorage.getItem("user_id"),
      name: name,
      email: email ? email : undefined,
      phone: phone ? phone : undefined,
    };
    createCustomer(newCustomer)
      .unwrap()
      .then(() => {
        console.log("Cliente adicionado com sucesso!");
        onClose();
      })
      .catch((err) => {
        console.error("Erro ao adicionar cliente:", err);
      });
    //onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Adicionar Novo Cliente</h2>
          <button type="button" onClick={onClose}>
            {""}
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
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
            <label className="block text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="email@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Telefone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="+55 (27) XXXXX-XXXX"
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
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Adicionar Cliente"
              )}
            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            Erro ao adicionar cliente. Tente novamente.
            <br />
            {error.data.error}
          </p>
        )}
      </div>
    </div>
  );
};
