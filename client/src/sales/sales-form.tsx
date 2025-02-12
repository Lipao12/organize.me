"use client";

import { Minus, Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../redux";

const customers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Johnson" },
];

const products = [
  { id: "1", name: "Product A", price: 10 },
  { id: "2", name: "Product B", price: 20 },
  { id: "3", name: "Product C", price: 30 },
];

interface CartItem {
  productId: string;
  quantity: number;
}

export default function SalesForm() {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [customerId, setCustomerId] = useState("");
  const [customerInput, setCustomerInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentProductId, setCurrentProductId] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputCustomerFocused, setIsInputCustomerFocused] = useState(false);
  const [isInputProductFocused, setIsInputProductFocused] = useState(false);

  const filteredCustomers = customerInput
    ? customers.filter((customer) =>
        customer.name.toLowerCase().includes(customerInput.toLowerCase())
      )
    : [];

  const filteredProducts = productInput
    ? products.filter((products) =>
        products.name.toLowerCase().includes(productInput.toLowerCase())
      )
    : [];

  const addToCart = () => {
    if (currentProductId && currentQuantity > 0) {
      const existingItemIndex = cart.findIndex(
        (item) => item.productId === currentProductId
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += currentQuantity;
        setCart(updatedCart);
      } else {
        setCart([
          ...cart,
          { productId: currentProductId, quantity: currentQuantity },
        ]);
      }
      setCurrentProductId("");
      setCurrentQuantity(1);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } else {
      removeFromCart(productId);
    }
  };

  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const clearCart = () => {
    setCart([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting sale:", { customerId, cart });
    setTimeout(() => {
      setIsLoading(false);
      alert("Venda realizada com sucesso!");
      setCart([]);
      setCustomerId("");
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-8 p-6 max-w-4xl mx-auto ${
        isDarkMode ? "text-zinc-800" : ""
      }`}
    >
      {/* Seção do cliente */}
      <div>
        <label
          htmlFor="customer"
          className="block text-lg font-semibold text-gray-700"
        >
          Cliente
        </label>
        <input
          id="customer"
          type="text"
          value={customerInput}
          onChange={(e) => setCustomerInput(e.target.value)}
          onFocus={() => setIsInputCustomerFocused(true)}
          className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg px-4 py-3"
          placeholder="Digite o nome do cliente"
        />
        {isInputCustomerFocused && filteredCustomers.length > 0 && (
          <ul className="mt-2 space-y-1 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <li
                key={customer.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setCustomerId(customer.id);
                  setCustomerInput(customer.name);
                  setIsInputCustomerFocused(false);
                }}
              >
                {customer.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Seção de adição de produto */}
      <div className="flex space-x-6">
        <div className="flex-grow">
          <label
            htmlFor="product"
            className="block text-lg font-semibold text-gray-700"
          >
            Produto
          </label>
          <input
            id="product"
            type="text"
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
            onFocus={() => setIsInputProductFocused(true)}
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg px-4 py-3"
          />
          {isInputProductFocused && filteredProducts.length > 0 && (
            <ul className="mt-2 space-y-1 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setCurrentProductId(product.id);
                    setProductInput(product.name);
                    setIsInputProductFocused(false);
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-1/4">
          <label
            htmlFor="quantity"
            className="block text-lg font-semibold text-gray-700"
          >
            Quantidade
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={currentQuantity}
            onChange={(e) =>
              setCurrentQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg px-4 py-3"
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={addToCart}
            disabled={!currentProductId || currentQuantity < 1}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Seção do carrinho */}
      {cart.length > 0 && (
        <div className={`mt-8 ${isDarkMode ? "text-zinc-50" : ""}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Carrinho</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-4 py-2">Produto</th>
                <th className="border px-4 py-2">Preço Unitário</th>
                <th className="border px-4 py-2">Quantidade</th>
                <th className="border px-4 py-2">Subtotal</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                return product ? (
                  <tr key={item.productId} className="text-center">
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">R$ {product.price}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">
                      R$ {(product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartItemQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                          {""}
                          <Minus className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartItemQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                          {""}
                          <Plus className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                        >
                          {""}
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      )}

      <div
        className={`flex justify-between items-center mt-6 bg-zinc-100 py-3 px-2 rounded-xl ${
          isDarkMode ? "dark:bg-transparent" : ""
        }`}
      >
        <span className="text-xl font-semibold text-gray-700">Total:</span>
        <span className="text-3xl font-bold text-gray-900">
          R$ {total.toFixed(2)}
        </span>
      </div>

      {/* Botões de ação */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={clearCart}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Trash className="inline w-5 h-5" /> Limpar Carrinho
        </button>
        <button
          type="submit"
          disabled={isLoading || !customerId || cart.length === 0}
          className={`px-6 py-3 rounded-lg text-white font-medium text-lg ${
            isLoading || !customerId || cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          }`}
        >
          {isLoading ? "Processando..." : "Finalizar Venda"}
        </button>
      </div>
    </form>
  );
}
