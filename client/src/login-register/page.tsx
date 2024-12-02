"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../(components)/card/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../(components)/tabs/tabs";
import { useLoginMutation, useRegisterMutation } from "../state/api";

const AuthForm = ({
  type,
  isLoading,
  onSubmit,
}: {
  type: "login" | "register";
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {type === "register" && (
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Seu nome"
          required
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    )}
    <div className="space-y-2">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="seu@email.com"
        required
        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Senha
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <button
      type="submit"
      disabled={isLoading}
      className={`text-lg w-full py-3 text-zinc-50 rounded-md bg-zinc-600 ${
        isLoading
          ? " cursor-not-allowed"
          : "hover:bg-zinc-800 transform duration-300"
      }`}
    >
      {isLoading ? "Carregando..." : type === "login" ? "Entrar" : "Registrar"}
    </button>
  </form>
);

export default function AuthScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [login, { isLoading: loginLoading, isError, error }] =
    useLoginMutation();
  const [register, _] = useRegisterMutation();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email);
    try {
      setIsLoading(true);
      const response = await login({ email, password }).unwrap();
      console.log("Login bem-sucedido:", response);
      localStorage.setItem("user_id", response.id);
      localStorage.setItem("name", response.name);
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Credenciais inválidas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    console.log(email);
    try {
      setIsLoading(true);
      const response = await register({ email, password, name }).unwrap();
      console.log("Registro bem-sucedido:", response);
      localStorage.setItem("user_id", response.id);
      localStorage.setItem("name", response.name);
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no registro:", err);
      alert("Erro ao registrar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md border">
        <CardHeader>
          <CardTitle>Bem-vindo</CardTitle>
          <CardDescription>Faça login ou crie uma nova conta</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="py-1 px-1 grid w-full grid-cols-2 rounded-[10px] bg-zinc-200 my-3 gap-x-1">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <AuthForm
                type="login"
                isLoading={isLoading || loginLoading}
                onSubmit={handleLogin}
              />
              {isError && (
                <p className="text-red-500 text-sm mt-2">
                  Erro no login: {error?.data?.message || "Tente novamente"}
                </p>
              )}
            </TabsContent>
            <TabsContent value="register">
              <AuthForm
                type="register"
                isLoading={isLoading}
                onSubmit={handleRegister}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Ao continuar, você concorda com nossos Termos de Serviço e Política
            de Privacidade.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
