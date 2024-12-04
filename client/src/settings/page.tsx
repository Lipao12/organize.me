"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../redux";
import { useGetUserQuery, useUpdateUserMutation } from "../state/api";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

export const Settings = () => {
  const userId = localStorage.getItem("user_id");
  const [userSettings, setUserSettings] = useState<UserSetting[]>([]);
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserQuery(userId ?? "", { skip: !userId });
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [isSaving, setIsSaving] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      const settings = [
        { label: "Nome", value: user.name, type: "text" },
        { label: "Email", value: user.email, type: "text" },
      ];
      setUserSettings(settings);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
            isDarkMode ? "border-black" : "border-gray-800"
          }`}
        ></div>
        <span className={`ml-4`}>Carregando dados...</span>
      </div>
    );
  }

  if (error) {
    const errorMessage =
      "status" in error
        ? `Erro ${error.status}: ${
            (error.data as any)?.message || "desconhecido"
          }`
        : "Erro desconhecido ao carregar usuário.";
    return <p>{errorMessage}</p>;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedUser = userSettings.reduce(
        (acc, setting) => ({
          ...acc,
          [setting.label.toLowerCase().replace(/\s/g, "_")]: setting.value,
        }),
        {}
      );
      await updateUser({ ...updatedUser, id: user?.id }).unwrap();
      alert("Configurações salvas com sucesso!");
    } catch (err) {
      alert("Erro ao salvar configurações.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingChange = (index: number, newValue: string | boolean) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = newValue;
    setUserSettings(settingsCopy);
  };

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Configurações
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Valores
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label
                      className="inline-flex relative items-center cursor-pointer"
                      aria-label="label for the select"
                    >
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <>
                      <label aria-label="label for the select">
                        <input
                          type="text"
                          className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                          value={setting.value as string}
                          onChange={(e) =>
                            handleSettingChange(index, e.target.value)
                          }
                        />
                      </label>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          disabled={isSaving}
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
};
