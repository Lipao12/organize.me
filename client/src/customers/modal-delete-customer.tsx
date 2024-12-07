import { useDeleteCutomerMutation } from "../state/api";

interface DeleteCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerInfo: {
    customerId: string;
    customerName: string;
    userId: string | null;
  };
}

export const DeleteCustomerModal = ({
  isOpen,
  onClose,
  customerInfo,
}: DeleteCustomerModalProps) => {
  const [deleteCustomer, { isLoading, error }] = useDeleteCutomerMutation();

  const handleDeleteCustomer = async () => {
    try {
      await deleteCustomer({
        customer_id: customerInfo.customerId,
        user_id: customerInfo.userId,
      }).unwrap();
      onClose();
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 space-y-10">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-semibold">
            Tem certeza que deseja excluir o cliente{" "}
            <i>{customerInfo.customerName}</i>?
          </h2>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteCustomer}
            type="button"
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Excluir Cliente"
            )}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            Erro ao excluir cliente. Tente novamente.
          </p>
        )}
      </div>
    </div>
  );
};
