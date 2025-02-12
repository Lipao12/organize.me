import SalesForm from "./sales-form";

export const SalesPage = () => {
  return (
    <div className="container  pb-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Processe a Venda</h2>
      </div>
      <SalesForm />
    </div>
  );
};
